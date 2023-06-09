import { Avatar, Box, HStack, Text, VStack } from "native-base";
import React from "react";
import colors from "../../../theme/colors";
import baseURL from "../../../utils/baseURL";
import moment from "moment";

export default function SubmittedProposalCard({ item }) {
  return (
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
        <Text color={colors.secondary}>{item?.job?.title}</Text>
        <Text>My bidding: ${item?.price} </Text>
      </Box>
    </Box>
  );
}
