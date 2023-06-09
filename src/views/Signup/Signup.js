import React from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Icon,
  Image,
  Input,
  Pressable,
  ScrollView,
  Stack,
} from "native-base";
import colors from "../../theme/colors";
import Toast from "react-native-toast-message";
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { hp, wp } from "../../utils/screens";
import { Platform } from "react-native";
import HeaderOnly from "../../components/HeaderOnly";

export default function Signup({ navigation, route }) {
  const [show, setShow] = React.useState(false);
  const [organization, setOrganization] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [photo, setPhoto] = React.useState(null);

  const handleSubmit = async () => {
    //  navigation.replace("CreateProfile1");
    try {
      if (!photo || email === "" || password === "" || organization === "") {
        Toast.show({
          type: "error",
          text1: "Enter all input field",
        });
      } else {
        const payload = {
          email,
          password,
          phone,
          organization,
          photo,
        };
        console.log({ payload });
        navigation.navigate("CreateProfile1", {
          data: payload,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const uploadPhotoFromGallery = async () => {
    try {
      if (Platform.OS === "android") {
        let result = await DocumentPicker.getDocumentAsync({});
        setPhoto({
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
          setPhoto({
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

  return (
    <Box position={"relative"} flex="1" bg={colors.light}>
      <ScrollView flex="1">
        <HeaderOnly title="Work with us" steps="1/6" />
        <Stack direction={"column"}>
          <FormControl isRequired flex="1" position={"relative"}>
            <Stack
              flex="1"
              h="full"
              direction="column"
              justifyContent={"space-between"}
            >
              <Box>
                <Stack
                  direction={"row"}
                  mx="8"
                  my="3"
                  borderRadius={"full"}
                  bg={colors.primaryLight}
                  h="5"
                >
                  <Box
                    bg={colors.primary}
                    w="1/6"
                    h="100%"
                    borderRadius={"full"}
                  />
                </Stack>
                <Stack space={4} w="100%" alignItems="center">
                  <Stack space="3" flex="1">
                    {photo ? (
                      <Image
                        alignSelf={"center"}
                        borderRadius={"full"}
                        source={{ uri: photo?.uri }}
                        alt="image"
                        size="lg"
                      />
                    ) : (
                      <Center>
                        <FontAwesome
                          name="user-circle"
                          size={36}
                          color={colors.primary}
                        />
                      </Center>
                    )}
                    <Button
                      onPress={uploadPhotoFromGallery}
                      variant="link"
                      _text={{ color: colors.secondary }}
                    >
                      {photo ? "Change Photo" : "Upload Photo"}
                    </Button>
                  </Stack>
                </Stack>
                <Stack space={4} w="100%" alignItems="center">
                  <Stack space="2">
                    <Input
                      borderRadius="lg"
                      bg={colors.white}
                      h={hp("5%")}
                      w={wp("80%")}
                      autoCapitalize="none"
                      value={organization}
                      onChangeText={(e) => setOrganization(e)}
                      InputLeftElement={
                        <Icon
                          as={<MaterialIcons name="person" />}
                          size={5}
                          ml="2"
                          color={colors.primary}
                        />
                      }
                      placeholder="Enter your Organization name"
                    />
                  </Stack>
                  <Stack space="2">
                    <Input
                      borderRadius="lg"
                      bg={colors.white}
                      autoCapitalize="none"
                      h={hp("5%")}
                      w={wp("80%")}
                      value={email}
                      onChangeText={(e) => setEmail(e)}
                      InputLeftElement={
                        <Icon
                          as={<MaterialCommunityIcons name="email" />}
                          size={5}
                          ml="2"
                          color={colors.primary}
                        />
                      }
                      placeholder="Enter your email"
                    />
                  </Stack>
                  <Stack space="2">
                    <Input
                      borderRadius="lg"
                      bg={colors.white}
                      autoCapitalize="none"
                      h={hp("5%")}
                      w={wp("80%")}
                      keyboardType="number-pad"
                      value={phone}
                      onChangeText={(e) => setPhone(e)}
                      InputLeftElement={
                        <Icon
                          as={<MaterialCommunityIcons name="phone" />}
                          size={5}
                          ml="2"
                          color={colors.primary}
                        />
                      }
                      placeholder="Enter your Phone number"
                    />
                  </Stack>
                  <Stack space="2">
                    <Input
                      borderRadius="lg"
                      bg={colors.white}
                      h={hp("5%")}
                      w={wp("80%")}
                      autoCapitalize="none"
                      value={password}
                      onChangeText={(e) => setPassword(e)}
                      InputLeftElement={
                        <Icon
                          as={<MaterialIcons name="lock" />}
                          size={5}
                          ml="2"
                          color={colors.primary}
                        />
                      }
                      type={show ? "text" : "password"}
                      InputRightElement={
                        <Pressable onPress={() => setShow(!show)}>
                          <Icon
                            as={
                              <MaterialIcons
                                name={show ? "visibility" : "visibility-off"}
                              />
                            }
                            size={5}
                            mr="2"
                            color="muted.400"
                          />
                        </Pressable>
                      }
                      placeholder="Password"
                    />
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </FormControl>
        </Stack>
        <Stack
          w="100%"
          pr="4"
          flex="1"
          mt="12"
          direction={"row"}
          justifyContent={"flex-end"}
          space={4}
        >
          <Button onPress={handleSubmit} w="20%">
            Next
          </Button>
        </Stack>
      </ScrollView>
    </Box>
  );
}
