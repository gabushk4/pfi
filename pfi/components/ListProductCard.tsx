import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { View } from './Themed';


const ListProductCard = (produit: any) => {
  console.log("entering listProductCard : produit = " + produit.item);
  let { id, nom, description, prix, image } = produit.item;
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
    </View>
  );
}
export default ListProductCard;
const styles = StyleSheet.create({
  listProductCard: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,

  },
  listProductCardData: {
    flex: 1,
    color: "white",
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 3,
  },



});
