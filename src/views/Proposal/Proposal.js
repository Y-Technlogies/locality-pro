import { Box, useColorModeValue } from "native-base";
import { Dimensions, Animated, Pressable } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import React from "react";

import colors from "../../theme/colors";
import OnGoing from "./OnGoing";
import SubmittedProposal from "./SubmittedProposal";
import HeaderTitle from "../../components/HeaderTitle";

const initialLayout = {
  width: Dimensions.get("window").width,
};
const renderScene = SceneMap({
  first: OnGoing,
  second: SubmittedProposal,
});

const TabComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "Selected Proposal",
    },
    {
      key: "second",
      title: "Submitted Proposal",
    },
  ]);

  const renderTabBar = (props) => {
    return (
      <Box
        flexDirection="row"
        pb="0.5"
        bg={{
          linearGradient: {
            colors: ["#0091A6", "#0F617E"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
      >
        {props.navigationState.routes.map((route, i) => {
          const color = index === i ? colors.light : colors.gray;
          const fontWeight = index === i ? "bold" : "normal";
          const borderColor = index === i ? colors.light : colors.gray;
          return (
            <Box
              key={i}
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              cursor="pointer"
            >
              <Pressable
                alignItems="center"
                width={"100%"}
                onPress={() => {
                  // //console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                    fontSize: 16,
                    fontWeight,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

const Proposal = () => {
  return (
    <Box flex={1} bg={colors.light}>
      <HeaderTitle title="Job Proposal" />
      <TabComponent />
    </Box>
  );
};

export default Proposal;
