import { Center } from "native-base";
import React from "react";
import { ActivityIndicator } from "react-native";
import colors from "../../theme/colors";

const LoadingScreen = () => {
  return (
    <Center flex={"1"}>
      <ActivityIndicator size="large" color={colors.primary} />
    </Center>
  );
};

export default LoadingScreen;
