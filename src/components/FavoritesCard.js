import React from "react";
import {
  Avatar,
  Box,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  useToast,
  VStack,
} from "native-base";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import colors from "../theme/colors";
import { useNavigation } from "@react-navigation/native";

export default function FavoritesCard({ item }) {
  const [favorite, setFavorite] = React.useState(true);
  const navigation = useNavigation();
  const toast = useToast();
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
        <HStack w="100%" alignItems={"center"} justifyContent="space-between">
          <HStack>
            <Avatar
              size="48px"
              source={{
                uri: item.img,
              }}
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
            </VStack>
          </HStack>
          <Pressable
            onPress={() => {
              setFavorite((prevState) => !prevState),
                toast.show({
                  description: !favorite
                    ? "Added To Favorite"
                    : "Removed From Favorite",
                });
            }}
            variant="outline"
            borderColor={colors.lightGray}
            _hover={{
              backgroundColor: "transparent",
            }}
          >
            <Icon
              size={6}
              as={MaterialIcons}
              name={favorite ? "favorite" : "favorite-border"}
              color={colors.primary}
            />
          </Pressable>
        </HStack>
      </Box>
    </Pressable>
  );
}
