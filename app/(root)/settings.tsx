import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logout from "~/components/logout";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function Settings() {
  return (
    <SafeAreaView className="py-10 min-h-full font-rubik">
      <View className="px-8">
        <Text className="text-2xl font-rubik-bold">Settings</Text>
        <View className="mt-5"></View>
        <View className="flex flex-row gap-3">
          <Button className="w-fit rounded-full">
            <Logout text="Sign Out" className="text-sm" />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
