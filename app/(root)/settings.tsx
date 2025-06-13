import { SafeAreaView } from "react-native-safe-area-context";
import Logout from "~/components/logout";
import { Text } from "~/components/ui/text";

export default function Settings() {
  return (
    <SafeAreaView>
      <Text>Settings</Text>
      <Logout text="logout" />
    </SafeAreaView>
  );
}
