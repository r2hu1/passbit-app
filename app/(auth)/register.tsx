import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function Register() {
  return (
    <SafeAreaView edges={["top", "bottom"]} className="h-full py-10 relative">
      <View className="px-8 pt-10">
        <Text className="text-3xl font-bold text-foreground">
          Great To Have You!
        </Text>
        <Text className="text-lg mt-3 text-foreground">
          Get started by creating your secure account!
        </Text>
      </View>
      <View className="grid gap-3 px-8 mt-10">
        <Label>Email</Label>
        <Input
          textContentType="emailAddress"
          placeholder="name@domain.com"
          id="email"
        />
        <Label className="mt-2">Password</Label>
        <Input
          secureTextEntry
          textContentType="password"
          placeholder="yourpassword"
          id="password"
        />
        <Link href="/welcome" className="text-right text-sm text-foreground/70">
          Forgot Password?
        </Link>
      </View>
      <View className="absolute bottom-14 px-8 grid gap-4 w-full">
        <Text className="text-foreground/80 text-center">
          Already have an account?{" "}
          <Link href="/(auth)/login" className="text-foreground">
            Login!
          </Link>
        </Text>
        <Button size="lg" className="rounded-full">
          <Text className="text-primary-foreground">Continue</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
