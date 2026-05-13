import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { useAccount } from '@/contexts/account';
import useUserCart from '@/hooks/useUserCart'
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { View, Text, useColorScheme, StyleSheet, FlatList, Image, Touchable, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useCart } from '@/contexts/cart';
import PayConfirmationModal from '@/components/payConfirmationModal';
import emailjs from '@emailjs/browser';
import ListProductCard from '@/components/ListProductCard';
import { CartItem } from '@/contexts/cart';

export default function Cart() {
    

    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light']
    const db = useSQLiteContext()
    const { account } = useAccount()
    const { modifyCart, removeFromCart, clearCart, payCart } = useCart()
    const { items, total } = useUserCart(account?.id)    

    const [isPayModalOpen, setIsPayModalOpen] = useState(false)
    
    const proceedToPayment = () => {
        if (account != null) {
            const bill = `${items.map((item: CartItem) =>
                `${item.nom} x${item.quantity} | ${(item.prix * item.quantity).toFixed(2)}$`)
                .join('\n--------------------\n')}\n\nTotal : ${total.toFixed(2)}`
        
            emailjs.send('service_gtswpxs', 'template_2rnemwe', {
                to_name: account?.username,
                to_email: account?.email,
                message: `Merci pour votre achat ! Voici le récapitulatif de votre commande :\n\n${bill}$`
            }, { publicKey: 'IdQYymNrJn-IF0e0I' }
            )
                .then(async () => {
                    const cartPayed = await payCart(account?.id ?? 0)
                    setIsPayModalOpen(cartPayed)
                })
                .catch(() => {
                    Alert.alert("Erreur", "Une erreur est survenue lors de l'envoi de l'email de confirmation. Veuillez réessayer.")
                });
        } else
            Alert.alert("Erreur", "Vous devez être connecté pour passer une commande.")
    }

    const s = StyleSheet.create({
        container: {
            flex: 5,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
        },
        header: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width:'100%'
        },
        listContainer: {
            flex: 3,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: colors.tint,
            width: '100%',
            padding: 8,
        },
        footer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent:'space-between'
        },
        cartLine: {
            flex:5,
            flexDirection: 'row',
            alignItems: 'center',
            height: 104,
            width: '100%',
            justifyContent: 'space-between',
            paddingVertical:8
        },
        btn: {
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.tint,
            height: 48,
            padding: 12,
            alignItems: 'center',
            justifyContent: 'center'
        },
        emptyBtn: {
            width:'36%',
        },
        orderBtn: {
            width: '60%',
            backgroundColor: colors.tint
        }
    })

    useEffect(() => {
       console.log('Cart items updated:', items);
    }, [items])

    /* const Ligne = ({ item }: { item: CartItem }) => {
        const [validQty, setValidQty] = useState<{ [key: number]: boolean }>({}) // Tracks validity of quantity for each product

        return (
            <View style={s.cartLine}>
                <Image
                    source={require('../../../assets/images/arcane.png')}
                    style={{ flex: 1, height: '60%', aspectRatio: 1, borderRadius: 8 }}
                    resizeMode='contain'
                />
                <View style={{flex:2, flexDirection:'column', alignItems:'flex-start', justifyContent:'space-between', height:'100%'}}>
                    <Text style={{color: colors.text, fontSize: 16, fontFamily: "Macondo"}}>
                        {item.name}
                    </Text>
                    <Text style={{color: colors.text, fontSize: 14, fontFamily: "Macondo", opacity:0.6}}>
                        {item.price.toFixed(2)}$ l'unité
                    </Text>
                    <View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <TouchableOpacity
                            onPress={() => {
                                modifyCart(item.id_product, item.quantity - 1, account?.id ?? 0)
                            }}
                        >
                            <MaterialCommunityIcons name="minus" size={24} color={colors.tint} />
                        </TouchableOpacity>
                        <Text style={{ color: colors.text, fontSize: 16, fontFamily: "Macondo" }}>
                            {item.quantity}
                        </Text>
                        <TouchableOpacity
                            style={{ opacity: validQty[item.id_product] === false ? 0.5 : 1 }} // Dim the "+" button if the quantity is invalid
                            disabled={validQty[item.id_product] === false} // Disable the "+" button if the quantity is invalid
                            onPress={() => {
                                let valid = modifyCart(item.id_product, item.quantity + 1, account?.id ?? 0)
                                setValidQty(prev => ({ ...prev, [item.id_product]: valid }))
                            }}
                        >
                            <MaterialCommunityIcons name="plus" size={24} color={colors.tint} />
                        </TouchableOpacity>
                    </View>
                </View>                
                <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:8}}>
                    <Text style={[typography.subtitle, {color:colors.text, fontSize:16}]}>
                            Prix total
                    </Text>
                    <Text style={[typography.body, {color:colors.text}]}>
                        {(item.price * item.quantity).toFixed(2)}$
                    </Text>
                </View>
                <View style={{flex:1, height:'100%', alignItems:'center', justifyContent:'center'}}>                   
                    <TouchableOpacity
                        onPress={() => {
                            removeFromCart(item.id_product, account?.id ?? 0)
                        }}
                    >
                        <MaterialCommunityIcons name="delete" size={24} color={colors.tint} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    } */

    return (
        <>
        <PayConfirmationModal visible={isPayModalOpen} onClose={() => setIsPayModalOpen(false)}/>
        <View style={s.container}>
            <View style={s.header}>
                <Text style={[typography.subtitle, {color:colors.text, fontSize:24}]}>
                    Total
                </Text>
                <Text style={[typography.title, {color:colors.text}]}>
                    {total.toFixed(2)}$
                </Text>
            </View>
            <View style={s.listContainer}>
                <FlatList
                    style={{ width: '100%', height: '100%' }}
                    data={items}
                    renderItem={({ item }) => 
                        <ListProductCard produit={item} from="cart"/>
                    }
                    ListEmptyComponent={<View style={{alignItems:'center', justifyContent:'center', flex:1, height:'100%'}}>
                        <Text style={[typography.subtitle,{ color: colors.text, fontFamily: "Macondo" }]}>Votre panier est vide</Text>
                    </View>}
                    ItemSeparatorComponent={() =>
                        <View style={{ height: 1, backgroundColor: colors.text, opacity:0.4, marginVertical:8 }} />}
                />
            </View>
            <View style={s.footer}>
                <TouchableOpacity style={[s.btn, s.emptyBtn]}
                    onPress={() => {
                        clearCart(account?.id ?? 0)
                    }}>
                    <MaterialCommunityIcons name="delete" size={24} color={colors.text} style={{opacity:0.6}} />
                </TouchableOpacity>
                <TouchableOpacity style={[s.btn, s.orderBtn]} onPress={() => { proceedToPayment() }}>
                    <Text style={[typography.body, {color:colors.text}]}>Payer</Text>
                </TouchableOpacity>
            </View>            
        </View>
        </>
    )
}