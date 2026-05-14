import Colors from '@/constants/Colors';
import Product from '@/constants/Product';
import { typography } from '@/constants/typography';
import { useAccount } from '@/contexts/account';
import { CartItem, useCart } from '@/contexts/cart';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, useColorScheme } from 'react-native';
import { View } from './Themed';

const ListProductCard = ({ produit, from }: { produit: any, from: "products" | "cart" | "delete" }) => {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']
  const db = useSQLiteContext();
  const { account } = useAccount()
  const { removeFromCart, modifyCart, addToCart, itemInCart } = useCart()

  const [validQty, setValidQty] = useState<{ [key: number]: boolean }>({}) // Tracks validity of quantity for each product

  const s = StyleSheet.create({
    card: {
      flex: 5,
      flexDirection: 'row',
      alignItems: 'center',
      height: 104,
      width: '100%',
      justifyContent: 'space-between',
      paddingVertical: 8
    },
    listProductCardData: {
      textAlign: 'center',
      flex: 1,
      color: "white",
      fontSize: 18,
    },
  });
  const DeleteItem = async () => {
    try {
      const stmt = await db.prepareAsync('DELETE FROM produits WHERE id = $id');
      let result = await stmt.executeAsync({ $id: produit.id });
      console.log("result : ", result.lastInsertRowId, result.changes);
    } catch (error) {
      console.log(error);
    }

  }

  if (from === 'cart')
    produit = produit as CartItem
  else
    produit = produit as Product

  console.log(produit);
  return (
    <Pressable style={s.card}
      onPress={() => {
        router.navigate({ pathname: '/products/[id]', params: { id: produit.id } })
      }}
    >
      <Image
        source={{ uri: produit.image }}
        style={{ flex: 1, height: '60%', aspectRatio: 1, borderRadius: 8, marginRight: 5 }}
        resizeMode='contain'
      />

      <View style={{ flex: 2, flexDirection: 'column', alignItems: 'flex-start', justifyContent: from == "cart" ? 'space-between' : 'center', height: '100%' }}>
        <Text style={{ color: colors.text, fontSize: from === "cart" ? 16 : 24, fontFamily: "Macondo", flexWrap: "wrap" }}>
          {produit.nom}
        </Text>
        {from === "cart" ?
          <>
            <Text style={{ color: colors.text, fontSize: 14, fontFamily: "Macondo", opacity: 0.6 }}>
              {produit.prix}$ l'unité
            </Text>

            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Pressable
                onPress={() => {
                  if(produit.quantity > 1)
                    modifyCart(produit.id, produit.quantity - 1, account?.id ?? 0)
                    
                }}
              >
                <MaterialCommunityIcons name="minus" size={24} color={colors.tint} />
              </Pressable>
              <Text style={{ color: colors.text, fontSize: 16, fontFamily: "Macondo" }}>
                {produit.quantity}
              </Text>
              <Pressable
                style={{ opacity: validQty[produit.id] === false ? 0.5 : 1 }} // Dim the "+" button if the quantity is invalid
                disabled={validQty[produit.id] === false} // Disable the "+" button if the quantity is invalid
                onPress={async () => {
                  let valid = await modifyCart(produit.id, produit.quantity + 1, account?.id ?? 0)
                  setValidQty(prev => ({ ...prev, [produit.id]: valid }))
                }}
              >
                <MaterialCommunityIcons name="plus" size={24} color={colors.tint} />
              </Pressable>
            </View>
          </>
          :
          <></>
        }
      </View>
      {from === "cart" ?
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 8 }}>
          <Text style={[typography.subtitle, { color: colors.text, fontSize: 16 }]}>
            Prix total
          </Text>
          <Text style={[typography.body, { color: colors.text }]}>
            {(produit.prix * produit.quantity)}$
          </Text>
        </View>
        :
        <>
          <Text style={{ color: colors.text, fontSize: 18, fontFamily: "Macondo", opacity: 0.6 }}>
            {produit.prix}$
          </Text>
        </>
      }
      <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Pressable
          style={{ marginTop: 14 }}
          onPress={() => {
            if (from === "cart")
              removeFromCart(produit.id, account?.id ?? 0)
            else if (from === "delete") {
              DeleteItem()
              router.push({ pathname: '/(tabs)/admin'})
            }
          }}
        >
          <MaterialCommunityIcons name={from === "cart" ? "delete" : from === "delete" ? "delete-forever" : "arrow-right"} size={24} color={colors.tint} />
        </Pressable>
        {from === "products" &&
          <Text style={[typography.subtitle, { color: colors.text, fontSize: 14 }]}>
            {itemInCart(produit.id, account?.id ?? 0)?.quantity}
          </Text>
        }
        {/* {from === "cart" ?
          <Pressable
            style={{ marginTop: 14 }}
            onPress={() => {
              removeFromCart(produit.id, account?.id ?? 0)              
            }}
          >
            <MaterialCommunityIcons name={ "delete"} size={24} color={colors.tint} />
          </Pressable>
          :
          <MaterialCommunityIcons name='arrow-right' size={24} color={colors.tint} />
        } */}

      </View>
    </Pressable>
  );
}

export default ListProductCard