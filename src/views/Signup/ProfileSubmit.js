import React from "react";
import { Box, Button, Center, Image, Text } from "native-base";
import colors from "../../theme/colors";

export default function ProfileSubmit({ navigation }) {
  return (
    <Box flex={1} safeArea bg={colors.white}>
      <Center flex="1">
        <Image
          alignSelf={"center"}
          source={require("./../../../assets/submit1.png")}
          size="2xl"
          alt="submit"
        />
        <Box p="2">
          <Text textAlign={"center"} fontWeight={"semibold"} fontSize="lg">
            Your profile has been submitted for review. One of our admin will
            screen your files uploaded, you can’t change once you’ve submitted
            the uploads. The screening may usually take up to 24-48 hours.Once
            our review is complete, we’ll email you with login details. Make
            sure your provided email is correct and also you check it regularly
          </Text>
        </Box>
        <Button
          onPress={() => navigation.navigate("App")}
          mt="6"
          variant={"link"}
          _text={{
            color: colors.primary,
            fontWeight: "bold",
          }}
        >
          Go back to Home
        </Button>
      </Center>
    </Box>
  );
}
