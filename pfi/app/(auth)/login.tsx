import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { View, Text, useColorScheme, StyleSheet, TouchableOpacity } from 'react-native';
import { useAccount } from '@/contexts/account';

export default function Login() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const user = {
        username: "test",
        email: "sorcier@yopmail.com",
        id: 0,
        emailVerified: true,
        address: "123 rue Duquette, Sainte-Thérèse", 
        mdp:'Test1234$'
    }

    const {login} = useAccount()
    
    return (
        <View style={s.container}>
            <TouchableOpacity style={[s.button, { borderColor: colors.tint }]}
                onPress={()=>{login(user)}}
            >
                <Text style={[typography.body, {color:colors.tint}]}>Connexion</Text>
            </TouchableOpacity>            
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    button:{
        borderRadius: 8,
        borderWidth: 1,
        padding:8
    }
})