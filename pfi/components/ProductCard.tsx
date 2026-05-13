import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from './Themed';


export default function ProductCard(props: {produit:any}) {
  // produit : nom, description, prix, image (string, string, float, string);
  return (
    <View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  productCardContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  
});
