import React from "react";
import { Box, HStack, Icon, IconButton, Text } from "native-base";
import { hp, wp } from "../utils/screens";
import colors from "../theme/colors";

import { Platform } from "react-native";
export default function HeaderOnly({ title, steps }) {
  return (
    <Box
      w={wp("100%")}
      // h={Platform.isPad ? hp("6%") : hp("8%")}
      p="2"
      paddingTop={Platform.OS === "ios" ? "12" : 0}
      justifyContent={Platform.OS === "android" && "center"}
      // bg={{
      //   linearGradient: {
      //     colors: ["#0091A6", "#0F617E"],
      //     start: [0, 0],
      //     end: [1, 0],
      //   },
      // }}
      // shadow="2"
    >
      <HStack alignItems="center" justifyContent={"space-between"}>
        <Text bold fontSize="lg" color={colors.darkGray}>
          {title}
        </Text>
        <Box bg={colors.primary} px="4" p="2" borderRadius={"full"}>
          <Text color={colors.white}>{steps}</Text>
        </Box>
      </HStack>
    </Box>
  );
}
