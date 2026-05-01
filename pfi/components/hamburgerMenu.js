import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function HamburgerMenu({tintColor, onOpen}) {
  
  return (
    <TouchableOpacity onPress={()=>onOpen()}>
      <MaterialCommunityIcons name="menu" size={32} color={tintColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
