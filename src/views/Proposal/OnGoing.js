import React from "react";
import { Box, FlatList } from "native-base";
import ProposalCard from "./components/ProposalCard";
import { RefreshControl } from "react-native";
import EmptyList from "../../components/EmptyList";
import { useGetSelectedProposalQuery } from "../../store/services/appApi";

export default function OnGoing() {
  const { isLoading, data, error } = useGetSelectedProposalQuery();
  console.log(
    "🚀 ~ file: OnGoing.js:10 ~ OnGoing ~ isLoading, data, error :",
    isLoading,
    data,
    error
  );

  return (
    <Box flex="1">
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetch} />
        }
        data={data}
        renderItem={({ item }) => <ProposalCard type="Recent" item={item} />}
        keyExtractor={(item, index) => item._id}
        ListEmptyComponent={<EmptyList />}
      />
    </Box>
  );
}
