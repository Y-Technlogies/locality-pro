import React from "react";
import {
  Box,

  Pressable,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import colors from "../../theme/colors";
import SimpleHeader from "../../components/SimpleHeader";
import { wp } from "../../utils/screens";
import ImageSlider from "../../components/ImageSlider";
import BtnContainer from "../../components/BtnContainer";

import { useSelector } from "react-redux";
export default function PostDetails({ route, navigation }) {
  const {
    _id,
    title,
    category,
    description,
    level,

    min_budget,
    photos,
    subCategory,
    type,
    by,
  } = route?.params?.item;
  // console.log(
  // "🚀 ~ file: PostDetails.js:22 ~ PostDetails ~ route?.params?.item:",
  // route?.params?.item
  // );
  const handleNavigation = () => {
    navigation.goBack();
  };

  const isAuthenticated = useSelector((x) => x.auth.isAuthenticated);
  // console.log(
  // "🚀 ~ file: PostDetails.js:41 ~ PostDetails ~ isAuthenticated:",
  // isAuthenticated
  // );
  return (
    <Box safeArea bg={colors.light} flex="1">
      <SimpleHeader navigation={handleNavigation} title={"Post Details"} />
      <ScrollView>
        <ImageSlider photos={photos} />
        <Stack space={"2"} p="3">
          <Stack space={"2"} p="3" bg={colors.white} borderRadius={"md"}>
            {/* <HStack>
              <Text>{by.email}</Text>
            </HStack> */}
            <Text fontSize={"lg"} bold color={colors.primary}>
              Job Title
            </Text>
            <Text fontSize={"md"}>{title}</Text>

            <Text fontSize={"lg"} bold color={colors.primary}>
              Description
            </Text>

            <Text fontSize={"md"} color={colors.darkGray}>{description}</Text>
          </Stack>
          <Stack space={"2"} pl="3">
            <Text fontSize={"lg"} bold color={colors.primary}>
              Looking for
            </Text>
            <Box bg={colors.white} py="2" pl="2" borderRadius={"md"}>
              <Text fontSize={"md"}>{type}</Text>
            </Box>
          </Stack>
          <Stack space={"2"} pl="3">
            <Text fontSize={"lg"} bold color={colors.primary}>
              Category
            </Text>
            <Box bg={colors.white} py="2" pl="2" borderRadius={"md"}>
              <Text fontSize={"md"}>{category?.name}</Text>
            </Box>
          </Stack>
          <Stack space={"2"} pl="3">
            <Text fontSize={"lg"} bold color={colors.primary}>
              Specialty
            </Text>
            <Box bg={colors.white} py="2" pl="2" borderRadius={"md"}>
              <Text fontSize={"md"}>{subCategory?.name}</Text>
            </Box>
          </Stack>
          <Stack space={"2"} pl="3">
            <Text fontSize={"lg"} bold color={colors.primary}>
              Experience Level
            </Text>
            <Box bg={colors.white} py="2" pl="2" borderRadius={"md"}>
              <Text fontSize={"md"}>{level}</Text>
            </Box>
          </Stack>

          <Stack space={"2"} pl="3" pb="3">
            <Text fontSize={"lg"} bold color={colors.primary}>
              Budget
            </Text>
            <Box bg={colors.white} py="2" pl="2" borderRadius={"md"}>
              <Text fontSize={"md"}>
                {" "}
                ${min_budget} - ${min_budget}
              </Text>
            </Box>
          </Stack>
          <Pressable
            pl="2"
            onPress={() =>
              isAuthenticated
                ? navigation.navigate("SendProposal", {
                    item: route?.params?.item,
                  })
                : navigation.navigate("Signin")
            }
          >
            <BtnContainer title="Send a proposal" width={wp("92%")} />
          </Pressable>
        </Stack>
      </ScrollView>
    </Box>
  );
}
