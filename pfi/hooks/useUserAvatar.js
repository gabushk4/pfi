import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as SecureStore from "expo-secure-store"

const AVATAR_KEY = (id) => `users/${id}/avatar`;
const AVATAR_DIR = new FileSystem.Directory(FileSystem.Paths.document, 'users/')

export function useUserAvatar(userId) {
    const [avatar, setAvatar] = useState(null);

    // Charger l'avatar au montage
    useEffect(() => {
        const file = new FileSystem.File(AVATAR_DIR, `${userId}/avatar.jpg`);
        if (file.exists) {
            setAvatar(file.uri);
        }      
    }, [userId]);

  const uploadAvatar = async () => {
    // Demander la permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission requise pour accéder à la librairie.");
      return;
    }

    // Ouvrir le picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],   // crop carré pour un avatar
      quality: 0.7,
    });

    if (result.canceled) return;

    const sourceUri = result.assets[0].uri;

    const destFile = new FileSystem.File(AVATAR_DIR, `${userId}.jpg`);
    const sourceFile = new FileSystem.File(sourceUri);
    sourceFile.copy(destFile);

    setAvatar(destFile.uri);
  };

  const removeAvatar = async () => {
    const destUri = `${AVATAR_DIR}${userId}.jpg`;
    await FileSystem.deleteAsync(destUri, { idempotent: true });
    await AsyncStorage.removeItem(AVATAR_KEY(userId));
    setAvatar(null);
  };

  return { avatar, uploadAvatar, removeAvatar };
}