import { Box, Pressable, Text } from "native-base";
import React from "react";
import SimpleHeader from "../../components/SimpleHeader";
import { hp, wp } from "../../utils/screens";
import BtnContainer from "../../components/BtnContainer";
import { useCheckBalanceQuery } from "../../store/services/appApi";

export default function CheckBalance({ navigation }) {
  const { data, isLoading, error } = useCheckBalanceQuery();

  return (
    <Box safeArea>
      <SimpleHeader
        title="Check Balance"
        navigation={() => navigation.goBack()}
      />
      <Box
        alignItems={"center"}
        justifyContent={"center"}
        m="6"
        borderRadius={"md"}
        h={hp("16%")}
        bg={{
          linearGradient: {
            colors: ["#0091A6", "#1fb090"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
      >
        <Text bold fontSize={"xl"} color="white">
          My current balance is
        </Text>
        <Text bold fontSize={"xl"} color="white">
          ${data?.balance} Cad
        </Text>
      </Box>
      <Pressable onPress={() => navigation.navigate("Withdraw")}>
        <BtnContainer title="Send Withdraw Request" width={wp("92%")} />
      </Pressable>
    </Box>
  );
}
