import React from "react";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Input,
  ScrollView,
  Stack,
  Text,
  Icon,
  VStack,
  Flex,
  Select,
  CheckIcon,
  Spinner,
} from "native-base";
import colors from "../../theme/colors";
import Toast from "react-native-toast-message";
import HeaderOnly from "../../components/HeaderOnly";

import { hp, wp } from "../../utils/screens";

import {
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesQuery,
} from "../../store/services/authApi";

import MultiSelectInput from "./Components/MultiSelectInput";
export default function CreateProfile1({ navigation, route }) {
  const [businessType, setBusinessType] = React.useState("");
  const [address, setAddress] = React.useState("");

  const [selectedCategory, setSelectedCategory] = React.useState("Industrial");

  const [selectedSpecialty, setSelectedSpecialty] = React.useState([]);

  const { data: CategoryData, error: CategoryError } =
    useGetAllCategoriesQuery();
  const { data: SubCategoryData, error: SubCategoryError } =
    useGetAllSubCategoriesQuery(selectedCategory);

  const handleSubmit = () => {
    //  navigation.navigate("CreateProfile2")
    try {
      if (
        businessType === "" ||
        selectedCategory === "" ||
        selectedSpecialty.length === 0 ||
        address === ""
      ) {
        Toast.show({
          type: "error",
          text1: "Enter all input field",
        });
      } else {
        const payload = {
          ...route.params.data,
          businessType,
          skill: selectedCategory,
          skillType: selectedSpecialty,
          address,
        };
        navigation.navigate("CreateProfile2", {
          data: payload,
        });
        console.log({ payload });
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <Box flex="1" bg={colors.light}>
      <HeaderOnly title="Work with us" steps="2/6" />
      <Box flex="1">
        <Stack
          direction={"row"}
          mx="8"
          my="3"
          borderRadius={"full"}
          bg={colors.primaryLight}
          h="5"
        >
          <Box w="1/6" h="100%" borderRadius={"full"} />
          <Box bg={colors.primary} w="1/6" h="100%" borderRadius={"full"} />
        </Stack>
        <ScrollView flex="1">
          <Flex direction="column" flex="1" justifyContent={"space-between"}>
            <VStack>
              <Stack space="2" px="4" pt="2">
                <Stack space="3">
                  <Text
                    color={colors.secondary}
                    fontSize={"md"}
                    fontWeight="semibold"
                  >
                    Your business type
                  </Text>
                  <Input
                    borderRadius="lg"
                    bg={colors.white}
                    h={hp("5%")}
                    w={wp("90%")}
                    autoCapitalize="none"
                    onChangeText={(e) => setBusinessType(e)}
                    value={businessType}
                    placeholder="Business type"
                  />
                  <Text>Eg: Service based agencies, technicians </Text>
                </Stack>
                <Stack space="3">
                  <Text
                    color={colors.secondary}
                    fontSize={"md"}
                    fontWeight="semibold"
                  >
                    Skills type or categories organization can offer
                  </Text>
                  {CategoryData !== undefined ? (
                    <Select
                      selectedValue={selectedCategory}
                      accessibilityLabel="Choose Service"
                      placeholder="Choose Category"
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
                        return (
                          <Select.Item
                            key={x._id}
                            label={x.name}
                            value={x._id}
                          />
                        );
                      })}
                    </Select>
                  ) : (
                    <Spinner />
                  )}
                </Stack>
                <Stack space="3">
                  <Text
                    color={colors.secondary}
                    fontSize={"md"}
                    fontWeight="semibold"
                  >
                    Choose your specialty
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
                <Stack space="3">
                  <Text
                    color={colors.secondary}
                    fontSize={"md"}
                    fontWeight="semibold"
                  >
                    Your business location
                  </Text>
                  <Input
                    borderRadius="lg"
                    bg={colors.white}
                    h={hp("5%")}
                    w={wp("90%")}
                    autoCapitalize="none"
                    onChangeText={(e) => setAddress(e)}
                    value={address}
                    placeholder="Enter Business Location"
                  />
                </Stack>
              </Stack>
            </VStack>
          </Flex>
          <Stack
            w="100%"
            pr="4"
            my="12"
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
            <Button onPress={handleSubmit} w="20%">
              Next
            </Button>
          </Stack>
        </ScrollView>
      </Box>
    </Box>
  );
}
