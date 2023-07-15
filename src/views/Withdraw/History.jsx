import { Box, Button, FlatList, HStack, Icon, Stack, Text } from "native-base";
import React from "react";
import SimpleHeader from "../../components/SimpleHeader";
import { RefreshControl } from "react-native";
import WithdrawCard from "./compoents/WithdrawCard";
import EmptyList from "../../components/EmptyList";
import { useGetWithdrawHistoryQuery } from "../../store/services/appApi";
import { useUserInfoQuery } from "../../store/services/authApi";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from "../../theme/colors";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";
export default function History({ navigation }) {
  const [start_date, setStart_date] = React.useState("");
  const [end_date, setEnd_date] = React.useState("");
  const { isLoading: userDataLoading, data: userinfo } = useUserInfoQuery();
  const [startDateVisible, setStartDateVisible] = React.useState(false);
  const [endDateVisible, setEndDateVisible] = React.useState(false);

  const handleConfirmStartDate = (date) => {
    setStart_date(moment(date).format("YYYY-MM-DD"));
    setStartDateVisible(false);
  };

  const handleConfirmEndDate = (date) => {
    setEnd_date(moment(date).format("YYYY-MM-DD"));
    setEndDateVisible(false);
  };
  const { data, error, isLoading } = useGetWithdrawHistoryQuery({
    start_date,
    end_date,
    contractor: !userDataLoading && userinfo[0]?._id,
  });

  return (
    <Box safeArea bg={"rgba(249, 250, 252, 1)"}>
      <DateTimePickerModal
        isVisible={startDateVisible}
        mode="date"
        onConfirm={handleConfirmStartDate}
        onCancel={() => setStartDateVisible(false)}
      />
      <DateTimePickerModal
        isVisible={endDateVisible}
        mode="date"
        onConfirm={handleConfirmEndDate}
        onCancel={() => setEndDateVisible(false)}
      />
      <SimpleHeader
        title="Withdraw History"
        navigation={() => navigation.navigate("CheckBalance")}
      />
      <Stack m="2">
        <HStack
          bg={colors.white}
          p="2"
          borderRadius={"md"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize="lg">Start Date</Text>
          <Button
            onPress={() => setStartDateVisible(true)}
            w="36%"
            _text={{
              paddingLeft: 2,
            }}
            leftIcon={<Icon as={Entypo} name="calendar" size="sm" />}
            variant="outline"
            borderColor={colors.primary}
          >
            {start_date}
          </Button>
        </HStack>
        <HStack
          bg={colors.white}
          p="2"
          borderRadius={"md"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize="lg">End Date</Text>
          <Button
            onPress={() => setEndDateVisible(true)}
            w="36%"
            _text={{
              paddingLeft: 2,
            }}
            leftIcon={<Icon as={Entypo} name="calendar" size="sm" />}
            variant="outline"
            borderColor={colors.primary}
          >
            {end_date}
          </Button>
        </HStack>
      </Stack>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading || userDataLoading}
            onRefresh={fetch}
          />
        }
        data={data !== undefined && data[0]?.data}
        renderItem={({ item }) => <WithdrawCard type="Recent" item={item} />}
        keyExtractor={(item, index) => item._id}
        ListEmptyComponent={<EmptyList />}
      />
    </Box>
  );
}
