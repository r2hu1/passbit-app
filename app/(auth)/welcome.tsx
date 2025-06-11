import { Link } from "expo-router";
import { Text, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

const slogan = ["Open Source", "Password", "Manager", "That Works!"];

export default function Welcome() {
  return (
    <SafeAreaView className="h-full relative" edges={["bottom", "top"]}>
      <View className="px-8 py-10">
        {slogan.map((word, index) => (
          <Animated.Text
            key={index}
            style={{ fontSize: 55, fontWeight: "bold" }}
            entering={FadeInLeft.duration(500).delay(index * 200)}
            className="text-foreground"
          >
            {word}
          </Animated.Text>
        ))}
        <Animated.Text
          entering={FadeInLeft.duration(500).delay(500)}
          className="text-lg text-foreground leading-relaxed mt-4 mb-4"
        >
          An open-source password manager focused on security and privacy.
          Protect your passwords with advanced encryption.
        </Animated.Text>
        <Animated.View
          entering={FadeInUp.duration(500).delay(600)}
          className="flex flex-row gap-3"
        >
          <Badge variant="outline">
            <Text className="text-foreground/90 text-sm"># Open-Source</Text>
          </Badge>
          <Badge variant="outline">
            <Text className="text-foreground/90 text-sm"># Free</Text>
          </Badge>
          <Badge variant="outline">
            <Text className="text-foreground/90 text-sm">
              # End-To-End Encrypted
            </Text>
          </Badge>
        </Animated.View>
      </View>
      <Animated.View
        entering={FadeInDown.duration(500).delay(700)}
        className="absolute bottom-14 px-8 w-full"
      >
        <Link href="/(auth)/login" asChild>
          <Button size="lg" className="rounded-full">
            <Text className="text-center text-primary-foreground w-full">
              Get Started
            </Text>
          </Button>
        </Link>
      </Animated.View>
    </SafeAreaView>
  );
}
