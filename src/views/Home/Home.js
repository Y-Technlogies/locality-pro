import React from "react";
import { Box, Center, FlatList, Spinner, Text } from "native-base";
import Header from "../../components/Header";
import colors from "../../theme/colors";
import JobPostCard from "./Components/JobPostCard";
import { RefreshControl } from "react-native";

import {
  useGetContractorJobQuery,
  useGetJobsQuery,
} from "./../../store/services/appApi";
import { useSelector } from "react-redux";
export default function Home({ navigation }) {
  const user = useSelector((x) => x.auth);
  console.log("🚀 ~ file: Home.js:15 ~ Home ~ user:", user.userInfo?.address);
  if (isLoading) {
    return (
      <Center flex="1">
        <Spinner size={"lg"} />
      </Center>
    );
  }
  if (user.isAuthenticated) {
    const { data, isLoading, error } = useGetContractorJobQuery(
      user.userInfo._id
    );

    console.log("🚀 ~ file: Home.js:24 ~ Home ~ data:", data);
    return (
      <Box flex={1} bg={colors.light}>
        <Header />
        <Box m="2" p="1" w="96%">
          <Text color={colors.secondary}>
            Jobs near {JSON.stringify(user.userInfo?.address)}
          </Text>
        </Box>
        <FlatList
          // stickyHeaderIndices={[0]}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetch} />
          }
          data={data === undefined ? [] : data}
          renderItem={({ item }) => (
            <JobPostCard navigation={navigation} item={item} />
          )}
          ListEmptyComponent={
            (data === undefined ||
              data[0]?.data === undefined ||
              data[0]?.data.length === 0) & <EmptyList />
          }
          keyExtractor={(index) => index}
        />
      </Box>
    );
  }
  const { data, isLoading, error } = useGetJobsQuery();
  return (
    <Box flex={1} bg={colors.light}>
      <Header />

      <FlatList
        // stickyHeaderIndices={[0]}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetch} />
        }
        data={
          data === undefined || data[0]?.data === undefined
            ? []
            : data[0]?.data === undefined
            ? data[0]
            : data[0]?.data
        }
        renderItem={({ item }) => (
          <JobPostCard navigation={navigation} item={item} />
        )}
        ListEmptyComponent={
          (data === undefined ||
            data[0]?.data === undefined ||
            data[0]?.data.length === 0) & <EmptyList />
        }
        keyExtractor={(index) => index}
      />
    </Box>
  );
}
const EmptyList = () => {
  return (
    <Box flex={1} bg={colors.light}>
      <Header />
    </Box>
  );
};
