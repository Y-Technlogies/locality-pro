import React from "react";
import { Box, Button, HStack, ScrollView, Stack, Text } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { uploadPhoto } from "../../utils/uploadPhoto";
import Toast from "react-native-toast-message";
import HeaderOnly from "../../components/HeaderOnly";

export default function CreateProfile2({ navigation, route }) {
  const [photoID, setPhotoID] = React.useState(null);

  const [authorizingProof, setAuthorizingProof] = React.useState(null);

  const [certificate, setCertificate] = React.useState(null);

  const handleNext = () => {
    try {
      if (!photoID || !authorizingProof || !certificate) {
        Toast.show({
          type: "error",
          text1: "Enter all input field",
        });
      } else {
        const payload = {
          ...route.params.data,
          photoID,
          tradeCertificate: authorizingProof,
          trainingCertificate: certificate,
        };
        navigation.navigate("CreateProfile3", {
          data: payload,
        });
      }
    } catch (error) {}
  };
  return (
    <Box flex="1" bg={colors.light}>
      <HeaderOnly title="Work with us" steps="3/6" />
      <Box flex="1">
        <Stack
          direction={"row"}
          mx="8"
          my="3"
          borderRadius={"full"}
          bg={colors.primaryLight}
          h="5"
        >
          <Box w="1/6" h="100%" borderRadius={"full"} />
          <Box w="1/6" h="100%" borderRadius={"full"} />
          <Box bg={colors.primary} w="1/6" h="100%" borderRadius={"full"} />
        </Stack>
        <ScrollView flex="1">
          <Box pb="2" mx="3">
            <Text fontSize={"sm"}>
              Update your information for profile approval, your prompt action
              is required within 24 hours after you were provided with user
              login credentials, if not submitted, your login will be
              deactivated.
            </Text>
          </Box>
          <Stack pb="2" px="2" space="2">
            <Stack space="2">
              <Text color={colors.secondary} fontWeight="semibold">
                Upload your photo ID (Provincial ID, driving license, passport
                copy)
              </Text>
              <Button
                onPress={() => uploadPhoto(setPhotoID)}
                bg={colors.primary}
                variant="solid"
              >
                <HStack alignItems={"center"}>
                  <FontAwesome
                    name={photoID ? "check" : "image"}
                    size={24}
                    color={colors.white}
                  />
                  <Text pl="3" color={colors.white}>
                    {photoID ? "Change Photo" : "Choose Photo"}
                  </Text>
                </HStack>
              </Button>
              <Text fontSize={"xs"}>
                Your photo upload should not exceed above 10MB
              </Text>
            </Stack>
            <Stack space="2">
              <Text color={colors.secondary} fontWeight="semibold">
                Upload your provincial/federal trades certificate related to
                your work obtained from any authorized or governing body
              </Text>
              <Button
                onPress={() => uploadPhoto(setAuthorizingProof)}
                bg={colors.primary}
                variant="solid"
              >
                <HStack alignItems={"center"}>
                  <FontAwesome
                    name={authorizingProof ? "check" : "image"}
                    size={24}
                    color={colors.white}
                  />
                  <Text pl="3" color={colors.white}>
                    {authorizingProof ? "Change Photo" : "Choose Photo"}
                  </Text>
                </HStack>
              </Button>
              <Text fontSize={"xs"}>
                Your photo upload should not exceed above 10MB
              </Text>
            </Stack>
            <Stack space="2">
              <Text color={colors.secondary} fontWeight="semibold">
                Upload your provincial/federal training certificate related to
                your work obtained from any authorized training or learning
                institutions
              </Text>
              <Button
                onPress={async () => uploadPhoto(setCertificate)}
                bg={colors.primary}
                borderColor={colors.primary}
                variant="outline"
              >
                <HStack>
                  <FontAwesome
                    name={certificate ? "check" : "image"}
                    size={24}
                    color={colors.white}
                  />
                  <Text pl="3" color={colors.white}>
                    {certificate ? "Change Photo" : "Choose Photo"}
                  </Text>
                </HStack>
              </Button>
              <Text fontSize={"xs"}>
                Your photo upload should not exceed above 10MB
              </Text>
            </Stack>
          </Stack>
        </ScrollView>
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
          <Button onPress={handleNext} w="20%">
            Next
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
