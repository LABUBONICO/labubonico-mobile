import * as ImagePicker from "expo-image-picker";

export async function pickImage() {

  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (!permission.granted) {
    alert("Permissão para acessar a galeria é necessária!");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    quality: 0.8,
    base64: true, // importante!
  });

  if (!result.canceled) {
    return result.assets[0];
  }

  return null;
}
