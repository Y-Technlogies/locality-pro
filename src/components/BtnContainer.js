import React from "react";
import { Box, Spinner, Text } from "native-base";
import colors from "../theme/colors";

export default function BtnContainer({
  title,
  width,
  isLoading = false,
  disabled = false,
}) {
  return (
    <Box
      alignSelf={"center"}
      w={width}
      py="3"
      borderRadius={"md"}
      variant="unstyled"
      bg={
        disabled
          ? colors.darkGray
          : {
              linearGradient: {
                colors: ["#0091A6", "#0F617E"],
                start: [0, 0],
                end: [1, 0],
              },
            }
      }
    >
      {isLoading ? (
        <Spinner color="emerald.500" />
      ) : (
        <Text textAlign={"center"} color={colors.white}>
          {title}
        </Text>
      )}
    </Box>
  );
}
