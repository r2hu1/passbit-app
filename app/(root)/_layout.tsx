import "~/global.css";
import { Redirect, Tabs } from "expo-router";
import { Bolt, KeyRound, Plus } from "lucide-react-native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { useAuthState } from "~/hooks/use-auth-state";
import { useTheme } from "@react-navigation/native";

export default function Layout() {
  const { user, loading, status } = useAuthState();
  const { colors, dark } = useTheme();

  if (loading) return null;
  if (!user) {
    return <Redirect href="/(auth)/welcome" />;
  }
  if (user && !status) {
    return <Redirect href="/(auth)/verify" />;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            elevation: 0,
            shadowOpacity: 1,
            height: 110,
            paddingTop: 10,
            opacity: 0.9,
            borderWidth: 0,
            borderTopWidth: 1,
            borderEndWidth: 1,
            borderStartWidth: 1,
            borderColor: !dark ? "hsl(240 5.9% 90%)" : "hsl(240 3.7% 15.9%)",
            backgroundColor: !dark
              ? "hsl(240 4.8% 95.9%)"
              : "hsl(240 3.7% 15.9%)",
          },
          tabBarLabelStyle: {
            fontSize: 9,
            fontFamily: "Rubik-Regular",
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
