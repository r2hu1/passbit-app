import { useTheme } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { Bolt, Home, KeyRound, Plus } from "lucide-react-native";
import { TouchableWithoutFeedback } from "react-native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function Layout() {
  const { dark, colors } = useTheme();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: colors.background,
            elevation: 0,
            shadowOpacity: 1,
            height: 110,
            paddingTop: 10,
            opacity: 0.9,
          },
          tabBarLabelStyle: {
            fontSize: 9,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <KeyRound color={color} size={focused ? 20 : 18} />
            ),
          }}
        />
        <Tabs.Screen
          name="new"
          options={{
            title: "Create",
            tabBarIcon: ({ color, focused }) => (
              <Plus color={color} size={focused ? 20 : 18} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, focused }) => (
              <Bolt color={color} size={focused ? 20 : 18} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
