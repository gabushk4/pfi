//Gabriel Pereira Levesque

import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { useAccount } from '@/contexts/account';
import { Link } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Alert, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

type User = {
    id: number,
    pseudo: string,
    courriel: string,
    adresse: string,
    mdp: string,
    admin: number,
    courriel_verifie_a: Date | null
}

const defaultUser : User = {
    id: 0,
    pseudo: "defaut",
    courriel: "defaut",
    adresse: "defaut",
    mdp: "mdp",
    admin: 0,
    courriel_verifie_a: null
}

export default function Login() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const db = useSQLiteContext()
    const { login } = useAccount()

    const [pseudo, setPseudo] = useState('')
    const [mdp, setMdp] = useState('')

    const connection = async () => {
        let user: User = await db.getFirstAsync('SELECT * FROM clients WHERE pseudo = ?', [pseudo.trim()]) ?? defaultUser
        if (user.id != 0) {
            let account = {
                id: user.id,
                username: user.pseudo,
                email: user.courriel,
                address: user.adresse,
                mdp: user.mdp,
                admin: user.admin === 1,
                emailVerified: user.courriel_verifie_a != null
            }
            login(account)
        } else {
            setMdp('')
            Alert.alert("Authentification échouée", 'Votre pseudo ou votre mot de passe est invalide')
        }
    }
    
    const s = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap:16
        },
        button:{
            borderRadius: 8,
            borderWidth: 1,
            padding: 12,
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:colors.tint
        },
        inputContainer: {
            borderColor: colors.tint,
            paddingVertical: 16,
            borderRadius: 16,
            backgroundColor: colors.background,
            gap: 24,
            width: '80%',
            alignItems:'center'
        },
        inputLine: {
            flexDirection: "row",
            width: '100%',
            alignItems:'center'
        },
        inputLabel: {
            color: colors.text,
            opacity: 0.6,
            fontSize: 20,
            width: "40%",
            fontFamily:"Macondo"
        },
        input: {
            alignSelf:'center',
            color: colors.text,
            fontSize: 20,
            width: '100%',     
            flexWrap: 'wrap',
            height:40,
            fontFamily: "Macondo",
            borderRadius: 8,
            borderColor: colors.tint,
            borderBottomWidth: 1,
            backgroundColor: colors.backdrop,
            padding:8
        },
        line: {
            height: 1,
            width: '90%',
            backgroundColor: colors.text,
            opacity: 0.3
        },
    })
    
    return (
        <Pressable style={s.container} onPress={() => {
            if (Keyboard.isVisible()) {
                Keyboard.dismiss()
            }
        }}>
            <Text style={[typography.title, { color: colors.text }]}>Rebonjour {pseudo}</Text>
            <View style={s.inputContainer}>
                <View style={s.inputLine}>
                    <TextInput style={s.input}
                        placeholder='Pseudo'
                        value={pseudo}
                        onChangeText={(text)=>setPseudo(text)}
                    />
                </View>
                <View style={s.inputLine}>
                    <TextInput style={s.input}
                        secureTextEntry={true}
                        placeholder='Mot de passe'
                        value={mdp}
                        onChangeText={(text)=>setMdp(text)}
                    />
                </View>
            </View>
            <Link href={'/(auth)/register'}>
                <Text style={[typography.body, { color: colors.text, opacity: 0.6, textDecorationLine: 'underline', textDecorationColor: colors.tint, }]}>
                    Pas encore de compte?
                </Text>
            </Link>
            <TouchableOpacity style={[s.button, { borderColor: colors.tint }]}
                onPress={()=>{connection()}}
            >
                <Text style={[typography.body, {color:colors.text, fontSize:20}]}>Connexion</Text>
            </TouchableOpacity>            
        </Pressable>
    )
}

