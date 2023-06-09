import React from "react";
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  ScrollView,
  Stack,
  Text,
  TextArea,
} from "native-base";

import colors from "../../theme/colors";
import { hp, wp } from "../../utils/screens";

import HeaderOnly from "../../components/HeaderOnly";

import Toast from "react-native-toast-message";

import TagInput from "./Components/TagInput";
export default function CreateProfile3({ navigation, route }) {
  const [workTitle, setWorkTitle] = React.useState("");

  const [description, setDescription] = React.useState("");
  const [workLink, setWorkLink] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const handleNext = async () => {
    //  navigation.navigate("CreateProfile4");
    if (workTitle === "" || description === "" ) {
      Toast.show({
        type: "error",
        text1: "Please enter all required fields.",
      });
    } else {
      try {
        const payload = {
          ...route.params.data,
          title: workTitle,
          description: description,
          link: workLink,
          experience: tags,
        };
        navigation.navigate("CreateProfile4", {
          data: payload,
        });
      } catch (error) {
        console.log({ error });
      }
    }
  };

  return (
    <Box flex="1" bg={colors.light}>
      <HeaderOnly title="Work with us" steps="4/6" />
      <Box flex="1">
        <Stack
          direction={"row"}
          mx="8"
          my="6"
          borderRadius={"full"}
          bg={colors.primaryLight}
          h="5"
        >
          <Box w="1/6" h="100%" borderRadius={"full"} />
          <Box w="1/6" h="100%" borderRadius={"full"} />
          <Box w="1/6" h="100%" borderRadius={"full"} />
          <Box bg={colors.primary} w="1/6" h="100%" borderRadius={"full"} />
        </Stack>
        <ScrollView flex="1">
          <Box flex={1}>
            <Box p="2" pb="4">
              <Text
                textAlign={"center"}
                fontSize={"lg"}
                color={colors.primary}
                fontWeight={"semibold"}
              >
                This is your opportunity to showcase your previous works. Add
                more fields if necessary.
              </Text>
            </Box>
            <Stack
              alignItems="center"
              space="4"
              justifyContent={"center"}
              flex={"1"}
              pb={"6"}
            >
              <Stack space="1">
                <Text
                  fontSize={"md"}
                  color={colors.primary}
                  fontWeight={"semibold"}
                >
                  Past work experiences
                </Text>
                <Input
                  borderRadius="lg"
                  bg={colors.white}
                  h={hp("5%")}
                  w={wp("90%")}
                  autoCapitalize="none"
                  onChangeText={(e) => setWorkTitle(e)}
                  value={workTitle}
                  placeholder="Enter your work title"
                />
                <Text>To add multiple titles, separate texts with “;”</Text>
              </Stack>
              <Stack space="1">
                <Text
                  fontSize={"md"}
                  color={colors.primary}
                  fontWeight={"semibold"}
                >
                  Job description
                </Text>
                <TextArea
                  bg={colors.white}
                  borderRadius="lg"
                  h={20}
                  placeholder="Enter job description"
                  value={description}
                  onChangeText={(e) => setDescription(e)}
                />
                <Text>Eg: Business contact</Text>
              </Stack>
              <TagInput setTags={setTags} tags={tags} />
              <Stack space="1">
                <Text
                  fontSize={"md"}
                  color={colors.primary}
                  fontWeight={"semibold"}
                >
                  Any external link showing your work
                </Text>
                <Input
                  bg={colors.white}
                  h={hp("5%")}
                  w={wp("90%")}
                  autoCapitalize="none"
                  placeholder="Your URL goes here"
                  value={workLink}
                  onChangeText={(e) => setWorkLink(e)}
                />
              </Stack>

              {/* <Button
                variant={"link"}
                _text={{
                  color: colors.secondary,
                }}
              >
                Skip now and complete later
              </Button> */}
            </Stack>
          </Box>
          <Stack
            w="100%"
            pr="4"
            pb="2"
            direction={"row"}
            justifyContent={"flex-end"}
            space={4}
          >
            <Button
              onPress={() => navigation.goBack()}
              bg={colors.white}
              w="20%"
              variant="outline"
            >
              Back
            </Button>
            <Button onPress={handleNext} w="20%">
              Next
            </Button>
          </Stack>
        </ScrollView>
      </Box>
    </Box>
  );
}

// <Stack direction={"row"} space="3">
// <Button
//   onPress={async () =>
//     uploadPhoto(
//       setWorkExperiencePhoto1,
//       setWorkExperiencePhotoURL1
//     )
//   }
//   bg={colors.primaryLight}
//   borderColor={colors.primary}
//   variant="outline"
//   w={wp("15%")}
//   h={hp("8%")}
// >
//   {workExperiencePhoto1 ? (
//     <Image
//       source={{ uri: workExperiencePhoto1 }}
//       alt="workExperiencePhoto1"
//       size="xs"
//     />
//   ) : (
//     <FontAwesome
//       name="image"
//       size={24}
//       color={colors.darkGray}
//     />
//   )}
// </Button>
// <Button
//   onPress={async () =>
//     uploadPhoto(
//       setWorkExperiencePhoto2,
//       setWorkExperiencePhotoURL2
//     )
//   }
//   bg={colors.primaryLight}
//   borderColor={colors.primary}
//   variant="outline"
//   w={wp("15%")}
//   h={hp("8%")}
// >
//   {workExperiencePhoto2 ? (
//     <Image
//       source={{ uri: workExperiencePhoto2 }}
//       alt="workExperiencePhoto1"
//       size="xs"
//     />
//   ) : (
//     <FontAwesome
//       name="image"
//       size={24}
//       color={colors.darkGray}
//     />
//   )}
// </Button>
// <Button
//   onPress={async () =>
//     uploadPhoto(
//       setWorkExperiencePhoto3,
//       setWorkExperiencePhotoURL3
//     )
//   }
//   bg={colors.primaryLight}
//   borderColor={colors.primary}
//   variant="outline"
//   w={wp("15%")}
//   h={hp("8%")}
// >
//   {workExperiencePhoto3 ? (
//     <Image
//       source={{ uri: workExperiencePhoto3 }}
//       alt="workExperiencePhoto1"
//       size="xs"
//     />
//   ) : (
//     <FontAwesome
//       name="image"
//       size={24}
//       color={colors.darkGray}
//     />
//   )}
// </Button>
// <Button
//   onPress={async () =>
//     uploadPhoto(
//       setWorkExperiencePhoto4,
//       setWorkExperiencePhotoURL4
//     )
//   }
//   bg={colors.primaryLight}
//   borderColor={colors.primary}
//   variant="outline"
//   w={wp("15%")}
//   h={hp("8%")}
// >
//   {workExperiencePhoto4 ? (
//     <Image
//       source={{ uri: workExperiencePhoto4 }}
//       alt="workExperiencePhoto1"
//       size="xs"
//     />
//   ) : (
//     <FontAwesome
//       name="image"
//       size={24}
//       color={colors.darkGray}
//     />
//   )}
// </Button>
// <Button
//   onPress={async () =>
//     uploadPhoto(
//       setWorkExperiencePhoto5,
//       setWorkExperiencePhotoURL5
//     )
//   }
//   bg={colors.primaryLight}
//   borderColor={colors.primary}
//   variant="outline"
//   w={wp("15%")}
//   h={hp("8%")}
// >
//   {workExperiencePhoto5 ? (
//     <Image
//       source={{ uri: workExperiencePhoto5 }}
//       alt="workExperiencePhoto5"
//       size="xs"
//     />
//   ) : (
//     <FontAwesome
//       name="image"
//       size={24}
//       color={colors.darkGray}
//     />
//   )}
// </Button>
// </Stack>
