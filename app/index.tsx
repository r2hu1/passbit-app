import { Redirect } from "expo-router";
import { useAuthState } from "~/hooks/use-auth-state";

export default function App() {
  const { user, status, loading } = useAuthState();
  if (loading) return null;
  if (!user) {
    return <Redirect href="/(auth)/welcome" />;
  }
  if (user && !status) {
    return <Redirect href="/(auth)/verify" />;
  }
  return <Redirect href="/(root)/home" />;
}
