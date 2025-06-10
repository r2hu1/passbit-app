import { Link } from "expo-router";
import { Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInUp,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export default function Welcome() {
  return (
    <SafeAreaView className="h-full relative" edges={["bottom", "top"]}>
      <View className="px-8 py-10">
        <Animated.Text
          style={{ fontSize: 55, fontWeight: "bold" }}
          entering={FadeInLeft.duration(500)}
        >
          Password Manager That Works!
        </Animated.Text>
        <Animated.Text
          entering={FadeInLeft.duration(500).delay(500)}
          className="text-lg leading-relaxed mt-4 mb-4"
        >
          An open-source password manager focused on security and privacy.
          Protect your passwords with advanced encryption.
        </Animated.Text>
        <Animated.View
          entering={FadeInUp.duration(500).delay(600)}
          className="flex flex-row gap-3"
        >
          <Badge variant="outline">
            <Text className="text-foreground/90 text-sm">Open-Source</Text>
          </Badge>
          <Badge variant="outline">
            <Text className="text-foreground/90 text-sm">Free</Text>
          </Badge>
          <Badge variant="outline">
            <Text className="text-foreground/90 text-sm">
              End-To-End Encrypted
            </Text>
          </Badge>
        </Animated.View>
      </View>
      <Animated.View
        entering={FadeInDown.duration(500).delay(700)}
        className="absolute bottom-20 px-8 w-full"
      >
        <Button size="lg" className="w-full">
          <Link href="/login">
            <Text className="text-primary-foreground">Get Started</Text>
          </Link>
        </Button>
      </Animated.View>
    </SafeAreaView>
  );
}
