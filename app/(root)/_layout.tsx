import { Redirect, Tabs } from "expo-router";
import { Bolt, KeyRound, Plus } from "lucide-react-native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { useAuthState } from "~/hooks/use-auth-state";

export default function Layout() {
  const { user, loading, status } = useAuthState();

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
            backgroundColor: "hsl(var(--secondary))",
            elevation: 0,
            shadowOpacity: 1,
            height: 110,
            paddingTop: 10,
            opacity: 0.9,
            borderColor: "hsl(var(--border))",
            borderWidth: 1,
          },
          tabBarLabelStyle: {
            fontSize: 9,
            fontFamily: "Rubik-Regular",
          },
        }}
      >
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, focused }) => (
              <Bolt color={color} size={focused ? 20 : 18} />
            ),
          }}
        />
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
      </Tabs>
    </SafeAreaProvider>
  );
}
