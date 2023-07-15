import React from "react";
import { Box, Button, Stack, Text } from "native-base";

import colors from "../../theme/colors";

import HeaderOnly from "../../components/HeaderOnly";

import Toast from "react-native-toast-message";

import { Alert, StyleSheet } from "react-native";
import { useSignUpMutation } from "../../store/services/authApi";
import axios from "axios";
import baseURL from "../../utils/baseURL";
const IMAGE_SIZE = 100;
export default function CreateProfile5({ navigation, route }) {
  const { data } = route.params;
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNext = async () => {
    const experience = {
      title: data?.title,
      description: data?.description,
      link: data?.link,
    };

    let formData = new FormData();
    formData.append("email", data?.email);
    formData.append("password", data?.password);
    formData.append("phone", data?.phone);
    formData.append("address", data?.address);
    formData.append("photo", data?.photo);
    formData.append("organization", data?.organization);
    formData.append("businessType", data?.businessType);
    formData.append("skillType", JSON.stringify(data?.skillType));
    formData.append("photoID", data?.photoID);
    formData.append("tradeCertificate", data?.tradeCertificate);
    formData.append("trainingCertificate", data?.trainingCertificate);
    formData.append("experience", JSON.stringify(experience));
    formData.append("skill", data?.skill);
    // console.log(
    // "🚀 ~ file: CreateProfile5.js:38 ~ handleNext ~ formData:",
    // formData
    // );
    //    formData.append("showcase", data?.showcase);
    data?.showcase.map((x) => formData.append("showcase", x));

    try {
      setIsLoading(true);

      const userData = await axios.post(
        baseURL + "/auth/contractor_register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (userData?.error?.status === 409) {
        Toast.show({
          type: "error",
          text1: userData?.error?.data?.error?.message,
        });
      } else if (userData?.data?.message === "Successfully Registered") {
        Toast.show({
          type: "success",
          text1: userData?.data?.message,
        });
        navigation.navigate("SendOTP", {
          email: data?.email,
          phone: data?.phone,
        });
      } else {
        Alert.alert(JSON.stringify(userData));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: "error",
        text1: "Something went wrong try again.",
      });
    }
  };
  return (
    <Box flex="1" bg={colors.light}>
      <HeaderOnly title="Work with us" steps="6/6" />
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
          <Box w="1/6" h="100%" borderRadius={"full"} />
          <Box bg={colors.primary} w="1/6" h="100%" borderRadius={"full"} />
        </Stack>
        <Box p="2" pb="4">
          <Text
            textAlign={"center"}
            fontSize={"md"}
            color={colors.primary}
            fontWeight={"semibold"}
          >
            Review your information before submission
          </Text>
        </Box>
        <Stack space="2" m="3">
          <Stack space="2">
            <Text fontSize={"md"} fontWeight={"semibold"}>
              Name
            </Text>
            <Box p="3" borderRadius={"md"} bg={colors.white}>
              <Text>{data?.organization}</Text>
            </Box>
          </Stack>
          <Stack space="2">
            <Text fontSize={"md"} fontWeight={"semibold"}>
              Email
            </Text>
            <Box p="3" borderRadius={"md"} bg={colors.white}>
              <Text>{data?.email}</Text>
            </Box>
          </Stack>
          <Stack space="2">
            <Text fontSize={"md"} fontWeight={"semibold"}>
              Address
            </Text>
            <Box p="3" borderRadius={"md"} bg={colors.white}>
              <Text>{data?.address}</Text>
            </Box>
          </Stack>
          <Stack space="2">
            <Text fontSize={"md"} fontWeight={"semibold"}>
              Phone
            </Text>
            <Box p="3" borderRadius={"md"} bg={colors.white}>
              <Text>{data?.phone}</Text>
            </Box>
          </Stack>
        </Stack>
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

          <Button isLoading={isLoading} onPress={handleNext} w="20%">
            Submit
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
