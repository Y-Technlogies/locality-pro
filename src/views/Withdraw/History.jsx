import { Box, FlatList } from "native-base";
import React from "react";
import SimpleHeader from "../../components/SimpleHeader";
import { RefreshControl } from "react-native";
import WithdrawCard from "./compoents/WithdrawCard";
import EmptyList from "../../components/EmptyList";

export default function History({navigation}) {
  const [data, setData] = React.useState([]);
  return (
    <Box safeArea bg={"rgba(249, 250, 252, 1)"}>
      <SimpleHeader
        title="Withdraw History"
        navigation={() => navigation.navigate("CheckBalance")}
      />
      <FlatList
        // refreshControl={
        //   <RefreshControl refreshing={isLoading} onRefresh={fetch} />
        // }
        data={data}
        renderItem={({ item }) => <WithdrawCard type="Recent" item={item} />}
        keyExtractor={(item, index) => item._id}
        ListEmptyComponent={<EmptyList />}
      />
    </Box>
  );
}
