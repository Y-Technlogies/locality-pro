import React from "react";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Spinner,
  Stack,
  Text,
  VStack,
} from "native-base";
import { hp, wp } from "../utils/screens";
import colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Platform } from "react-native";
import { useUserInfoQuery } from "../store/services/authApi";
import baseURL from "../utils/baseURL";

export default function Header() {
  const navigation = useNavigation();

  const { isLoading, data } = useUserInfoQuery();
  const auth = useSelector((x) => x.auth);

  return (
    <Box
      w={wp("100%")}
      h={Platform.isPad ? hp("12%") : hp("14%")}
      p="2"
      paddingTop={Platform.OS === "ios" ? "6" : 0}
      borderBottomLeftRadius="3xl"
      borderBottomRightRadius="3xl"
      bg={{
        linearGradient: {
          colors: ["#0091A6", "#0F617E"],
          start: [0, 0],
          end: [1, 0],
        },
      }}
    >
      <HStack mt={"4"} alignItems={"center"} justifyContent="space-between">
        <HStack alignItems={"center"} justifyContent={"center"} pt="3">
          <IconButton
            onPress={() => navigation.openDrawer()}
            w={"10%"}
            alignItems={"center"}
            mx={1}
            borderRadius={"lg"}
            variant="unstyled"
            icon={
              <Icon
                as={Ionicons}
                size={"xl"}
                name="ios-menu-sharp"
                color={colors.white}
              />
            }
          />
          {auth?.isAuthenticated && data !== undefined ? (
            isLoading ? (
              <Spinner />
            ) : (
              <HStack alignItems={"center"}>
                <Avatar
                  bg="cyan.500"
                  size="md"
                  source={{
                    uri: baseURL + "/contractor_photos/" + data[0]?.photo,
                  }}
                />
                <VStack ml="2">
                  <Text color={colors.white} bold fontSize="md">
                    {data[0].name}
                  </Text>
                  <Text color={colors.white} fontWeight="semibold">
                    {data[0].email}
                  </Text>
                </VStack>
              </HStack>
            )
          ) : (
            <Text ml="2" color={colors.white} fontSize="md">
              Welcome user!
            </Text>
          )}
        </HStack>
      </HStack>
    </Box>
  );
}
