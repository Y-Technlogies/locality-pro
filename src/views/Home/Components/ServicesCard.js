import React from "react";
import { Box, Image, Pressable, Text } from "native-base";

import color from "../../../theme/colorIndex";
import { useNavigation } from "@react-navigation/native";

export default function ServicesCard({ item, index }) {
  const navigation = useNavigation()
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("SubCategoryWiseProvider", {
          title: item.title,
        })
      }
    >
      <Box flex={1} safeArea p="2">
        <Box bg={color[index]} p="2" borderRadius={"xl"}>
          <Image source={item.img} alt={item.title} size="sm" />
        </Box>
        <Text fontWeight={"semibold"} textAlign={"center"}>
          {item.title}
        </Text>
      </Box>
    </Pressable>
  );
}
