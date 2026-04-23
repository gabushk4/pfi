import Colors from '@/constants/Colors';
import { typography } from '@/constants/typography';
import { useAccount } from '@/contexts/account';
import { useSQLiteContext } from 'expo-sqlite';
import { View, Text, useColorScheme, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Account() {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light']

    const { account } = useAccount() 

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
            width:"48%"
        },
        data: {
            alignSelf:'center',
            color: colors.text,
            fontSize: 20,
            maxWidth: '52%',     
            flexWrap: 'wrap',
            
        },
        line: {
            height: 1,
            width: '90%',
            backgroundColor: colors.text,
            opacity: 0.3
        },
        pfpContainer: {
            borderRadius: 100,
            borderWidth: 1, 
            borderColor: colors.tint,
            height: 124,
            aspectRatio: "1/1",
            alignItems: 'center',
            justifyContent:'center'
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
            justifyContent:'center'
        }
    })

    const icones = {
        defaultPfp: colorScheme == "light" ? require("../../../assets/images/default_pfp_light.png") : require("../../../assets/images/default_pfp_dark.png")
    }
    
    return (
        <View style={s.container}>
            <View style={s.pfpContainer}>
                <Image
                    source={icones.defaultPfp}
                    style={{ maxHeight: '90%', maxWidth: '90%' }}
                    resizeMode='contain'
                />
            </View>
            <View style={s.dataContainer}>
                <View style={s.dataLine}>
                    <Text style={s.dataLabel}>Pseudo: </Text>
                    <Text numberOfLines={1} style={s.data}>{ account?.username }</Text>
                </View>
                <View style={s.line} />
                <View style={s.dataLine}>
                    <Text style={s.dataLabel}>Mot de passe: </Text>
                    <Text numberOfLines={1} style={s.data}>{ account?.mdp }</Text>
                </View>
                <View style={s.line} />
                <View style={s.dataLine}>
                    <Text style={s.dataLabel}>Adresse: </Text>
                    <Text numberOfLines={2} style={s.data}>{account?.address}</Text>
                </View>
                <View style={s.line}/>
                <View style={s.dataLine}>
                    <Text style={s.dataLabel}>Courriel: </Text>
                    <Text numberOfLines={2} style={s.data}>{account?.email}</Text>
                </View>
            </View>
            <TouchableOpacity style={s.editBtn}>
                <MaterialCommunityIcons name="circle-edit-outline" size={32} color={colors.tint} />
            </TouchableOpacity>
        </View>
    )
}

