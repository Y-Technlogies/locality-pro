import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Signin from "../views/Signin/Signin";
import Signup from "../views/Signup/Signup";
import AppDrawerContains from "./AppDrawerContains";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import Home from "../views/Home/Home";
import ProfileSubmit from "../views/Signup/ProfileSubmit";
import Proposal from "../views/Proposal/Proposal";
import colors from "../theme/colors";
import Chat from "../views/Chat/Chat";
import ChatDetails from "../views/Chat/ChatDetails";
import PostDetails from "../views/PostDetails/PostDetails";
import OnboardingScreen from "../views/Onboarding/Onboarding";
import SetAddress from "../views/SetAddress/SetAddress";
import SetLocation from "../views/SetLocation/SetLocation";
import { BackHandler, Alert } from "react-native";
import CreateProfile1 from "../views/Signup/CreateProfile1";
import CreateProfile2 from "../views/Signup/CreateProfile2";
import CreateProfile3 from "../views/Signup/CreateProfile3";
import CreateProfile4 from "../views/Signup/CreateProfile4";

import { useSelector } from "react-redux";
import ProposalDetails from "../views/Proposal/ProposalDetails";
import Profile from "../views/Profile/Profile";
import ProposalSendSuccess from "../views/SubmitProposal/ProposalSendSuccess";
import CreateProfile5 from "../views/Signup/CreateProfile5";
import SendOTP from "../views/Signup/SendOTP";
import VerifyOTP from "../views/Signup/VerifyOTP";
import SendProposal from "../views/SendProposal/SendProposal";
import ForgotPassword from "../views/Signin/ForgotPassword";
import SendOTPForgotPassword from "../views/Signin/SendOTPForgotPassword";

const AppDrawerStack = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const AppStack = createNativeStackNavigator();
const VisitorStack = createNativeStackNavigator();

const AppHome = () => {
  const isAuthenticated = useSelector((x) => x.auth.isAuthenticated);
  const introShown = useSelector((x) => x.intro.introShown);

  let backButtonPressedOnce = false;
  React.useEffect(() => {
    const backAction = () => {
      if (backButtonPressedOnce) {
        BackHandler.exitApp(); // Close the app if the back button is pressed twice
      } else {
        backButtonPressedOnce = true;
        Alert.alert("Exit App", "Press back again to exit.", [
          { text: "Cancel", onPress: () => (backButtonPressedOnce = false) },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
        setTimeout(() => {
          backButtonPressedOnce = false;
        }, 2000); // Reset the flag after 2 seconds
      }
      return true; // Return true to prevent the default back button action
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Clean up the event listener on unmount
  }, []);

  if (!isAuthenticated) {
    return (
      <VisitorStack.Navigator
        initialRouteName={introShown ? "App" : "Onboarding"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <VisitorStack.Screen name="Home" component={Home} />
      </VisitorStack.Navigator>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.white,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
        },
      }}
      barStyle={{ backgroundColor: "#694fad" }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      {isAuthenticated && (
        <>
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="user-alt" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Chat"
            component={Chat}
            options={{
              tabBarLabel: "Chat",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="chat" size={24} color={color} />
              ),
            }}
          />

          <Tab.Screen
            name="Proposal"
            component={Proposal}
            options={{
              tabBarLabel: "Proposal",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="format-list-text"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <AppDrawerStack.Navigator
      // initialRouteName="AppHome"
      screenOptions={{
        headerShown: false,
        labelStyle: {
          fontSize: 16,
        },
        drawerPosition: "left",
        drawerType: "slide",
        drawerIcon: () => null,
      }}
      drawerContent={(props) => <AppDrawerContains {...props} />}
    >
      {/* <AppDrawerStack.Screen component={SearchResult} name="SearchResult" /> */}
      <AppDrawerStack.Screen component={AppHome} name="AppHome" />
      <AppDrawerStack.Screen component={Chat} name="Chat" />
      <AppDrawerStack.Screen component={ChatDetails} name="ChatDetails" />
      <AppDrawerStack.Screen component={PostDetails} name="PostDetails" />

      <AppDrawerStack.Screen component={SendProposal} name="SendProposal" />
      <AppDrawerStack.Screen
        component={ProposalSendSuccess}
        name="ProposalSendSuccess"
      />
      <AppDrawerStack.Screen
        component={ProposalDetails}
        name="ProposalDetails"
      />
    </AppDrawerStack.Navigator>
  );
};

const RootNavigator = () => {
  const introShown = useSelector((state) => state.intro.introShown);
  return (
    <AppStack.Navigator
      initialRouteName={introShown ? "App" : "Onboarding"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AppStack.Screen component={OnboardingScreen} name="Onboarding" />
      <AppStack.Screen component={Signin} name="Signin" />
      <AppStack.Screen component={Signup} name="Signup" />
      <AppStack.Screen component={CreateProfile1} name="CreateProfile1" />
      <AppStack.Screen component={CreateProfile2} name="CreateProfile2" />
      <AppStack.Screen component={CreateProfile3} name="CreateProfile3" />
      <AppStack.Screen component={CreateProfile4} name="CreateProfile4" />
      <AppStack.Screen component={CreateProfile5} name="CreateProfile5" />
      <AppStack.Screen component={ProfileSubmit} name="ProfileSubmit" />
      <AppStack.Screen component={AppNavigator} name="App" />
      <AppStack.Screen component={SetAddress} name="SetAddress" />
      <AppStack.Screen component={SetLocation} name="SetLocation" />
      <AppStack.Screen component={SendOTP} name="SendOTP" />
      <AppStack.Screen component={VerifyOTP} name="VerifyOTP" />
      <AppStack.Screen
        component={SendOTPForgotPassword}
        name="SendOTPForgotPassword"
      />
      <AppStack.Screen component={ForgotPassword} name="ForgotPassword" />
    </AppStack.Navigator>
  );
};
export default RootNavigator;
