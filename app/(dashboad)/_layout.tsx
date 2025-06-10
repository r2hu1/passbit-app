import { useNavigation } from "@react-navigation/native";
import { Tabs, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Appearance, Platform, View } from "react-native";
import { getData } from "~/lib/storage/fn";

export default async function DashboardLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fetchLoginStatus = async () => {
    const token = await getData({ key: "token" });
    setIsLoggedIn(token);
  };
  const router = useRouter();

  useEffect(() => {
    fetchLoginStatus();
    if (isLoggedIn) {
      router.push("/(auth)/login");
    }
  }, []);
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
