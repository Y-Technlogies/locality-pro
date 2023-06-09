import {
  Box,
  HStack,
  IconButton,
  Image,
  Text,
  Stack,
  Pressable,
  Button,
} from "native-base";
import React from "react";
import colors from "../../theme/colors";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Toast from "react-native-toast-message";
import { hp, wp } from "../../utils/screens";
import { StyleSheet } from "react-native";
import BtnContainer from "../../components/BtnContainer";
import { useVerifyOTPMutation } from "../../store/services/authApi";
export default function VerifyOTP({ route, navigation }) {
  const [timer, setTimer] = React.useState(60); // 1 minutes in seconds

  const phone = route?.params?.phone;
  const email = route?.params?.email;
  const [verificationCode, setVerificationCode] = React.useState();
  const [value, setValue] = React.useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
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
    try {
      const payload = {
        email,
        phone,
        typedOtp: verificationCode,
      };

      const { data } = await verifyOTP(payload);

      if (data?.message === "OTP Verified") {
        Toast.show({
          type: "success",
          text1: data?.message,
        });
        navigation.navigate("ProfileSubmit");
      } else {
        Toast.show({
          type: "error",
          text1: "Try Again.",
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
      <Stack space="3" p="3">
        <Text fontSize={"lg"} fontWeight={"semibold"} color={colors.primary}>
          Phone Number Verification
        </Text>
        <HStack alignItems={"center"}>
          <Text fontSize={"md"} color={colors.darkGray}>
            Enter OTP Code sent to{" "}
          </Text>
          <Text bold fontSize={"md"}>
            {phone}
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
          {
            <Pressable
              disabled={timer === 0}
              w={wp("80%")}
              onPress={handleSubmit}
            >
              <BtnContainer
                disabled={timer === 0}
                isLoading={isLoading}
                title="Verify"
                width={wp("92%")}
              />
            </Pressable>
          }
          {timer === 0 && (
            <Button
              variant="link"
              onPress={() =>
                navigation.navigate("SendOTP", {
                  phone,
                  email,
                })
              }
            >
              <Text fontSize={"md"} color={colors.primary} bold>
                Try again
              </Text>
            </Button>
          )}
        </Stack>
        <Text>
          Time left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
          {timer % 60}
        </Text>
      </Stack>
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
