import {
  Box,
  FormControl,
  Icon,
  IconButton,
  Image,
  Input,
  Pressable,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import React from "react";
import colors from "../../theme/colors";
import { hp, wp } from "../../utils/screens";
import { Formik } from "formik";
import { object, string } from "yup";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import BtnContainer from "../../components/BtnContainer";
import { useSendOTPMutation } from "../../store/services/authApi";
import Toast from "react-native-toast-message";
export default function SendOTP({ navigation, route }) {
  const email = route?.params?.email;
  const phone = route?.params?.phone;
  const [sendOTP, { isLoading }] = useSendOTPMutation();
  const initialValue = {
    phone: phone,
  };
  const emailValidation = object().shape({
    phone: string().required("required"),
  });
  const handleSubmit = async (values) => {
    // navigation.replace("VerifyOTP", {
    //   email,
    //   phone: "+8801786233560",
    // });
    try {
      const { data, error } = await sendOTP(values);

      if (data?.message === "Otp send successfully!") {
        Toast.show({
          type: "success",
          text1: data?.message,
        });
        navigation.replace("VerifyOTP", {
          email,
          phone,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong. Try Again.",
        });
      }
    } catch (error) {
      console.log({ error });
      Toast.show({
        type: "error",
        text1: error?.message,
      });
    }
  };

  return (
    <Box flex={1} safeArea bg={colors.light}>
      {/* <IconButton
          alignSelf={"flex-start"}
          m="2"
          onPress={() => navigation.navigate("Signup")}
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
        /> */}
      <Box flex="1">
        <Image
          alignSelf={"center"}
          source={require("./../../../assets/OTP.png")}
          size="2xl"
          resizeMode="contain"
          alt="back btn"
          my="12"
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Box flex={"1"} mt="2">
            <Formik
              initialValues={initialValue}
              onSubmit={handleSubmit}
              //   validationSchema={emailValidation}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <FormControl isRequired>
                  <Stack
                    direction={"column"}
                    w="100%"
                    space="5"
                    alignItems={"center"}
                  >
                    <Stack space="2">
                      <Text
                        fontSize={"lg"}
                        fontWeight={"semibold"}
                        color={colors.primary}
                      >
                        Continue with your phone number
                      </Text>
                      <Input
                        borderRadius="lg"
                        bg={colors.white}
                        autoCapitalize="none"
                        h={hp("5%")}
                        w={wp("80%")}
                        value={values.phone}
                        onBlur={handleBlur("phone")}
                        onChangeText={handleChange("phone")}
                        InputLeftElement={
                          <Icon
                            as={<MaterialCommunityIcons name="phone" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                          />
                        }
                        placeholder="Enter your phone number"
                      />
                      {touched?.phone && errors?.phone ? (
                        <Stack
                          space="2"
                          alignItems={"center"}
                          flexDirection={"row"}
                        >
                          <MaterialIcons
                            name="error"
                            size={24}
                            color={colors.delete}
                          />
                          <Text pl="2" color={colors.delete}>
                            {errors?.phone}
                          </Text>
                        </Stack>
                      ) : null}
                    </Stack>
                    <Pressable onPress={handleSubmit}>
                      <BtnContainer
                        width={wp("80%")}
                        isLoading={isLoading}
                        title="Send OTP"
                      />
                    </Pressable>
                  </Stack>
                </FormControl>
              )}
            </Formik>
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
}
