import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="flex items-center justify-center flex-row">
      <Text>This screen doesn't exist.</Text>
      <Link href="/(auth)/welcome">
        <Text>Go to home screen!</Text>
      </Link>
    </SafeAreaView>
  );
}
