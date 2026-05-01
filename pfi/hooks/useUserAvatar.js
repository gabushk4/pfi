import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

const AVATAR_KEY = (id) => `users/${id}/avatar`;
const AVATAR_DIR = FileSystem.Paths.document.uri + 'users/'

export function useUserAvatar(userId) {
    const [avatar, setAvatar] = useState(null);

    // Charger l'avatar au montage
    useEffect(() => {
        const file = new FileSystem.File(`${AVATAR_DIR}${userId}/avatar.jpg`);
      if (file.exists) {
          setAvatar(file.uri + '?t=' + Date.now());
        }      
    }, [userId]);

 const uploadAvatar = async () => {
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
    
    //Remove avatr before uploading a new one
    removeAvatar()

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
};

  const removeAvatar = async () => {
    const destFile = new FileSystem.File(`${AVATAR_DIR}${userId}/avatar.jpg`);
    if (destFile.exists) {
      destFile.delete();
    }
    setAvatar(null);
  };

  return { avatar, uploadAvatar, removeAvatar };
}