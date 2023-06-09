import React from "react";
import { Box, FlatList } from "native-base";
import { RefreshControl } from "react-native";
import EmptyList from "../../components/EmptyList";
import { useGetSubmittedProposalQuery } from "../../store/services/appApi";
import SubmittedProposalCard from "./components/SubmittedProposalCard";

export default function SubmittedProposal() {
  const { data, isLoading } = useGetSubmittedProposalQuery();

  return (
    <Box flex="1">
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetch} />
        }
        data={data}
        renderItem={({ item }) => <SubmittedProposalCard item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={!isLoading && data?.length === 0 && <EmptyList />}
      />
    </Box>
  );
}
