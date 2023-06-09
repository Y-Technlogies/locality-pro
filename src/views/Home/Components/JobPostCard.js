import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  FlatList,
  HStack,
  Pressable,
  Stack,
  Text,
} from "native-base";

import colors from "../../../theme/colors";

import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment/moment";
import baseURL from "../../../utils/baseURL";

export default function JobPostCard({ item, navigation }) {


  return (
    <Pressable onPress={() => navigation.navigate("PostDetails", { item })}>
      <Box
        shadow="1"
        alignSelf={"center"}
        mx="2"
        bg={colors.white}
        p="3"
        my="1"
        borderRadius={"lg"}
        w="96%"
      >
        <HStack>
          <Avatar
            source={{ uri: baseURL + "/user_photos/" + item?.by?.photo }}
            alt="photo"
          />
          <Stack ml="2" space="1">
            <Text fontSize={"md"} color={colors.secondary}>
              {item?.by?.name}
            </Text>
            <Stack space="2" direction={"row"} alignItems={"center"}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={18}
                color={colors.darkGray}
              />
              <Text>{moment(item?.createdAt).format("ll")}</Text>
            </Stack>
          </Stack>
        </HStack>

        <HStack justifyContent={"space-between"}>
          <Text
            fontWeight={"semibold"}
            color={colors.secondary}
            fontSize="lg"
            my="1"
          >
            {item?.title}
          </Text>
        </HStack>
        <Stack space={"1"}>
          <HStack>
            <Text fontSize={"md"}>Skill: </Text>
            <Badge colorScheme={"success"}>{item?.category?.name}</Badge>
          </HStack>
          <HStack>
            <Text fontSize={"md"}>Skills Types:</Text>
            <Badge colorScheme={"blueGray"}>{item?.subCategory?.name}</Badge>
          </HStack>
          <Text fontSize={"md"}>
            Budget: ${item?.min_budget} -{item?.max_budget}{" "}
            {item?.type !== undefined && `(${item.type})`}
          </Text>
        </Stack>
        <Stack space="2" mb="2">
          <Text fontSize={"md"} color={colors.secondary}>
            Description
          </Text>
          <Box>
            <Text color={colors.darkGray} fontSize={"sm"}>
              {item?.description}
            </Text>
          </Box>
        </Stack>
        <FlatList
          horizontal
          data={item?.hashtags}
          renderItem={({ item }) => (
            <Badge mr="1" colorScheme="success">
              {item}
            </Badge>
          )}
          keyExtractor={(index) => index}
        />
      </Box>
    </Pressable>
  );
}
