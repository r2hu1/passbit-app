import { ActivityIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Text } from "~/components/ui/text";
import { getSavedVaults } from "~/lib/api";
import { getData, storeData } from "~/lib/storage/fn";

export default function Home() {
  const [vaults, setVaults] = useState([]);
  const fetchvaults = async () => {
    try {
      const stdta = await getData({ key: "vaults" });
      if (stdta) {
        setVaults(JSON.parse(stdta));
      }
      const res = await getSavedVaults();
      setVaults(res.saved);
      await storeData({ key: "vaults", value: JSON.stringify(res.saved) });
      console.log(res.saved);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchvaults();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-20 px-8"
      >
        {/* <ThemeToggle /> */}
        {vaults.map((vault: any, index: number) => (
          <View
            key={index}
            className="border mt-4 flex-row gap-3.5 p-3 px-4 border-border rounded-xl bg-secondary/50"
          >
            <View className="flex items-center justify-center h-14 w-14 bg-background rounded-xl border-border border">
              <Text className="font-rubik-bold text-xl text-foreground">
                {vault.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View className="flex-col gap-0 justify-between">
              <Text className="text-secondary-foreground font-rubik-medium text-lg">
                {vault.name.charAt(0).toUpperCase()}
                {vault.name.slice(1, vault.name.length)}
              </Text>
              <Text className="text-secondary-foreground font-rubik text-sm">
                {vault.note.slice(0, 100)}.
              </Text>
            </View>
          </View>
        ))}
        {vaults.map((vault: any, index: number) => (
          <View
            key={index}
            className="border mt-4 flex-row gap-3.5 p-3 px-4 border-border rounded-xl bg-secondary"
          >
            <View className="flex items-center justify-center h-14 w-14 bg-background rounded-xl border-border border">
              <Text className="font-rubik-bold text-xl text-foreground">
                {vault.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View className="flex-col gap-0 justify-between">
              <Text className="text-secondary-foreground font-rubik-medium text-lg">
                {vault.name.charAt(0).toUpperCase()}
                {vault.name.slice(1, vault.name.length)}
              </Text>
              <Text className="text-secondary-foreground font-rubik text-sm">
                {vault.note.slice(0, 100)}.
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
