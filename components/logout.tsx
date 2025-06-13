import { useAuthState } from "~/hooks/use-auth-state";
import { Text } from "./ui/text";
import { useRouter } from "expo-router";

export default function Logout({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const { logout } = useAuthState();
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/(auth)/welcome");
  };

  return (
    <Text className={className} onPress={handleLogout}>
      {text}
    </Text>
  );
}
