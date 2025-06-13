import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Appearance, Platform, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { useFonts } from "expo-font";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export { ErrorBoundary } from "expo-router";

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});

export default function RootLayout() {
  usePlatformSpecificSetup();
  const { isDarkColorScheme } = useColorScheme();
  const [loaded, error] = useFonts({
    "Rubik-Bold": require("../assets/font/Rubik-Bold.ttf"),
    "Rubik-Regular": require("../assets/font/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../assets/font/Rubik-Medium.ttf"),
    "Rubik-Light": require("../assets/font/Rubik-Light.ttf"),
    "Rubik-Black": require("../assets/font/Rubik-Black.ttf"),
    "Rubik-Italic": require("../assets/font/Rubik-Italic.ttf"),
    "Rubik-ExtraBold": require("../assets/font/Rubik-ExtraBold.ttf"),
    "Rubik-SemiBold": require("../assets/font/Rubik-SemiBold.ttf"),
    "Rubik-SemiBoldItalic": require("../assets/font/Rubik-SemiBoldItalic.ttf"),
    "Rubik-BoldItalic": require("../assets/font/Rubik-BoldItalic.ttf"),
    "Rubik-ExtraBoldItalic": require("../assets/font/Rubik-ExtraBoldItalic.ttf"),
    "Rubik-BlackItalic": require("../assets/font/Rubik-BlackItalic.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add("bg-background");
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
  }, []);
}

function noop() {}
