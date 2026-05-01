import Colors from '@/constants/Colors'
import { useAccount } from '@/contexts/account'
import { useUserAvatar, } from '@/hooks/useUserAvatar'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, useColorScheme, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ProfilePicture({ isEditing, pointerEvents }) {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light']

    const { account } = useAccount() 
    const { avatar, uploadAvatar } = useUserAvatar(account?.id)

    const icones = {
        defaultPfp: colorScheme == "light" ? require("../assets/images/default_pfp_light.png") : require("../assets/images/default_pfp_dark.png")
    }

    const s = StyleSheet.create({
        pfpContainer: {
            position:'relative',
            borderRadius: 100,
            borderWidth: 1, 
            borderColor: colors.tint,
            height: '100%',
            aspectRatio: "1/1",
            alignItems: 'center',
            justifyContent: 'center',
            overflow:"hidden"
        },
        tapIndication: {
            position: 'absolute',
            
        }
    })    

    const [isLoading, setIsLoading] = useState(false)

    return (
        <Pressable style={s.pfpContainer} pointerEvents={pointerEvents}
            onPress={() => {
                console.log("inner profils pressed")
                if (isEditing) {
                    
                    setIsLoading(true)
                    
                    uploadAvatar()
                        .finally(() => {
                            setIsLoading(false)
                        })
                }
            }}
        >
            {isEditing &&
                <View style={s.tapIndication}>
                    <MaterialIcons name="touch-app" size={32} color={colors.tint} />
                </View>
            }
            {isLoading &&
                <View style={s.tapIndication}>
                    <AntDesign name="loading" size={32} color={colors.text} />
                </View>
            }
            <Image
                source={avatar != null ? {uri:avatar} : icones.defaultPfp}
                style={{ height: '100%', width: '100%', opacity:isEditing ? 0.4 : 1 }}
                resizeMode='contain'
                onError={(e) => console.log("Image error:", e.nativeEvent.error)}
            />
        </Pressable>
    )
}