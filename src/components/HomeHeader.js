import React from "react";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { hp, wp } from "../utils/screens";
import colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
export default function HomeHeader({ userData, isSignIn }) {
  const navigation = useNavigation();
  const city = useSelector((state) => state.address.address?.city);

  return (
    <Box w={wp("100%")} h={hp("8%")} bg={colors.primary} shadow="2">
      <HStack mt={"2"} alignItems="center">
        <IconButton
          onPress={() => navigation.openDrawer()}
          w={"10%"}
          h={hp("5%")}
          alignItems={"center"}
          mx={1}
          borderRadius={"lg"}
          variant="unstyled"
          icon={
            <Icon as={Ionicons} name="ios-menu-sharp" color={colors.white} />
          }
        />
        {isSignIn ? (
          <HStack>
            <Avatar size="md" source={{ uri: userData?.profilePhoto }} />
            <VStack pl="2">
              <Text color={colors.white} fontSize="md">
                Welcome {userData?.name}!
              </Text>
              <HStack alignItems={"center"}>
                <Entypo name="location-pin" size={15} color={colors.bgColors} />
                <Text color={colors.white}>{city}</Text>
              </HStack>
            </VStack>
          </HStack>
        ) : (
          <Text color={colors.white} fontSize="md">
            Welcome
          </Text>
        )}
      </HStack>
    </Box>
  );
}
