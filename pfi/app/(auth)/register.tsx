import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { Link, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function Register() {

    const db = useSQLiteContext()
    const router = useRouter()
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? "light"]
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
                padding: 8,
                zIndex:20
            },
            line: {
                height: 1,
                width: '90%',
                backgroundColor: colors.text,
                opacity: 0.3
            },
    })
    
    const [pseudo, setPseudo] = useState('')
    const [courriel, setCourriel] = useState('')
    const [mdp, setMdp] = useState('')
    const [adress, setAdress] = useState('')

    const courrRegex = RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)

    const [courrielValide, setCourrielValide] = useState(true)

    const inscription = async () => {
        const row = await db.runAsync('INSERT INTO clients (pseudo, mdp, courriel, adresse) VALUES(?, ?, ?, ?)', [pseudo.trim(), mdp.trim(), courriel.trim(), adress.trim()])
        if (row.changes > 0) {
            Alert.alert("Inscription réussie", "Votre compte a été créé avec succès")
            router.replace('/(auth)/login')
        } else {
            Alert.alert("Inscription impossible", "Une erreur s'est produite à l'insription; veuillez réessayer plus tard")
        }
    }

    useEffect(() => {
        if (courrRegex.test(courriel))
            setCourrielValide(true)
        else if(courriel.length > 0)
            setCourrielValide(false)
    }, [courriel, courrielValide])

    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.container}>
            <Text style={[typography.title, { color: colors.text }]}>Bienvenu { pseudo }</Text>
            <Pressable style={s.inputContainer}>
                <TextInput style={s.input}
                    placeholder='Pseudo'
                    value={pseudo}
                    onChangeText={(text)=>setPseudo(text)}
                />
                <View style={{width:'100%', alignItems:'center', gap:4}}>
                    <TextInput style={[s.input, {color:courrielValide ? colors.text : 'red'}]}
                        placeholder='Courriel'
                        inputMode='email'
                        value={courriel}
                        onChangeText={(text) => {
                            setCourriel(text)
                        }}
                    />
                    <Text style={[typography.subtitle, { color:'red', fontSize:18, display:courrielValide ? 'none' : 'flex'}]}>Courriel invalide</Text>
                </View>
                <TextInput style={s.input}
                    placeholder='Mot de passe'
                    value={mdp}
                    onChangeText={(text) => setMdp(text)}
                    secureTextEntry={true}
                    
                />
                <TextInput style={s.input}
                    placeholder='Adresse'
                    value={adress}
                    onChangeText={(text) => setAdress(text)}                    
                />
            </Pressable>
            <Link href={'/(auth)/login'}>
                <Text style={[typography.body, { color: colors.text, opacity: 0.6, textDecorationLine: 'underline', textDecorationColor: colors.tint, }]}>Déjà un compte?</Text>
            </Link>
            <TouchableOpacity style={s.button}
                onPress={() => {
                    inscription()
                }}
            >
                <Text style={[typography.body, {color:colors.text, fontSize:20}]}>Continuer</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}