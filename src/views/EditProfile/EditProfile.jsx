import React from "react";
import {
  Box,
  CheckIcon,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Select,
  Spinner,
  Stack,
  Text,
  TextArea,
} from "native-base";
import { hp, wp } from "../../utils/screens";

import colors from "../../theme/colors";
import { FontAwesome } from "@expo/vector-icons";

import { Entypo } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import baseURL from "../../utils/baseURL";
import { Platform } from "react-native";
import SimpleHeader from "../../components/SimpleHeader";
import {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
  useUpdateProfileMutation,
} from "../../store/services/authApi";
import MultiSelectInput from "../Signup/Components/MultiSelectInput";
import BtnContainer from "../../components/BtnContainer";

export default function EditProfile({ navigation, route }) {
  const userInfo = useSelector((x) => x.auth.userInfo);

  const [selectedCategory, setSelectedCategory] = React.useState(
    userInfo.skill.name
  );

  const [selectedSpecialty, setSelectedSpecialty] = React.useState([]);

  const { data: CategoryData, error: CategoryError } =
    useGetAllCategoriesQuery();
  const { data: SubCategoryData, error: SubCategoryError } =
    useGetAllSubCategoriesQuery(selectedCategory);

  const [description, setDescription] = React.useState(
    userInfo?.profile?.contractor?.experience?.description
  );
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const handleEditProfile = async () => {
    try {
      let formData = new FormData();
      formData.append("email", userInfo?.name);
      formData.append("phone", userInfo?.phone);
      formData.append("address", userInfo?.address);
      formData.append("oldPhoto", userInfo?.photo);
      formData.append(
        "organization",
        userInfo?.profile?.contractor?.organization
      );
      formData.append(
        "businessType",
        userInfo?.profile?.contractor?.businessType
      );
      formData.append("skillType", JSON.stringify(selectedSpecialty));
      formData.append(
        "oldPhotoID",
        userInfo?.profile?.contractor?.legal?.photoID
      );
      formData.append(
        "oldTradeCertificate",
        userInfo?.profile?.contractor?.legal?.tradeCertificate
      );
      formData.append(
        "oldTrainingCertificate",
        userInfo?.profile?.contractor?.legal?.trainingCertificate
      );
      formData.append("experience", JSON.stringify(userInfo?.profile?.contractor?.experience));
      formData.append("skill", data?.skill);
      formData.append("deleteShowcase", []);
      //    formData.append("showcase", data?.showcase);
      userInfo.profile.contractor.showcase?.showcase?.map((x) =>
        formData.append("showcase", x)
      );

      const payload = {
        email: userInfo?.name,
        phone: userInfo?.phone,
        address: userInfo?.address,
        organization: userInfo?.profile?.contractor?.organization,
        businessType: userInfo?.profile?.contractor?.businessType,
        skill: selectedCategory,
        skillType: JSON.stringify(selectedSpecialty),
        experience: JSON.stringify(userInfo?.profile?.contractor?.experience),
        oldPhoto: userInfo?.photo,
        deleteShowcase: [],
        noChangeShowcase: userInfo?.profile?.contractor?.showcase,
        oldPhotoID: userInfo?.profile?.contractor?.legal?.photoID,
        oldTradeCertificate:
          userInfo?.profile?.contractor?.legal?.tradeCertificate,
        oldTrainingCertificate:
          userInfo?.profile?.contractor?.legal?.trainingCertificate,
      };
      const { data, error } = await updateProfile(formData);
      console.log("🚀 ~ file: EditProfile.jsx:107 ~ handleEditProfile ~ data, error :", data, error )
    } catch (error) {
        console.log("🚀 ~ file: EditProfile.jsx:108 ~ handleEditProfile ~ error:", error)
        
    }
  };
  return (
    <Box safeArea flex={1} bg={colors.light}>
      <SimpleHeader
        navigation={() => navigation.navigate("Profile")}
        title="Edit Profile"
      />
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
                <Text w={!Platform.isPad && "85%"} color={colors.darkGray}>
                  {userInfo?.address}{" "}
                </Text>
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
          <TextArea
            fontSize={"md"}
            w={"95%"}
            h={56}
            placeholder="Description"
            value={description}
            onChangeText={(e) => setDescription(e)}
          />
        </Box>

        <Stack direction={"column"} space="2" pl="4" mb="3">
          <Text fontWeight={"semibold"} color={colors.secondary} fontSize="md">
            Skills
          </Text>
          {CategoryData !== undefined ? (
            <Select
              selectedValue={selectedCategory}
              accessibilityLabel="Choose Service"
              placeholder={selectedCategory}
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              bg={colors.white}
              mt={1}
              h={hp("5%")}
              w={wp("90%")}
              onValueChange={(itemValue) => {
                setSelectedCategory(itemValue);
                setSelectedSpecialty([]);
              }}
            >
              {CategoryData.map((x) => {
                return <Select.Item key={x._id} label={x.name} value={x._id} />;
              })}
            </Select>
          ) : (
            <Spinner />
          )}
          <Text fontWeight={"semibold"} color={colors.secondary} fontSize="md">
            Skills Types
          </Text>
          {SubCategoryData !== undefined ? (
            <MultiSelectInput
              setSelectedSpecialty={setSelectedSpecialty}
              selectedSpecialty={selectedSpecialty}
              options={SubCategoryData}
            />
          ) : (
            <Spinner />
          )}
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
      <Pressable
        onPress={handleEditProfile}
        alignItems={"center"}
        bg={"#fff"}
        p="2"
      >
        <BtnContainer isLoading={isLoading} width={wp("92%")} title="Edit" />
      </Pressable>
    </Box>
  );
}
