import Colors from '@/constants/Colors';
import { useAccount } from '@/contexts/account';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import ProfilePicture from '../../../components/profilePicture';
import { typography } from '@/constants/typography';

export default function Account() {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light']

    const db = useSQLiteContext()

    const { account } = useAccount() 

    const [edit, setEdit] = useState(false)
    const [userMdp, setUserMdp] = useState(account?.mdp)
    const [userAddress, setUserAddress] = useState(account?.address)

    const s = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            gap:32
        },
        dataContainer: {
            borderWidth: 1,
            borderColor: colors.tint,
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderRadius: 16,
            backgroundColor: colors.background,
            gap: 16,
            width: '80%',
            alignItems:'center'
        },
        dataLine: {
            flexDirection: "row",
            width: '100%'            
        },
        dataLabel: {
            color: colors.text,
            opacity: 0.3,
            fontSize: 20,
            width: "48%",
            fontFamily:"Macondo"
        },
        data: {
            alignSelf:'center',
            color: colors.text,
            fontSize: 20,
            maxWidth: '52%',     
            flexWrap: 'wrap',
            fontFamily: "Macondo",
            borderRadius: 8,
            borderColor:colors.tint,
        },
        line: {
            height: 1,
            width: '90%',
            backgroundColor: colors.text,
            opacity: 0.3
        },
        
        editBtn: {
            position: 'absolute',
            bottom: 24,
            right: 16,
            borderWidth: 1,
            borderRadius: 100,
            borderColor: colors.text,
            padding: 6,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20
        },
        editable: {
            ...(edit ? {
                borderWidth: 1,
                padding: 6,
                zIndex:20
            }:{})
            
        }
    })

    useEffect(() => {
        if (!edit) { // if we finished editing, we save the changes
            const sql = "UPDATE clients SET "
            const keys: string[] = []
            const values: string[] = []

            if (account?.mdp !== userMdp && userMdp !== undefined) {
                keys.push('mdp = ?')
                values.push(userMdp)
            }
            if (account?.address !== userAddress && userAddress !== undefined) {
                keys.push('adresse = ?')
                values.push(userAddress)
            }   

            console.log("update executed", keys.length>0)

            if (keys.length > 0) {
                let userId = account?.id
                if (userId) {
                    db.runAsync(`${sql}${keys.join(', ')} WHERE id = ?`, [...values, userId])
                        .then((res) => {
                            console.log("edit success", res.changes)
                        }, (reason) => {
                            console.error(reason)
                        })
                        .catch(err => {
                            console.error(err)
                        })
                }
            }
        }
    }, [edit])

    return (
        <View style={s.container} >
            {Keyboard.isVisible() && 
                <Pressable style={{ top: 0, left: 0, height: '100%', width: '100%', position: 'absolute', zIndex: 10 }}
                    onPress={() => {
                        if (Keyboard.isVisible())
                            Keyboard.dismiss()
                    }}
                />
            }
            <View style={{height:124}}>
                <ProfilePicture isEditing={edit} pointerEvents="auto"/>
            </View>
            {account?.admin && <Text style={[typography.body, { color: colors.tint }]}>Admin</Text>}
            <View style={s.dataContainer}>
                <View style={s.dataLine}>
                    <Text style={s.dataLabel}>Pseudo: </Text>
                    <Text numberOfLines={1} style={s.data}>{ account?.username }</Text>
                </View>
                <View style={s.line} />
                <View style={s.dataLine}>
                    <Text style={s.dataLabel}>Mot de passe: </Text>
                    <TextInput 
                        numberOfLines={1} 
                        style={[s.data, s.editable]}
                        value={userMdp}
                        onChangeText={(text) => { setUserMdp(text.trim()) }}
                        readOnly={!edit}
                    />
                </View>
                <View style={s.line} />
                <View style={s.dataLine}>
                    <Text style={s.dataLabel}>Adresse: </Text>
                    <TextInput 
                        numberOfLines={2} 
                        multiline={true}
                        style={[s.data, s.editable]}
                        value={userAddress}
                        onChangeText={(text) => {
                            setUserAddress(text)
                        }}
                    />
                </View>
                <View style={s.line}/>
                <View style={s.dataLine}>
                    <Text style={s.dataLabel}>Courriel: </Text>
                    <Text numberOfLines={2} style={s.data}>{account?.email}</Text>
                </View>
                <View style={s.line}/>
                <View style={s.dataLine}>
                    <Text style={s.dataLabel}>Langue: </Text>
                    {/* TODO: changer pour une variable d'un contexte */}
                    <Text style={s.data}>Automatique</Text> 
                </View>
            </View>
            <TouchableOpacity onPress={()=> setEdit(!edit)} style={s.editBtn}>
                <MaterialCommunityIcons name="circle-edit-outline" size={32} color={colors.tint} />
            </TouchableOpacity>
        </View>
    )
}

