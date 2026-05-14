import Product from '@/constants/Product';
import { useSQLiteContext } from 'expo-sqlite';
import { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from 'react-native';

type Cart = {
    id_client: number,
    id_product: number,
    quantity: number
}

export type CartItem = {
    id: number;
    id_client: number;
    quantity: number;
    nom: string;
    prix: number;
}

type CartContextType = {
    cart: Cart[];
    addToCart: (id_product: number, quantity: number, client_id: number) => void;
    removeFromCart: (id_product: number, client_id: number) => void;
    clearCart: (client_id: number) => void;
    modifyCart: (id_product: number, newQuantity: number, client_id: number) => Promise<boolean>;
    payCart: (client_id: number) => Promise<boolean>;
    itemInCart: (id_product: number, client_id: number) => Cart | undefined
}

const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => { },
    modifyCart: async () => { return true },
    payCart: async () => { return true },
    itemInCart: () => undefined
})

export function CartProvider({ children }: { children: ReactNode }) {    
    const db = useSQLiteContext()
    const hcItems = [
        {
            id_product: 1,
            id_client: 2,
            quantity: 2
        }
    ]
    
    const [cart, setCart] = useState<Cart[]>(hcItems)

    const getProductInventory = async (id_product:number): Promise<number> => {
        const productsQty:any = await db.getFirstAsync("SELECT inventaire FROM produits WHERE id = ?", [id_product]) ?? 0
        console.log(`product ${id_product} inventory ${productsQty.inventaire}`)
        return productsQty.inventaire
    }

    const addToCart = async (id_product: number, quantity: number, id_client: number) => {
        console.log('enter addtocart');
        if(id_client === undefined) {
            Alert.alert("Erreur", "Vous devez être connecté pour ajouter un article à votre panier.")
            return
        }

        // Item already in the cart ?
        const existingItem = cart.find(item => item.id_product == id_product && item.id_client == id_client)
        
        const productInv = await getProductInventory(id_product)
        const newQuantity = (existingItem?.quantity ?? 0) + quantity
        if (newQuantity <= productInv) {
            setCart(prev => {
                return [
                    ...prev.filter(item => item.id_product !== id_product),
                    { id_product, quantity: newQuantity, id_client }
                ]
            })
        } else {
            Alert.alert("Erreur", "Quantité demandée supérieure à la quantité en stock.")
            return
        }
    }
    const removeFromCart = (id_product: number, id_client: number) => {
        if(id_client === undefined) {
            Alert.alert("Erreur", "Vous devez être connecté pour supprimer un article de votre panier.")
        }
        setCart(prev => prev.filter(item => !(item.id_product === id_product && item.id_client === id_client)))        
    }
    const modifyCart = async (id_product: number, newQuantity: number, id_client: number) => {
        if (id_client === undefined) {
            Alert.alert("Erreur", "Vous devez être connecté pour modifier votre panier.")
        }
        const productsQty = await getProductInventory(id_product)
        
        if (newQuantity <= productsQty) {
            setCart(prev => prev.map(item => {
                if (item.id_product === id_product && item.id_client === id_client) {
                    return { ...item, quantity: newQuantity }
                }
                return item
            }))
            // Sends false to signify to the component to disable the "+" button
            if (newQuantity === productsQty) { 
                return false
            }
            return true
        } else {
            return false
        }
    }
    const clearCart = (client_id: number) => {
        setCart(prev => prev.filter(item => item.id_client !== client_id))
        console.log('Cart cleared for client_id:', client_id)
    }
    const payCart = async (client_id: number) => {
        if (client_id === 0) {
            Alert.alert("Erreur", "Vous devez être connecté pour payer votre panier.")
            return false
        }

        const clientCart = cart.filter(item => item.id_client === client_id)
        if (clientCart.length === 0) {
            Alert.alert("Erreur", "Votre panier est vide.")
            return false
        }

        try {
            await db.withTransactionAsync(async () => {
                for (const item of clientCart) {
                    const product = await db.getFirstAsync<Product>(
                        "SELECT * FROM produits WHERE id = ?", [item.id_product]
                    )

                    if (!product) {
                        throw new Error("Un produit de votre panier n'existe pas.")
                    }
                    if (item.quantity > product.inventaire) {
                        throw new Error(`La quantité demandée pour ${product.nom} est supérieure à la quantité en stock.`)
                    }

                    await db.runAsync(
                        "UPDATE produits SET inventaire = inventaire - ? WHERE id = ?",
                        [item.quantity, item.id_product]
                    )
                }
            })

            clearCart(client_id)
            return true
        } catch (e: any) {
            Alert.alert("Erreur", e.message)
            return false
        }
    }
    const itemInCart = (id_product: number, client_id: number) => {
        return cart.find(item => item.id_product == id_product && item.id_client == client_id)
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, modifyCart, payCart, itemInCart }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within a CartProvider')
    return context
}