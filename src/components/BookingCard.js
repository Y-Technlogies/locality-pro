import React from "react";
import { Box, Text, HStack, Button } from "native-base";
import colors from "../theme/colors";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function BookingCard({ item, type }) {
  const navigation = useNavigation();

  return (
    <Box
      borderRadius="md"
      flex={1}
      safeArea
      m="2"
      bg={colors.light}

      p="3"
    >
      <Text fontWeight="semibold" fontSize="lg" color={colors.primary}>
        {item.title}
      </Text>

      <Text fontSize="md" color={colors.darkGray}>
        Job Type: {item.jobType}
      </Text>
      <HStack alignItems={"center"}>
        <AntDesign name="clockcircleo" color={colors.darkGray} />
        <Text pl="2" color={colors.darkGray}>
          {item?.jobPostedDate}
        </Text>
      </HStack>
      {type === "Completed" ? (
        <HStack alignItems={"center"}>
          <Button
            onPress={() =>
              navigation.navigate("BookingStatus", {
                type,
              })
            }
            variant={"link"}
            _text={{
              color: colors.red,
            }}
          >
            Delete
          </Button>
          <Button
            onPress={() =>
              navigation.navigate("BookingStatus", {
                type,
              })
            }
            variant={"link"}
            _text={{
              color: colors.primary,
            }}
          >
            Review Rating
          </Button>
        </HStack>
      ) : (
        <Button
          onPress={() =>
            navigation.navigate("BookingStatus", {
              type,
            })
          }
          variant={"link"}
          _text={{
            color: colors.primary,
          }}
        >
          Manage Booking
        </Button>
      )}
    </Box>
  );
}
