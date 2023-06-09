import React from "react";
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Pressable,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import colors from "../../theme/colors";
import BtnContainer from "./../../components/BtnContainer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { hp, wp } from "../../utils/screens";
import { useForgotPasswordSendOTPMutation } from "../../store/services/authApi";

export default function ForgotPassword({ navigation, route }) {
  const [email, setEmail] = React.useState("");
  const [forgotPasswordSendOTP, { isLoading }] =
    useForgotPasswordSendOTPMutation();
  const handleSigin = async () => {
    try {
      if (email === "") {
        Toast.show({
          type: "error",
          text1: "Please enter youer email.",
        });
      } else {
        const { data, error } = await forgotPasswordSendOTP({ email });
        if (data?.message === "Otp send successfully!") {
          Toast.show({
            type: "success",
            text1: "Otp send successfully!",
          });
          navigation.navigate("SendOTPForgotPassword", {
            email,
          });
        } else {
          Toast.show({
            type: "error",
            text1: error?.message,
          });
        }
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: e.message,
      });
    }
  };

  return (
    <Box flex={1} safeArea bg={colors.light}>
      <HStack alignItems={"center"}>
        <IconButton
          m="2"
          onPress={() => navigation.goBack()}
          alignItems={"center"}
          borderRadius={"lg"}
          variant="unstyled"
          // bg={colors.secondary}
          icon={
            <Image
              source={require("./../../../assets/Back.png")}
              size="xs"
              resizeMode="contain"
              alt="back btn"
            />
          }
        />
        <Text fontSize={"lg"} fontWeight="semibold">
          Forgot Password
        </Text>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box flex={"1"} mt="24">
          <Stack space={4} w="100%" alignItems="center">
            <Text
              fontWeight={"semibold"}
              color={colors.secondary}
              textAlign={"center"}
              fontSize={"lg"}
            >
              Reset your password
            </Text>
            <Input
              borderRadius="lg"
              bg={colors.white}
              autoCapitalize="none"
              onChangeText={(e) => setEmail(e)}
              value={email}
              w={wp("80%")}
              h={hp("5%")}
              InputLeftElement={
                <Icon
                  as={<MaterialCommunityIcons name="email" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              placeholder="Enter Email"
            />

            <Pressable onPress={handleSigin}>
              <BtnContainer
                isLoading={isLoading}
                title="Continue"
                width={wp("80%")}
              />
            </Pressable>
          </Stack>
        </Box>
      </ScrollView>
    </Box>
  );
}
