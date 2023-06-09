import React, { useState } from "react";
import {
  Box,
  Text,
  Pressable,
  Heading,
  IconButton,
  Icon,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Center,
  ScrollView,
  Divider,
  FlatList,
  Spinner,
} from "native-base";

import { hp } from "../../utils/screens";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { useMyChatRecordQuery } from "../../store/services/appApi";
import { useSelector } from "react-redux";
import baseURL from "../../utils/baseURL";

import HeaderTitle from "../../components/HeaderTitle";
import colors from "../../theme/colors";
import EmptyList from "../../components/EmptyList";
import { RefreshControl } from "react-native";

export default function MessagesList({ navigation }) {
  const user = useSelector((x) => x.auth.userInfo._id);
  const [search, setSearch] = React.useState("");

  const { data, error, isLoading, refetch } = useMyChatRecordQuery({
    id: user,
    search: search,
  });

  return (
    <Center h={hp("100%")}>
      <Box flex="1" w="100%">
        <HeaderTitle title="Chat" />
        {isLoading ? (
          <Box mt="3">
            {" "}
            <Spinner />
          </Box>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Basic data={data} />
          </ScrollView>
        )}
      </Box>
    </Center>
  );
}

function Basic({ data }) {
  const navigation = useNavigation();
  const [chatData, setChatData] = useState([]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...chatData];
    const prevIndex = chatData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const renderItem = ({ item, index }) => {
    var startTime = moment(item.updatedAt).format("DD/MM/YYYY HH:mm:ss");
    // var endTime = moment(item.time).format("hh:mm:ss");

    // var duration = moment.duration(startTime.diff(endTime));

    return (
      <Box>
        <Pressable
          onPress={() => navigation.navigate("ChatDetails", { data: item })}
        >
          <Box
            shadow={"1"}
            m="2"
            borderRadius={"md"}
            bg={colors.white}
            pl="4"
            pr="5"
            py="2"
          >
            <HStack alignItems="center" space={3}>
              <Avatar
                size="48px"
                source={{
                  uri: baseURL + "/user_photos/" + item.users.photo,
                }}
              />
              <VStack>
                <Text
                  color="coolGray.800"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  bold
                >
                  {item?.users?.name}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item?.latestMessage?.content}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                alignSelf="flex-start"
              >
                {item?.timeStamp}
              </Text>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    );
  };

  return (
    <Box bg={colors.light} saeArea flex="1">
      <FlatList
        data={data}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl  onRefresh={() => refetch()} />
        }
        ListEmptyComponent={<EmptyList />}
        // renderHiddenItem={renderHiddenItem}
        // rightOpenValue={-130}
        // previewRowKey={"0"}
        // previewOpenValue={-40}
        // previewOpenDelay={3000}
        // onRowDidOpen={onRowDidOpen}
      />
    </Box>
  );
}
