import { createContext, useContext, useState, ReactNode } from 'react';
import { Alert } from 'react-native/Libraries/Alert/Alert';

type Cart = {
    id_client: number,
    id_product: number,
    quantity: number
}

type CartContextType = {
    cart: Cart[];
    addToCart: (id_product: number, quantity: number, client_id: number) => void;
    removeFromCart: (id_product: number, client_id: number) => void;
    clearCart: (client_id: number) => void;
    modifyCart: (id_product: number, newQuantity: number, client_id: number) => boolean;
    payCart: (client_id: number) => boolean;
}

const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => { },
    modifyCart: () => { return true },
    payCart: () => { return true }
})

export function CartProvider({ children }: { children: ReactNode }) {
    const productsDatabase = [
        {
            id_product: 1,
            name: "Produit 1",
            price: 10,
            inventory: 10
        },
        {
            id_product: 2,
            name: "Produit 2",
            price: 20,
            inventory: 5
        },
        {
            id_product: 3,
            name: "Produit 3",
            price: 15,
            inventory: 8
        }
    ]
    const hcItems = [
        {
            id_product: 1,
            id_client: 2,
            quantity: 2
        },
        {
            id_product: 2,
            id_client: 2,
            quantity: 1
        }
    ]
    
    const [cart, setCart] = useState<Cart[]>(hcItems)

    const addToCart = (id_product: number, quantity: number, id_client: number) => {
        if(id_client === undefined) {
            Alert.alert("Erreur", "Vous devez être connecté pour ajouter un article à votre panier.")
        }
        const productsQty = productsDatabase.find(p => p.id_product === id_product)?.inventory || 0
        
        if (quantity < productsQty) {
            setCart(prev => [...prev, { id_product, quantity, id_client }])
        } else {
            Alert.alert("Erreur", "Quantité demandée supérieure à la quantité en stock.")
        }

    }
    const removeFromCart = (id_product: number, id_client: number) => {
        if(id_client === undefined) {
            Alert.alert("Erreur", "Vous devez être connecté pour supprimer un article de votre panier.")
        }
        setCart(prev => prev.filter(item => !(item.id_product === id_product && item.id_client === id_client)))        
    }
    const modifyCart = (id_product: number, newQuantity: number, id_client: number) => {
        if (id_client === undefined) {
            Alert.alert("Erreur", "Vous devez être connecté pour modifier votre panier.")
        }
        const productsQty = productsDatabase.find(p => p.id_product === id_product)?.inventory || 0
        
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
    const payCart = (client_id: number) => {
        if (client_id === 0) { 
            Alert.alert("Erreur", "Vous devez être connecté pour payer votre panier.")
            return false
        }
        const clientCart = cart.filter(item => item.id_client === client_id)
        if (clientCart.length === 0) {
            Alert.alert("Erreur", "Votre panier est vide.")
            return false
        }
        for (const item of clientCart) {
            const product = productsDatabase.find(p => p.id_product === item.id_product)
            if (product) {
                if (item.quantity > product.inventory) { // This should not happen if modifyCart and addToCart are correctly used, but we check just in case
                    Alert.alert("Erreur", `La quantité demandée pour ${product.name} est supérieure à la quantité en stock.`)
                    return false
                }
                productsDatabase.find(p => p.id_product === item.id_product)!.inventory -= item.quantity // Update inventory
            } else { 
                Alert.alert("Erreur", "Un produit de votre panier n'existe pas.")
                return false
            }
        }        
        clearCart(client_id)
        return true
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, modifyCart, payCart }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within a CartProvider')
    return context
}