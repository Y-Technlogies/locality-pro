import React from "react";
import { Box, Button, Icon, IconButton, Image, Text } from "native-base";
import Onboarding from "react-native-onboarding-swiper";
import { FontAwesome } from "@expo/vector-icons";
import { hp, wp } from "../../utils/screens";
import colors from "../../theme/colors";
import { useDispatch } from "react-redux";
import { introFn } from "../../store/slices/introSlice";

export default function OnboardingScreen({ navigation }) {
  const dispatch = useDispatch();
  const handleDoneBtn = () => {
    navigation.replace("App")
    dispatch(introFn());
  };

  const Done = () => (
    <Button
   
      variant="unstyled"
      bg={colors.secondary}
      mr="2"
      borderRadius={"md"}
      _text={{
        color: colors.white,
      }}
      onPress={handleDoneBtn}
    >
      Get Started
    </Button>
  );

  const Skip = ({ skipLabel }) => (
    <Button
    w={wp("18%")}
      variant={"link"}
      _text={{
        color: colors.white,
      }}
      onPress={handleDoneBtn}
    >
      {skipLabel}
    </Button>
  );

  const Next = ({ isLight, ...props }) => (
    <IconButton
      mr="2"
      alignItems={"center"}
      a
      borderRadius={"lg"}
      variant="unstyled"
      bg={colors.secondary}
      icon={
        <Icon pl="2" as={FontAwesome} name="angle-right" color={colors.white} />
      }
      {...props}
    >
      Next
    </IconButton>
  );

  return (
    <Box flex={1} >
      <Onboarding
        // DotComponent={Square}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        DoneButtonComponent={Done}
        bottomBarHighlight={false}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={{
                  width: wp("70%"),
                  height: hp("30%"),
                  resizeMode: "contain",
                }}
                alt="images"
                source={require("./../../../assets/Welcome.png")}
              />
            ),
            title: "Welcome to Locality",
            subtitle: "Find your local Contractor all at one place",
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={{
                  width: wp("70%"),
                  height: hp("30%"),
                  resizeMode: "contain",
                }}
                alt="images"
                source={require("./../../../assets/Service.png")}
              />
            ),
            title: "Service of all ranges",
            subtitle:
              "Whether you need someone to do your gardening, washing your car or to fix you heater in cold winter, there are Contractor near you waiting for your call!",
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={{
                  width: wp("70%"),
                  height: hp("30%"),
                  resizeMode: "contain",
                }}
                alt="images"
                source={require("./../../../assets/doorstep.png")}
              />
            ),
            title: "From tip of your finger to your doorstep",
            subtitle:
              "Locate what services you requires and set the price that you’d want your service to be availed, or hire contractors based on your affordability",
          },
          {
             backgroundColor: "#fff",
            image: (
              <Image
                style={{
                  width: wp("70%"),
                  height: hp("30%"),
                  resizeMode: "contain",
                }}
                alt="images"
                source={require("./../../../assets/Save.png")}
              />
            ),
            title: "Save your time and sit back tight!",
            subtitle:
              "With just few taps away, get your Contractor at your doorstep and let them to do their magic, while you sit back and set your priorities",
          },
        
        ]}
      />
    </Box>
  );
}
