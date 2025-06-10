import { Link } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <View>
        <Link href="/">Welcome to Passbit!</Link>
      </View>
    </SafeAreaView>
  );
}
