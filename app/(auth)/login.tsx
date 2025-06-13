import { Link, useRouter } from "expo-router";
import { FormEvent, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { loginUser } from "~/lib/api";
import { storeData } from "~/lib/storage/fn";
import { ToastAndroid, Alert } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError({ email: "Please enter a valid email address!" });
      return;
    }
    if (!password) {
      setError({ password: "Please enter your password!" });
      return;
    }
    setError({});
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      if (!res?.error) {
        storeData({ key: "token", value: res.token });
        ToastAndroid.show("Login successful!", ToastAndroid.SHORT);
        router.push("/(auth)/verify");
      }
    } catch (error: any) {
      if (error.response.data.statusMessage) {
        setError({ password: "Invalid email or password!" });
        Alert.alert(
          "Invalid email or password!",
          "Please check your credentials.",
          [{ text: "OK", onPress: () => setError({}) }],
        );
        ToastAndroid.show("Invalid email or password!", ToastAndroid.SHORT);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="h-full py-10 relative">
      <View className="px-8 pt-10">
        <Text className="text-3xl font-bold text-foreground">
          Welcome Back!
        </Text>
        <Text className="text-lg mt-3 text-foreground">
          Login to your account to continue using Passbit!
        </Text>
      </View>
      <View className="grid gap-3 px-8 mt-10">
        <Label>Email</Label>
        <Input
          value={email}
          onChangeText={setEmail}
          textContentType="emailAddress"
          placeholder="name@domain.com"
          id="email"
        />
        {error?.email && (
          <Animated.Text className="text-red-400 text-sm">
            {error?.email}
          </Animated.Text>
        )}
        <Label className="mt-2">Password</Label>
        <Input
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
          placeholder="your password"
          id="password"
        />
        {error?.password && (
          <Animated.Text className="text-red-400 text-sm">
            {error?.password}
          </Animated.Text>
        )}
        <Link href="/welcome" className="text-right text-sm text-foreground/70">
          Forgot Password?
        </Link>
      </View>
      <View className="absolute bottom-14 px-8 grid gap-4 w-full">
        <Text className="text-foreground/80 text-center">
          Don't have an account?{" "}
          <Link href="/(auth)/register" className="text-foreground">
            Register!
          </Link>
        </Text>
        <Button
          disabled={loading}
          onPress={handleLogin}
          size="lg"
          className="rounded-full"
        >
          {loading ? (
            <ActivityIndicator className="text-primary-foreground" />
          ) : (
            <Text className="text-primary-foreground">Continue</Text>
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
}
