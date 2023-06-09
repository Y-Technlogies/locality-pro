import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Icon,
  IconButton,
  Input,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import colors from "../../theme/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setOnlyAddress } from "../../store/slices/addressSlice";

import Toast from "react-native-toast-message";
export default function SetAddress({ navigation }) {
  const address = useSelector((state) => state.address.address);
  const dispatch = useDispatch();
  const [houseNumber, setHouseNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState(address?.street);
  const [city, setCity] = useState(address?.city);
  const [providence, setProvidence] = useState("");
  const [postalCode, setPostalCode] = useState(address?.postalCode);
  const handleContinue = () => {
    if (
      houseNumber === "" ||
      streetAddress === "" ||
      city === "" ||
      providence === "" ||
      postalCode === ""
    ) {
      Toast.show({
        type: "error",
        text1: "Please enter all input values.",
      });
    } else {
      const payload = {
        houseNumber,
        street: streetAddress,
        city,
        providence,
        postalCode,
      };
      dispatch(setOnlyAddress(payload));
      navigation.navigate("App");
    }
  };
  return (
    <Box flex={1} safeArea>
      <IconButton
        onPress={() => navigation.goBack()}
        w={"10%"}
        alignItems={"center"}
        m={2}
        borderRadius={"lg"}
        variant="unstyled"
        bg={colors.primary}
        icon={
          <Icon
            pl="2"
            as={FontAwesome}
            name="angle-left"
            color={colors.white}
          />
        }
      />
      <ScrollView flex={"1"}>
        <Center flex={"1"}>
          <Stack space={4} w="100%" alignItems="center">
            <Text textAlign={"center"} fontSize={"xl"} bold>
              Add your Address
            </Text>
            <Stack space={2}>
              <Text>House/Apartment number</Text>
              <Input
                borderRadius="lg"
                bg={colors.white}
                onChangeText={(e) => setHouseNumber(e)}
                value={houseNumber}
                w={{
                  base: "80%",
                  md: "25%",
                }}
                placeholder="House/Apartment number"
              />
              <Text>Street Address</Text>
              <Input
                borderRadius="lg"
                bg={colors.white}
                onChangeText={(e) => setStreetAddress(e)}
                value={streetAddress}
                w={{
                  base: "80%",
                  md: "25%",
                }}
                placeholder="Street Address"
              />
              <Text>City</Text>
              <Input
                borderRadius="lg"
                bg={colors.white}
                onChangeText={(e) => setCity(e)}
                value={city}
                w={{
                  base: "80%",
                  md: "25%",
                }}
                placeholder="City"
              />
              <Text>Province</Text>
              <Input
                borderRadius="lg"
                bg={colors.white}
                onChangeText={(e) => setProvidence(e)}
                value={providence}
                w={{
                  base: "80%",
                  md: "25%",
                }}
                placeholder="Province"
              />
              <Text>Postal Code</Text>
              <Input
                borderRadius="lg"
                bg={colors.white}
                onChangeText={(e) => setPostalCode(e)}
                value={postalCode}
                w={{
                  base: "80%",
                  md: "25%",
                }}
                placeholder="Postal Code"
              />
            </Stack>
            <Button
              onPress={handleContinue}
              w={{
                base: "80%",
                md: "25%",
              }}
              variant="unstyled"
              bg={colors.primary}
              _text={{ color: colors.white }}
            >
              Continue
            </Button>
          </Stack>
        </Center>
      </ScrollView>
    </Box>
  );
}
