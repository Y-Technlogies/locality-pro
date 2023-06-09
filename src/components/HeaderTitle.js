import React from "react";
import { Box, Center, HStack, Icon, IconButton, Text } from "native-base";
import { hp, wp } from "../utils/screens";
import colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
export default function HeaderTitle({ title }) {
  const navigation = useNavigation();
  return (
    <Box
      w={wp("100%")}
      // h={Platform.isPad ? hp("12%") : hp("8%")}
      p="2"
      justifyContent={"center"}
      paddingTop={Platform.OS === "ios" ? "6" : 0}
      bg={{
        linearGradient: {
          colors: ["#0091A6", "#0F617E"],
          start: [0, 0],
          end: [1, 0],
        },
      }}
    >
      <HStack mt={"2"} alignItems="center">
        <IconButton
          onPress={() => navigation.openDrawer()}
          w={"10%"}
          alignItems={"center"}
          mx={1}
          borderRadius={"lg"}
          variant="unstyled"
          icon={
            <Icon as={Ionicons} name="ios-menu-sharp" color={colors.white} />
          }
        />
        <Text bold fontSize="md" color={colors.white}>
          {title}
        </Text>
      </HStack>
    </Box>
  );
}
