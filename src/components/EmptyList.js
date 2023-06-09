import React from "react";
import { Center, Image, Text } from "native-base";
import colors from "../theme/colors";

export default function EmptyList() {
  return (
    <Center flex="1">
      <Image
        source={require("./../../assets/empty.png")}
        size={"lg"}
        alt="empty"
      />
      <Text mt="4" color={colors.primary} fontWeight="semibold" fontSize="lg">
        Your list is empty.
      </Text>
    </Center>
  );
}
