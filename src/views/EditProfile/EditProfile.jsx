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
} from "native-base";
import { hp, wp } from "../../utils/screens";
import Toast from "react-native-toast-message";
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
import BtnContainer from "../../components/BtnContainer";
import MultiSelectInput from "./Components/MultiSelect";

export default function EditProfile({ navigation, route }) {
  const userInfo = useSelector((x) => x.auth.userInfo);

  const [selectedCategory, setSelectedCategory] = React.useState(
    userInfo?.skill?.name
  );

  const [selectedSpecialty, setSelectedSpecialty] = React.useState([]);

  const { data: CategoryData, error: CategoryError } =
    useGetAllCategoriesQuery();
  const { data: SubCategoryData, error: SubCategoryError } =
    useGetAllSubCategoriesQuery(selectedCategory);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const handleEditProfile = async () => {
    try {
      const payload = {
        address: userInfo?.address,

        businessType: userInfo?.profile?.contractor?.businessType,
        skill: selectedCategory,
        skillType: selectedSpecialty,
      };
      console.log("🚀 ~ file: EditProfile.jsx:58 ~ handleEditProfile ~ payload:", payload)
      const { data, error } = await updateProfile(payload);
      if (error) {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      } else {
        Toast.show({
          type: "success",
          text1: data.message,
        });
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: EditProfile.jsx:108 ~ handleEditProfile ~ error:",
        error
      );
    }
  };
  return (
    <Box safeArea flex={1} bg={colors.light}>
      <SimpleHeader
        navigation={() => navigation.navigate("Profile")}
        title="Edit Profile"
      />

      <ScrollView>
        <Box borderRadius={"md"} p="2" m="4" bg={"#fff"}>
          <HStack>
            <Image
              alt={userInfo?.photo}
              borderRadius={"md"}
              bg="cyan.500"
              size="md"
              source={{
                uri: baseURL + "/contractor_photos/" + userInfo?.photo,
              }}
            />
            <Stack pl="2">
              <Text fontSize="md" mt="2" fontWeight="semibold">
                {userInfo?.profile?.contractor?.organization}
              </Text>

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
