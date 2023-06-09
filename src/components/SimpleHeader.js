import React from "react";
import {
  Box,

  HStack,

  IconButton,
  Image,

  Pressable,

  Text,
} from "native-base";
import { hp, wp } from "../utils/screens";

export default function SimpleHeader({ title, navigation }) {

  return (
    <Pressable onPress={navigation}>
      <Box
        w={wp("100%")}
        h={hp("7%")}
        //   bg={{
        //   linearGradient: {
        //     colors: ["#0091A6", "#0F617E"],
        //     start: [0, 0],
        //     end: [1, 0],
        //   },
        // }}

        justifyContent={"center"}
      >
        <HStack mt={"2"} alignItems={"center"}>
          <IconButton
            m="2"
            onPress={navigation}
            alignItems={"center"}
            borderRadius={"lg"}
            variant="unstyled"
            // bg={colors.secondary}
            icon={
              <Image
                source={require("./../../assets/Back.png")}
                size="xs"
                resizeMode="contain"
                alt="back btn"
              />
            }
          />

          <Text bold fontSize="md">
            {title}
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );
}
