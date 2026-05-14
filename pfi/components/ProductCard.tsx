import Colors from '@/constants/Colors';
import Product from '@/constants/Product';
import { typography } from '@/constants/typography';
import { useAccount } from '@/contexts/account';
import { CartItem, useCart } from '@/contexts/cart';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { View } from './Themed';


const  ProductCard = ({ produit, from} : {produit: any, from: "products" | "cart"})=>{
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']
  const { account } = useAccount()
  const { removeFromCart, modifyCart, addToCart, itemInCart } = useCart()

  const [validQty, setValidQty] = useState<{ [key: number]: boolean }>({}) // Tracks validity of quantity for each product

  const s = StyleSheet.create({
    card: {
      flex:5,
      flexDirection: 'row',
      alignItems: 'center',
      height: 104,
      width: '100%',
      justifyContent: 'space-between',
      paddingVertical:8
    },
    listProductCardData: {
      textAlign: 'center',
      flex: 1,
      color: "white",
      fontSize: 18,
    },
  });
  console.log("entering listProductCard : produit = " + produit);

  if (from === 'cart')
    produit = produit as CartItem
  else
    produit = produit as Product

  return (
    <View style={s.card}>
      <Image
          source={require('../assets/images/arcane.png')}
          style={{ flex: 1, height: '60%', aspectRatio: 1, borderRadius: 8 }}
          resizeMode='contain'
      />
      <View style={{flex:2, flexDirection:'column', alignItems:'flex-start', justifyContent:from=="cart" ? 'space-between' : 'center', height:'100%'}}>
          <Text style={{color: colors.text, fontSize: from === "cart" ? 16 : 24, fontFamily: "Macondo", flexWrap:"wrap"}}>
              {produit.nom}
          </Text>
        { from === "cart" &&
          <>
          <Text style={{ color: colors.text, fontSize: 14, fontFamily: "Macondo", opacity: 0.6 }}>
            {produit.prix.toFixed(2)}$ l'unité
          </Text>

          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => {
                modifyCart(produit.id, produit.quantity - 1, account?.id ?? 0)
              }}
            >
              <MaterialCommunityIcons name="minus" size={24} color={colors.tint} />
            </TouchableOpacity>
            <Text style={{ color: colors.text, fontSize: 16, fontFamily: "Macondo" }}>
              {produit.quantity}
            </Text>
            <TouchableOpacity
              style={{ opacity: validQty[produit.id] === false ? 0.5 : 1 }} // Dim the "+" button if the quantity is invalid
              disabled={validQty[produit.id] === false} // Disable the "+" button if the quantity is invalid
              onPress={async () => {
                let valid = await modifyCart(produit.id, produit.quantity + 1, account?.id ?? 0)
                setValidQty(prev => ({ ...prev, [produit.id]: valid }))
              }}
            >
              <MaterialCommunityIcons name="plus" size={24} color={colors.tint} />
            </TouchableOpacity>
          </View>
          </>
        }
      </View> 
      { from === "cart" ?
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 8 }}>
          <Text style={[typography.subtitle, { color: colors.text, fontSize: 16 }]}>
            Prix total
          </Text>
          <Text style={[typography.body, { color: colors.text }]}>
            {(produit.prix * produit.quantity).toFixed(2)}$
          </Text>
        </View>

        :

        <View style={{justifyContent:'center', alignItems:'center'}}>
          <Text style={[typography.subtitle, { color: colors.text, fontSize: 16 }]}>
            {produit.prix.toFixed(2)} $ {/* TODO: internationalize */}
          </Text>
        </View>
      }
      <View style={{flex:1, height:'100%', alignItems:'center', justifyContent:'center'}}>                   
        <TouchableOpacity
          style={{marginTop:14}}
          onPress={() => {
                if(from === "cart")
                  removeFromCart(produit.id, account?.id ?? 0)
                else
                  addToCart(produit.id, 1, account?.id ?? 0)
              }}
          >
          <MaterialCommunityIcons name={from === "cart" ? "delete" : "cart-plus"} size={24} color={colors.tint} />
        </TouchableOpacity>
        {from === "products" &&
          <Text style={[typography.subtitle, { color: colors.text, fontSize: 14 }]}>
            {itemInCart(produit.id, account?.id??0)?.quantity}
          </Text>
        }
      </View>
  </View>
  );
}

export default ProductCard