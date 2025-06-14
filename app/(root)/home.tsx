import { ActivityIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { getSavedVaults } from "~/lib/api";

export default function Home() {
  const [vaults, setVaults] = useState([]);
  const fetchvaults = async () => {
    try {
      const res = await getSavedVaults();
      setVaults(res.saved);
      console.log(res.saved);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchvaults();
  }, []);

  return (
    <SafeAreaView className="py-10">
      <View className="grid gap-5 px-8">
        {vaults.map((vault: any, index: number) => (
          <View
            key={index}
            className="border flex-row gap-4 p-3 px-4 border-border rounded-xl bg-secondary"
          >
            <View className="flex items-center justify-center h-14 w-14 bg-background rounded-xl border-border border">
              <Text className="font-rubik-bold text-xl text-foreground">Y</Text>
            </View>
            <View className="flex-col gap-0 justify-between">
              <Text className="text-secondary-foreground font-rubik-medium text-lg">
                Youtube
              </Text>
              <Text className="text-secondary-foreground font-rubik text-sm">
                This is my yt account!
              </Text>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
