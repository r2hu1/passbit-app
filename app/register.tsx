import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  return (
    <SafeAreaView>
      <Link href="/welcome">Register</Link>
    </SafeAreaView>
  );
}
