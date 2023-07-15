import React from "react";
import { Box, Button, Center, Image, Stack, Text } from "native-base";
import colors from "../../theme/colors";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { setAddress } from "../../store/slices/addressSlice";
import { useUpdateAddressMutation } from "../../store/services/authApi";
export default function SetLocation({ navigation }) {
  const dispatch = useDispatch();
  const [updateAddress, { isLoading }] = useUpdateAddressMutation();
  const setLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;

        const payload = {
          latitude,
          longitude,
        };
        console.log("🚀 ~ file: SetLocation.js:21 ~ setLocation ~ payload:", payload)
        const { data, error } =await updateAddress(payload);
        console.log("🚀 ~ file: SetLocation.js:25 ~ setLocation ~  data, error:",  data, error)
        dispatch(setAddress({ location: coords }));

        navigation.navigate("App");
      } else {
        Alert.alert(
          "Permission to access location was denied.you'd still be suggested services and service providers available, but the search results may not be related closely to you."
        );
      }
    } catch (e) {
    console.log("🚀 ~ file: SetLocation.js:36 ~ setLocation ~ e:", e)
    }
  };
  return (
    <Box flex={1} safeArea>
      <Center flex={"1"}>
        <Stack space={6} w="90%" alignItems="center">
          <Image
            source={require("./../../../assets/location.png")}
            size="2xl"
            resizeMode="contain"
            alt="icon"
          />
          <Text textAlign={"center"} fontSize={"md"}>
            Locality need to access your current location for better
            performance. Press Allow.
          </Text>
        </Stack>
        <Button
          isLoading={isLoading}
          mt="6"
          onPress={setLocation}
          w={{
            base: "75%",
            md: "25%",
          }}
          variant="unstyled"
          bg={colors.primary}
          _text={{ color: colors.white }}
        >
          Allow
        </Button>
        <Button variant={"link"} onPress={() => navigation.navigate("App")}>
          Skip
        </Button>
      </Center>
    </Box>
  );
}
