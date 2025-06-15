import { Redirect, Stack } from "expo-router";
import { useAuthState } from "~/hooks/use-auth-state";

export default function RootLayout() {
  const { user, status, loading } = useAuthState();
  if (loading) return null;
  if (user && status) {
    return <Redirect href="/(root)/home" />;
  }
  if (user && !status) {
    return <Redirect href="/(auth)/verify" />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
      <Stack.Screen name="forgot" />
      <Stack.Screen name="register" />
      <Stack.Screen name="verify" />
    </Stack>
  );
}
