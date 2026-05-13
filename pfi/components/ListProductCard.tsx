import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { View } from './Themed';

const ListProductCard = (produit: any) => {
  const styles = StyleSheet.create({
    listProductCard: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      borderColor: 'red',
      borderStyle: 'solid',
      borderWidth: 1,
      margin: 3,

    },
    listProductCardData: {
      textAlign: 'center',
      flex: 1,
      color: "white",
      fontSize: 18,
    },



  });
  console.log("entering listProductCard : produit = " + produit.item);
  let { id, nom, description, prix, image } = produit.item;
  const fleche = "->"
  console.log(" listProductCard produit : " + produit.item);
  return (
    <View style={styles.listProductCard}>
      <Text style={styles.listProductCardData}>
        {image}
      </Text>
      <Text style={styles.listProductCardData}>
        {nom}
      </Text>
      <Text style={styles.listProductCardData}>
        {prix}
      </Text>
      <Pressable onPress={() => {
        router.navigate({pathname: "/products/[id]", params: { id: id}})
      }}>
      <Text style={styles.listProductCardData}>
        Details {fleche}
      </Text>
      </Pressable>

    </View>
  );
}
export default ListProductCard;
