import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from './Themed';


const ListProductCard = (produit: any) => {
  const styles = StyleSheet.create({
    listProductCard: {
      width:'100%',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      borderColor: 'green',
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
