import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Platform } from "react-native";

export const uploadPhoto = async (setFile) => {

  try {
    if (Platform.OS === "android") {
      let result = await DocumentPicker.getDocumentAsync({});
      setFile({
        uri: result.uri,
        name: result.name,
        type: result.mimeType,
      });
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.2,
      });
      //console.log("result", JSON.stringify(result));
      if (!result?.canceled) {
        setFile({
          uri:
            Platform.OS === "ios"
              ? result?.assets[0]?.uri?.replace("file://", "")
              : result?.assets[0]?.uri,
          name: result?.assets[0]?.fileName,
          type: result?.assets[0]?.type,
        });
      }
    }
  } catch (e) {
    alert(e);
  }
};
export default uploadPhoto;
