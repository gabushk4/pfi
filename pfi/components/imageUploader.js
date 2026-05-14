import Colors from '@/constants/Colors'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React, { useState } from 'react'
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Image, Pressable, StyleSheet, useColorScheme, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ImageUploader({ pointerEvents }) {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light']

    const AVATAR_KEY = (id) => `users/${id}/avatar`;
    const AVATAR_DIR = FileSystem.Paths.document.uri + 'users/'

    const { account } = useAccount() 
    
    const upload = () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Permission requise pour accéder à la librairie.");
            return;
        }
    
        

        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
        });

        if (result.canceled) return;

        const sourceUri = result.assets[0].uri;

        // copy to a known file location (Apple's URI are temporary ones)
        const sourceFile = new FileSystem.File(sourceUri);
        const destFile = new FileSystem.File(`${AVATAR_DIR}${userId}/avatar.jpg`);

        // Creating the directory if necessary
        const destDir = new FileSystem.Directory(`${AVATAR_DIR}${userId}/`);
        if (!destDir.exists) {
        destDir.create({ intermediates: true });
        }
    
        // Final copy to known file location
        sourceFile.copy(destFile);
        setAvatar(destFile.uri + '?t=' + Date.now());
    }

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