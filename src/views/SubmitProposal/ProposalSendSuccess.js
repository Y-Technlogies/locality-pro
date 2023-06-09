import React from "react";
import { Box, Button, Center, Image, Text } from "native-base";
import SimpleHeader from "../../components/SimpleHeader";
import colors from "../../theme/colors";

export default function ProposalSendSuccess({ navigation }) {
  
  return (
    <Box flex={1} safeArea>
      <Box flex={1} safeArea>
        <SimpleHeader title="Proposal send success" />
        <Center p="3" flex="1">
          <Text fontSize={"2xl"} fontWeight="semibold" color={colors.primary}>
            Success!
          </Text>
          <Text
            textAlign={"center"}
            color={colors.darkGray}
            fontSize={"lg"}
            fontWeight="semibold"
          >
            Your proposal has been send successfully!
          </Text>
          <Image
            source={require("./../../../assets/undraw_Order_confirmed_re_g0if-rbg.png")}
            size="xl"
            resizeMode="contain"
            alt="success"
          />

          <Button
            onPress={() => navigation.navigate("AppHome")}
            variant="link"
            _text={{
              color: colors.primary,
              fontSize: "lg",
            }}
          >
            Press here to go back home
          </Button>
        </Center>
      </Box>
    </Box>
  );
}
