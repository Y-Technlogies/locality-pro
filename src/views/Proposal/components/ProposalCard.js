import { Avatar, Box, HStack, Text, VStack } from "native-base";
import React from "react";
import colors from "../../../theme/colors";
import baseURL from "../../../utils/baseURL";
import moment from "moment";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import timelineDataConverter from "../../../utils/timelineDataConverter";

export default function ProposalCard({ item }) {
  const [timelineData, setTimelineData] = React.useState([]);
  // console.log(
  // "🚀 ~ file: ProposalCard.js:12 ~ ProposalCard ~ timelineData:",
  // timelineData
  // );

  const navigation = useNavigation();
  const auth = useSelector((x) => x.auth);
  React.useEffect(() => {
    setTimelineData(timelineDataConverter(item, auth.userInfo.name));
  }, [item]);
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ProposalDetails", {
          item,
        })
      }
    >
      <Box shadow="1" m="2" p="2" bg={colors.white} borderRadius="lg">
        <HStack alignItems={"center"}>
          <Avatar
            source={{ uri: baseURL + "/user_photos/" + item?.job?.by?.photo }}
            size="sm"
            alt="photo"
          />
          <VStack pl="2">
            <Text>{item?.job?.by?.name}</Text>
            <Text>{moment(item.job.createdAt).format("YYYY-MM-DD")}</Text>
          </VStack>
        </HStack>
        <Box>
          <Text fontSize={"md"} color={colors.secondary}>
            {item?.job?.title}
          </Text>
          <Text>My bidding: ${item?.price} </Text>
          {timelineData !== undefined && (
            <Text>
              Status:{timelineData[timelineData?.length - 1]?.title?.content}
            </Text>
          )}
        </Box>
      </Box>
    </Pressable>
  );
}
