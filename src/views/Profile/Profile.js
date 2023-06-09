import React from "react";
import {
  Box,
  Center,
  FlatList,
  HStack,
  Icon,
  Image,
  ScrollView,
  Stack,
  Text,
} from "native-base";

import colors from "../../theme/colors";
import { FontAwesome } from "@expo/vector-icons";
import { hp } from "../../utils/screens";

import { Entypo } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import baseURL from "../../utils/baseURL";

import HeaderTitleOption from "../../components/HeaderTitleOption";
export default function Profile({ navigation, route }) {
  const userInfo = useSelector((x) => x.auth.userInfo);

  return (
    <Box flex={1} bg={colors.light}>
      <HeaderTitleOption title="Profile" />
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      ></Stack>
      <ScrollView>
        <Box borderRadius={"md"} p="2" m="4" bg={"#fff"}>
          <HStack>
            <Image
              alt={userInfo?.photo}
              borderRadius={"md"}
              bg="cyan.500"
              size="md"
              source={{
                uri: baseURL + "/contractor_photos/" + userInfo.photo,
              }}
            />
            <Stack pl="2">
              <Text fontSize="md" mt="2" fontWeight="semibold">
                {userInfo?.profile?.contractor?.organization}
              </Text>

              {/* <Text fontSize="md" fontWeight="semibold">
                {workTitle}
              </Text> */}
              <Stack alignItems={"center"} space={"1"} direction="row">
                <Entypo name="location-pin" size={16} color="black" />
                <Text color={colors.darkGray}>{userInfo?.address} </Text>
              </Stack>
              <Stack alignItems={"center"} space={"1"} direction="row">
                <FontAwesome
                  name="certificate"
                  color={
                    userInfo?.isApprove ? colors.certificate : colors.black
                  }
                />
                <Text
                  pl="2"
                  color={
                    userInfo?.isApprove ? colors.certificate : colors.black
                  }
                >
                  {userInfo?.isApprove ? "Certified Member " : "Not Certified"}
                </Text>
              </Stack>
              <Stack direction={"row"} space="2" mt="2"></Stack>
            </Stack>
          </HStack>

          <Text color={"#0091A6"} fontSize="md">
            Description
          </Text>

          <Text pt="2" color={colors.darkGray}>
            {userInfo?.profile.contractor.experience.description}
          </Text>
        </Box>

        <Stack direction={"column"} space="2" pl="4" mb="3">
          <Text fontWeight={"semibold"} color={colors.secondary} fontSize="md">
            Skills
          </Text>
          <Text bg={colors.white} p="2" borderRadius={"md"} w="96%">
            {userInfo.profile.contractor.businessType}
          </Text>
          <Text fontWeight={"semibold"} color={colors.secondary} fontSize="md">
            Skills Types
          </Text>
          <FlatList
            w={"96%"}
            bg={colors.white}
            p="2"
            borderRadius={"md"}
            flex="1"
            horizontal
            showsHorizontalScrollIndicator={false}
            data={userInfo?.skillType}
            renderItem={({ item }) => {
              return (
                <Center
                  bg={"#0091a614"}
                  borderRadius="md"
                  _text={{
                    color: "#0091A6",
                  }}
                  colorScheme="primary"
                  mr="1"
                  px="2"
                  py="1"
                  h={hp("4%")}
                  variant="subtle"
                >
                  {item?.name}
                </Center>
              );
            }}
            keyExtractor={(index) => index.toString()}
          />
          <Text fontWeight={"semibold"} color={colors.secondary} fontSize="md">
            Business Type
          </Text>
          <Text bg={colors.white} p="2" borderRadius={"md"} w="96%">
            {userInfo.profile.contractor.businessType}
          </Text>
          <Text fontWeight={"semibold"} color={colors.secondary} fontSize="md">
            Experiences
          </Text>
          <Box bg={colors.white} p="2" borderRadius={"md"} w="96%">
            <Text
              fontWeight={"semibold"}
              color={colors.secondary}
              fontSize="md"
            >
              Job title
            </Text>
            <Text
              my="1"
              bg={colors.light}
              p="2"
              borderRadius={"md"}
              fontSize="md"
            >
              {userInfo.profile.contractor.experience.title}
            </Text>
            <Text
              fontWeight={"semibold"}
              color={colors.secondary}
              fontSize="md"
            >
              Job description
            </Text>
            <Text>{userInfo.profile.contractor.experience.description}</Text>
          </Box>
        </Stack>
      </ScrollView>
    </Box>
  );
}
