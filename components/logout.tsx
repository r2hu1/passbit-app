import { useAuthState } from "~/hooks/use-auth-state";
import { Text } from "./ui/text";
import { useRouter } from "expo-router";
import { cn } from "~/lib/utils";

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
    <Text className={cn(className, "font-rubik")} onPress={handleLogout}>
      {text}
    </Text>
  );
}
