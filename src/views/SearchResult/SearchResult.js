import React from "react";
import {
  Box,
  Button,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Input,
  Pressable,
  Text,
} from "native-base";
import { hp, wp } from "../../utils/screens";
import colors from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { workerData } from "../../data";
import WorkerCard from "../../components/WorkerCard";
export default function SearchResult({ navigation }) {
  return (
    <Box flex="1" safeArea>
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
              <Icon
                as={Ionicons}
                name="arrow-back-sharp"
                color={colors.white}
              />
            }
          />

          <Input
            variant={"unstyled"}
            _focus={{
              backgroundColor: colors.white,
            }}
            bg={colors.white}
            h={hp("5%")}
            w={wp("85%")}
            InputLeftElement={
              <Icon
                as={<Ionicons name="md-search-sharp" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Type Text to search"
          />
          {/* <IconButton
            onPress={() => navigation.goBack()}
            w={"10%"}
            alignItems={"center"}
            mx={1}
            borderRadius={"lg"}
            variant="unstyled"
            bg={colors.primary}
            icon={
              <Icon as={Ionicons} name="filter-sharp" color={colors.white} />
            }
          /> */}
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
      <Box p="2">
        <Box bg={colors.primaryLight} p="1" w="90%">
          <Text fontSize="md">Showing your search results for Plumbing</Text>
        </Box>

        <FlatList
          mt="4"
          contentContainerStyle={{ paddingBottom: 60 }}
          data={workerData}
          renderItem={({ item }) => <WorkerCard item={item} />}
          keyExtractor={(x) => x.id}
        />
      </Box>
    </Box>
  );
}
