import React from "react";
import { Box, Button, FlatList, HStack, Image, Stack, Text } from "native-base";
import Toast from "react-native-toast-message";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { ImagePicker } from "expo-image-multiple-picker";
import * as ExpoImagePicker from "expo-image-picker";
import HeaderOnly from "../../components/HeaderOnly";
import * as MediaLibrary from "expo-media-library";
import { Platform, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
const IMAGE_SIZE = 100;
export default function CreateProfile4({ navigation, route }) {
  const [selectedPhotos, setSelectedPhotos] = React.useState([]);
  const [photoActive, setPhotoActive] = React.useState(false);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  // console.log("🚀 ~ file: CreateProfile4.js:17 ~ CreateProfile4 ~ permissionResponse:", permissionResponse)

  // const handleSelectPhoto = async () => {

  //   if (permissionResponse?.granted) {
  //     setPhotoActive(true);
  //   } else {
  //     requestPermission();
  //   }
  // };
  const handleSelectPhoto = async () => {
    if (Platform.OS === "ios") {
      try {
        const { status } =
          await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
          return;
        }
        const result = await ExpoImagePicker.launchImageLibraryAsync({
          mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,

          aspect: [4, 3],
          quality: 0.3,
          selectionLimit: 5,
          allowsMultipleSelection: true,
        });

        if (!result.canceled) {
          setSelectedPhotos([
            ...selectedPhotos,
            ...result?.assets?.map((image) => ({
              uri:
                Platform.OS === "ios"
                  ? image?.uri?.replace("file://", "")
                  : image?.uri,
              name: image?.fileName,
              type: image?.type,
            })),
          ]);
        }
      } catch (error) {
        //console.log(error);
      }
    } else {
      try {
        if (permissionResponse?.granted) {
          setPhotoActive(true);
        } else {
          requestPermission();
        }
      } catch (error) {}
    }
  };
  const handleRemovePhoto = (photoUri) => {
    setSelectedPhotos(selectedPhotos.filter((photo) => photo.uri !== photoUri));
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ position: "relative", marginTop: 12 }}
        onPress={() => handleRemovePhoto(item.uri)}
      >
        <Box
          position={"absolute"}
          zIndex={"2"}
          bg={colors.white}
          borderRadius={"full"}
        >
          <Entypo name="circle-with-cross" size={24} color={colors.delete} />
        </Box>
        <Image source={{ uri: item.uri }} style={styles.photo} alt={item.uri} />
      </TouchableOpacity>
    );
  };
  const payload = {
    ...route?.params?.data,
    showcase: selectedPhotos,
  };
  console.log(
    "🚀 ~ file: CreateProfile4.js:99 ~ handleNext ~ selectedPhotos:",
    selectedPhotos
  );
  const handleNext = async () => {
    if (selectedPhotos.length === 0) {
      Toast.show({
        type: "error",
        text1: "Please select at least photo.",
      });
    } else {
      try {
        handleSkip();
      } catch (error) {
        console.log({ error });
      }
    }
  };
  const handleSkip = () => {
    navigation.navigate("CreateProfile5", {
      data: payload,
    });
  };

  if (photoActive) {
    return (
      <Box flex="1">
        <ImagePicker
          onSave={(assets) => {
            const photos = assets.map((x) => {
              return {
                uri:
                  Platform.OS === "ios"
                    ? x?.uri?.replace("file://", "")
                    : x?.uri,
                name: x?.filename,
                type: `image/${x.uri.split(".").pop()}`,
              };
            });
            setSelectedPhotos(photos);
            setPhotoActive(false);
          }}
          onCancel={() => {
            setSelectedPhotos([]);

            setPhotoActive(false);
          }}
          onSelectAlbum={(album) => setSelectedPhotos(album)}
          // selected={selectedPhotos}
          selectedAlbum={selectedPhotos}
          multiple
          limit={5}
          galleryColumns={4}
        />
      </Box>
    );
  }
  return (
    <Box flex="1" bg={colors.light}>
      <HeaderOnly title="Work with us" steps="5/6" />
      <Box flex="1">
        <Stack
          direction={"row"}
          mx="8"
          my="6"
          borderRadius={"full"}
          bg={colors.primaryLight}
          h="5"
        >
          <Box w="1/6" h="100%" borderRadius={"full"} />
          <Box w="1/6" h="100%" borderRadius={"full"} />
          <Box w="1/6" h="100%" borderRadius={"full"} />
          <Box w="1/6" h="100%" borderRadius={"full"} />
          <Box bg={colors.primary} w="1/6" h="100%" borderRadius={"full"} />
        </Stack>
        <Box p="2" pb="4">
          <Text
            textAlign={"center"}
            fontSize={"lg"}
            color={colors.primary}
            fontWeight={"semibold"}
          >
            Showcase your work experience or you can skip this part
          </Text>
        </Box>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          mx="3"
          space="3"
        >
          <Button
            w="100%"
            onPress={handleSelectPhoto}
            bg={colors.primary}
            variant="solid"
          >
            <HStack alignItems={"center"}>
              <FontAwesome name="image" size={24} color={colors.white} />
              <Text pl="3" color={colors.white}>
                Choose Photo
              </Text>
            </HStack>
          </Button>
        </Stack>
        <FlatList
          data={selectedPhotos}
          renderItem={renderItem}
          keyExtractor={(item) => item.uri}
          numColumns={"3"}
        />
        <Stack
          w="100%"
          pr="4"
          position={"absolute"}
          bottom="12"
          direction={"row"}
          justifyContent={"flex-end"}
          space={4}
        >
          <Button
            onPress={() => navigation.goBack()}
            bg={colors.white}
            w="20%"
            variant="outline"
          >
            Back
          </Button>
          <Button onPress={handleSkip} bg={colors.delete} w="20%">
            Skip
          </Button>
          <Button onPress={handleNext} w="20%">
            Next
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
const styles = StyleSheet.create({
  photo: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    margin: 8,
  },
});
