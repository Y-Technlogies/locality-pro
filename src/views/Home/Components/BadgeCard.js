import React from "react";
import { Center, Pressable, Text } from "native-base";
import colors from "../../../theme/colors";

export default function BadgeCard({
  setSelectedService,
  selectedService,
  item,
}) {
  console.log({item})
  return (
    <Pressable mr="2" onPress={() => setSelectedService(item)}>
      <Center
        bg={selectedService === item ? colors.primary : colors.primaryLight}
        p="2"
        borderRadius={"xl"}
      >
        <Text color={selectedService === item ? colors.white : colors.darkGray}>
          {item}
        </Text>
      </Center>
    </Pressable>
  );
}
