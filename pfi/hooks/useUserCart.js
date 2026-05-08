import { useEffect, useState } from "react";
import { useCart } from "@/contexts/cart";

export default function useUserCart(clientId) { 
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
    
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);

    const { cart } = useCart();

    useEffect(() => { 
        console.log('Cart updated:', cart);
        if (!clientId) {
            setItems([]);
            setTotal(0);
            return;
        }

        const clientCart = Object.values(cart).filter(item => item.id_client === clientId);
        setItems(clientCart);

        clientCart.forEach(item => {
            const product = productsDatabase.find(p => p.id_product === item.id_product);
            if (product) {
                console.log('Updating item with product info:', item, product);
                item.name = product.name;
                item.price = product.price;
            }
        });
        
        setTotal(clientCart.reduce((sum, item) => sum + item.price * item.quantity, 0));

    }, [clientId, cart]);

    return { items, total };
}