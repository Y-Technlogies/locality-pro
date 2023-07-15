import { Box, Text } from "native-base";
import React from "react";
import colors from "../../../theme/colors";

export default function WithdrawCard({ item }) {
  return (
    <Box borderRadius="md" flex={1} m="2" bg={colors.white} p="1">
      <Text>Account Name: {item.account_name}</Text>
      <Text>Account Number: {item.account_number}</Text>
      <Text>Bank: {item.bank}</Text>
      <Text>Branch: {item.branch}</Text>
      <Text>Routing Number: {item.routing_number}</Text>
      <Text>Amount: {item.amount} cad</Text>
      <Text>Disbursed: {item.isDisbursed ? "Disbursed" : "Not Disbursed"}</Text>
    </Box>
  );
}
