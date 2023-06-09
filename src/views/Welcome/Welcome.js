import { Box, Button, Divider, Image, Stack, Text } from "native-base";
import React from "react";
import colors from "../../theme/colors";
import { wp } from "../../utils/screens";

const Welcome = ({ navigation }) => {
  return (
    <Box flex="1">
      <Stack mt="12" space="5" justifyContent={"center"} alignItems="center">
        <Image
          source={require("./../../../assets/icons.png")}
          size="2xl"
          alt="logo"
        />
        <Text color={colors.darkGray} fontSize={"xl"} fontWeight="bold">
          Welcome to the Locality!
        </Text>
        <Button 
        onPress={()=>navigation.navigate("Signin")}
        bg={colors.primary} w={wp("80%")}>
          <Text textAlign={"center"} color={colors.white}>
            Sign in
          </Text>
        </Button>
        <Stack direction={"row"} space="2" alignItems={"center"}>
          <Divider />
          <Text fontSize={"md"}>OR</Text>
          <Divider />
        </Stack>
        <Button
           onPress={()=>navigation.navigate("Signup")}
        bg={colors.primary} w={wp("80%")}>
          <Text textAlign={"center"} color={colors.white}>
            Work with us
          </Text>
        </Button>
      </Stack>
    </Box>
  );
};

export default Welcome;
