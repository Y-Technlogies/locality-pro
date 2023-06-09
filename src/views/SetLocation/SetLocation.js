import React from "react";
import { Box, Button, Center, Image, Stack, Text } from "native-base";
import colors from "../../theme/colors";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { setAddress } from "../../store/slices/addressSlice";
export default function SetLocation({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const setLocation = async () => {
    try {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        const payload = {
          location: coords,
          address: response[0],
        };
        dispatch(setAddress(payload));
        setIsLoading(false);
        navigation.navigate("SetAddress");
      } else {
        Alert.alert(
          "Permission to access location was denied.you'd still be suggested services and service providers available, but the search results may not be related closely to you."
        );
        setIsLoading(false);
      }
    } catch (e) {

      setIsLoading(false);
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
        <Button
          variant={"link"}
          onPress={() =>    navigation.navigate("App")}
        >
          Skip
        </Button>
      </Center>
    </Box>
  );
}
