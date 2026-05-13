import { useEffect, useState } from "react";
import { useCart } from "@/contexts/cart";
import { CartItem } from "@/contexts/cart"
import { useSQLiteContext } from "expo-sqlite";
import Product from "@/constants/Product"

export default function useUserCart(clientId) { 
    const db = useSQLiteContext()
    
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);

    const { cart } = useCart();

    const setItemsInfo = async (clientCart) => {
        await Promise.all(
            clientCart.map(async (item) => {
                const product = await db.getFirstAsync(
                    "SELECT * FROM produits WHERE id = ?", [item.id_product]
                )
                if (product) {
                    console.log("setItemsInfo product", product)
                    item.nom = product.nom;
                    item.prix = product.prix;
                    item.id = product.id
                }
            })
        )
        setItems(clientCart);
        setTotal(clientCart.reduce((sum, item) => sum + item.prix * item.quantity, 0));
    }

    useEffect(() => { 
        console.log('Cart updated:', cart);
        if (!clientId) {
            setItems([]);
            setTotal(0);
            return;
        }

        const clientCart = Object.values(cart).filter(item => item.id_client === clientId);
        console.log("client cart ", clientCart)
        setItemsInfo(clientCart)        
        
        

    }, [clientId, cart]);

    return { items, total };
}