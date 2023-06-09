import React from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import colors from "../../theme/colors";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { StyleSheet } from "react-native";
import BtnContainer from "../../components/BtnContainer";
import Toast from "react-native-toast-message";
import { useForgotPasswordMutation } from "../../store/services/authApi";
import { hp, wp } from "../../utils/screens";
import { MaterialIcons } from "@expo/vector-icons";
export default function SendOTPForgotPassword({ navigation, route }) {
  const [timer, setTimer] = React.useState(180); // 5 minutes in seconds
  const [nesPassword, setNesPassword] = React.useState("");
  const email = route?.params?.email;
  const [verificationCode, setVerificationCode] = React.useState();
  const [value, setValue] = React.useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const CELL_COUNT = 4;
  React.useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      // alert("Time out!");
    }
    return () => clearInterval(interval);
  }, [timer]);
  const handleSubmit = async () => {
    if (email === "" || verificationCode?.length !== 4) {
      Toast.show({
        type: "error",
        text1: "Enter all input field",
      });
    } else {
      try {
        const payload = {
          email,
          newPassword: nesPassword,
          typedOTP: verificationCode,
        };

        const { data, error } = await forgotPassword(payload);

        if (data?.message === "Password Changed") {
          Toast.show({
            type: "success",
            text1: data?.message,
          });
          navigation.replace("Signin");
        } else {
          Toast.show({
            type: "error",
            text1: "Something went wrong.",
          });
          setTimer(0);
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error?.message,
        });
      }
    }
  };
  return (
    <Box flex={1} safeArea bg={colors.light}>
      <ScrollView>
        {/* <IconButton
      alignSelf={"flex-start"}
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
    /> */}
        <Stack space="3" p="3" mt="12">
          <Text
            fontSize={"lg"}
            fontWeight={"semibold"}
            color={colors.primary}
            textAlign={"center"}
          >
            Forgot Password
          </Text>
          <HStack alignItems={"center"}>
            <Text
              fontWeight={"semibold"}
              fontSize={"md"}
              color={colors.darkGray}
            >
              Enter OTP Code
            </Text>
          </HStack>
          <Stack space="4" alignItems={"center"}>
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={verificationCode}
              onChangeText={setVerificationCode}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </Stack>
          <Stack space="4">
            <Text
              fontWeight={"semibold"}
              fontSize={"md"}
              color={colors.darkGray}
            >
              Enter Your new password
            </Text>
            <Input
              borderRadius="lg"
              bg={colors.white}
              autoCapitalize="none"
              value={nesPassword}
              onChangeText={(e) => setNesPassword(e)}
              h={hp("5%")}
              w={wp("92%")}
              type={"password"}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="lock" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
            />
            <Pressable
              disabled={timer === 0}
              w={wp("92%")}
              onPress={handleSubmit}
            >
              <BtnContainer
                disabled={timer === 0}
                isLoading={isLoading}
                title="Verify"
              />
            </Pressable>
            {timer === 0 && (
              <Button variant="link" onPress={() => navigation.goBack()}>
                <Text fontSize={"md"} color={colors.primary} bold>
                  Try again
                </Text>
              </Button>
            )}

            <Text>
              Time left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
              {timer % 60}
            </Text>
          </Stack>
        </Stack>
      </ScrollView>
    </Box>
  );
}
const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cell: {
    textAlign: "center",
    justifySelf: "center",
    width: 48,
    height: 48,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
    borderRadius: 4,
    marginHorizontal: 12,
  },
  focusCell: {
    borderColor: colors.darkGray,
  },
});
