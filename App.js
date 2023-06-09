import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import { StatusBar, } from "react-native";
import { NativeBaseProvider, extendTheme } from "native-base";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./src/store";
import RootNavigator from "./src/navigation/RootNavigator";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import nativeBaseTheme from "./src/theme/nativeBaseTheme";
import colors from "./src/theme/colors";
import Toast from "react-native-toast-message";
import { StripeProvider } from "@stripe/stripe-react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import LoadingScreen from "./src/views/LoadingScreen/LoadingScreen";
const theme = extendTheme({
  ...nativeBaseTheme,
});
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F9FAFC",
  },
};
function App() {
  const MainApp = () => {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
      "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
      "Roboto-BoldItalic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
      "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
      "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
      "Roboto-LightItalic": require("./assets/fonts/Roboto-LightItalic.ttf"),
      "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
      "Roboto-MediumItalic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
    });

    const notificationListener = React.useRef();
    const responseListener = React.useRef();
    React.useEffect(() => {
      onLayoutRootView();
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          console.log(
            "🚀 ~ file: App.js:45 ~ Notifications.addNotificationReceivedListener ~ notification:",
            notification
          );

          // console.log({ notification })
        });
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(
            "🚀 ~ file: App.js:50 ~ Notifications.addNotificationResponseReceivedListener ~ response:",
            response
          );
          // navigation.navigate(
          //   role === "student" ? "StudentNotification" : "TeacherNotification"
          // );
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, [onLayoutRootView]);

    const onLayoutRootView = React.useCallback(async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);
    if (!fontsLoaded) {
      return null;
    }

    return <RootNavigator />;
  };

  const config = {
    dependencies: {
      "linear-gradient": LinearGradient,
    },
  };

  return (
    <NativeBaseProvider theme={theme} config={config}>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <StatusBar style="light" color={colors.primary} />
          <StripeProvider publishableKey="pk_live_51MWeOcDA0x2BbgHkWUAXDg9VbJF4RAPr6HjtmAFIAsWlINHvSZMasaT8KBDrBABsWUtKwWcixirPPoTi3vqBKWia00iVojW86T">
            <NavigationContainer theme={MyTheme}>
              <MainApp />
              <Toast />
            </NavigationContainer>
          </StripeProvider>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}
export default App;
