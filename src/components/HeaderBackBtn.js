import React from "react";
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text,
} from "native-base";
import { hp, wp } from "../utils/screens";
import colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function HeaderBackBtn() {
  const navigation = useNavigation();
  return (
    <Box
      w={wp("100%")}
      h={hp("11%")}
      bg={colors.primary}
      borderBottomRadius="3"
      
    >
      <HStack mt={"2"} alignItems={"center"} justifyContent="center">
        <IconButton
          onPress={() => navigation.goBack()}
          w={"10%"}
          alignItems={"center"}
          mx={1}
          borderRadius={"lg"}
          variant="unstyled"
          bg={colors.primary}
          icon={
            <Icon as={Ionicons} name="arrow-back-sharp" color={colors.white} />
          }
        />
        <Pressable onPress={() => navigation.navigate("SearchResult")}>
          <HStack
            alignItems={"center"}
            borderRadius={"sm"}
            bg={colors.white}
            h={hp("5%")}
            w={wp("75%")}
          >
            <Icon
              as={<Ionicons name="md-search-sharp" />}
              size={5}
              ml="2"
              color="muted.400"
            />
            <Text>Type Text to search</Text>
          </HStack>
        </Pressable>

        <IconButton
          onPress={() => navigation.goBack()}
          w={"10%"}
          alignItems={"center"}
          mx={1}
          borderRadius={"lg"}
          variant="unstyled"
          bg={colors.primary}
          icon={<Icon as={Ionicons} name="filter-sharp" color={colors.white} />}
        />
      </HStack>
      <Button
        onPress={() => navigation.navigate("SetAddress")}
        ml="3"
        alignSelf={"flex-start"}
        leftIcon={
          <Icon
            as={Ionicons}
            name="ios-location"
            size="sm"
            color={colors.white}
          />
        }
        variant="unstyled"
        _text={{ color: colors.white }}
      >
        24 Seaborn Street, St. John’s
      </Button>
    </Box>
  );
}
