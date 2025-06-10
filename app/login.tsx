import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function Login() {
  return (
    <SafeAreaView edges={["top", "bottom"]} className="h-full py-10 relative">
      <View className="px-8">
        <Text className="text-3xl font-bold">Welcome Back!</Text>
        <Text className="text-lg">
          Login to your account to continue using Passbit!
        </Text>
      </View>
      <View className="grid gap-3 px-8 mt-5">
        <Label>Email</Label>
        <Input placeholder="name@domain.com" id="email" />
        <Label className="mt-2">Password</Label>
        <Input placeholder="yourpassword" id="password" />
        <Link href="/welcome" className="text-right text-sm text-foreground/70">
          Forgot Password?
        </Link>
      </View>
      <View className="absolute bottom-20 px-8 w-full">
        <Button size="lg">
          <Text className="text-primary-foreground">Login</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
