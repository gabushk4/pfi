import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, Image, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { typography } from '@/constants/typography';
import Colors from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Landing() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const window = Dimensions.get("window");

    return (
        <View style={[s.container, {height:window.height, width:window.width}]}>
            <View style={[s.slot]}>
                    <Text style={[typography.title, { fontSize: 64, color: colors.tint }]}>Arcane</Text>
            </View>
            <View style={s.slotImage}>
                <Image
                    source={require('../assets/images/arcane.png')}
                    style={s.image}
                    resizeMode='contain'
                />
            </View>
            <View style={[s.slot, { gap: 20, width: '100%' }]}>
                <View style={{alignItems:'flex-end', width:'100%'}}>
                    <TouchableOpacity style={[s.button, {borderColor:colors.text}]} onPress={() => router.push('/(auth)/login')}>
                        <AntDesign name="login" size={32} color={colors.tint} />
                    </TouchableOpacity>    
                </View>
                <View style={{ justifyContent:'flex-end', alignItems:'center', gap:8}}>
                    <Text style={[typography.subtitle, {color: colors.text}]}>Créé par: </Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'100%' }}>
                        <Text style={[typography.body, {fontSize: 20, color: colors.text }]}>Gabriel P. Levesque</Text>
                        <Text style={[typography.body, {color: colors.text}]}>&</Text>
                        <Text style={[typography.body, {fontSize: 20, color: colors.text}]}>Vincent Boisvert</Text>
                    </View>
                </View>                
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },    
    slot: {
        paddingHorizontal: 16,
        paddingVertical:4,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    slotImage: {
        flex: 3,
        width: '100%'
    },
    image: {
        height: '90%',
        width: 'auto'
    },
    button: {
        position: 'relative',
        marginBottom:-16,
        borderRadius: 100,
        borderWidth: 1,
        
        padding: 6,
        alignItems: 'center',
        justifyContent:'center'
    }
})