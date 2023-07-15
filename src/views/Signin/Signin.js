import React from "react";
import {
  Box,
  Button,
  FormControl,
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
import { Formik } from "formik";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { hp, wp } from "../../utils/screens";
import { object, string } from "yup";
import { useSigninUserMutation } from "../../store/services/authApi";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../utils/notification";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function Signin({ navigation, route }) {
  const [show, setShow] = React.useState(false);
  const [signinUser, { isLoading }] = useSigninUserMutation();
  const initialValue = {
    email: "",
    password: "",
  };
  const [expoPushToken, setExpoPushToken] = React.useState("");
  // console.log(
  // "🚀 ~ file: Signin.js:36 ~ Signin ~ expoPushToken:",
  // expoPushToken
  // );
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const RegisterValidation = object().shape({
    email: string()
      .required("Valid email required")
      .email("Valid email required"),
    password: string()
      .min(6, "Password should be at least 6 character.")
      .required("Required"),
  });

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        expo_token: expoPushToken,
      };
      const { error, data } = await signinUser(payload);
      console.log({ error, data });
      console.log(JSON.stringify(error));
      if (error === undefined) {
        Toast.show({
          type: "success",
          text1: "Login successful!",
        });
        navigation.navigate("App");
      } else {
        Toast.show({
          type: "error",
          text1: error?.data?.error?.message,
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
          Sign in
        </Text>
      </HStack>
      <ScrollView flex="1" showsVerticalScrollIndicator={false}>
        <Box flex={"1"} mt="24">
          <Stack space={4} w="100%" alignItems="center">
            <Image
              source={require("./../../../assets/icons.png")}
              size="xl"
              resizeMode="contain"
              alt="icon"
            />
            <Text textAlign={"center"} fontSize={"md"}>
              {route?.params?.text !== undefined
                ? route?.params?.text
                : "Sign-in to Continue"}
            </Text>
            <Formik
              initialValues={initialValue}
              onSubmit={handleSubmit}
              validationSchema={RegisterValidation}
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
                  <Stack space={4} w="100%" alignItems="center">
                    <Stack space="2">
                      <Input
                        value={values.email}
                        onBlur={handleBlur("email")}
                        onChangeText={handleChange("email")}
                        borderRadius="lg"
                        bg={colors.white}
                        autoCapitalize="none"
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
                      {touched?.email && errors?.email ? (
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
                            {errors?.email}
                          </Text>
                        </Stack>
                      ) : null}
                    </Stack>
                    <Stack space="2">
                      <Input
                        borderRadius="lg"
                        bg={colors.white}
                        autoCapitalize="none"
                        value={values.password}
                        onBlur={handleBlur("password")}
                        onChangeText={handleChange("password")}
                        h={hp("5%")}
                        w={wp("80%")}
                        InputLeftElement={
                          <Icon
                            as={<MaterialIcons name="lock" />}
                            size={5}
                            ml="2"
                            color="muted.400"
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
                      {touched.password && errors.password ? (
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
                            {errors?.password}
                          </Text>
                        </Stack>
                      ) : null}
                    </Stack>
                    <Button
                      pr={wp("10%")}
                      alignSelf={"flex-end"}
                      onPress={() => navigation.navigate("ForgotPassword")}
                      variant={"link"}
                      _text={{ color: "#4D4D4D" }}
                    >
                      Forgot password?
                    </Button>
                    <Pressable isLoading={isLoading} onPress={handleSubmit}>
                      <BtnContainer
                        isLoading={isLoading}
                        title="Continue"
                        width={wp("80%")}
                      />
                    </Pressable>

                    <Button
                      onPress={() => navigation.push("Signup")}
                      flexDirection="row"
                      w={{
                        base: "75%",
                        md: "25%",
                      }}
                      variant="link"
                    >
                      <Text color={colors.primary}>
                        <Text color={colors.black} fontWeight="bold">
                          Don't have an account?
                        </Text>{" "}
                        Sign Up
                      </Text>
                    </Button>
                  </Stack>
                </FormControl>
              )}
            </Formik>
          </Stack>
        </Box>
      </ScrollView>
    </Box>
  );
}
