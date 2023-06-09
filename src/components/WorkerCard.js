import React from "react";
import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";
import { Ionicons, AntDesign, Octicons, FontAwesome } from "@expo/vector-icons";
import colors from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { hp, wp } from "../utils/screens";
export default function WorkerCard({ item }) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("WorkerFullDetails")}>
      <Box
        flex={1}
        bg={colors.light}
        mb="3"
        mx="1"
        p="2"
        borderRadius={"md"}
        alignItems="center"
        justifyContent="center"
      >
        <HStack w="100%">
          <Image
            source={item.img}
            alt={item.title}
            borderRadius="lg"
            w={wp("30%")}
            h={hp("18%")}
            resizeMode="cover"
          />
          <VStack ml="4">
            <Text fontWeight={"semibold"} fontSize="md">
              {item.title}
            </Text>
            <HStack py="1" alignItems={"center"}>
              <FontAwesome name="certificate" color={colors.certificate} />
              <Text pl="2" color={colors.certificate}>
                {item.type}
              </Text>
            </HStack>
            <HStack py="1" alignItems={"center"}>
              <Ionicons name="location-sharp" color={colors.darkGray} />
              <Text pl="2">{item.location}</Text>
            </HStack>
            <HStack py="1" alignItems={"center"}>
              <AntDesign name="like1" color={colors.darkGray} />
              <Text pl="2">{item.reviews}</Text>
            </HStack>
            <HStack py="1" alignItems={"center"}>
              <Octicons name="milestone" color={colors.darkGray} />
              <Text pl="2">{item.distance}</Text>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
}
