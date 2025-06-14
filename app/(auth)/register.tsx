import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { loginUser, registerUser } from "~/lib/api";
import { storeData } from "~/lib/storage/fn";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !email.includes("@")) {
      ToastAndroid.show("Email is required!", ToastAndroid.SHORT);
      setError("Email is required!");
      return;
    }
    if (!password) {
      ToastAndroid.show("Password is required!", ToastAndroid.SHORT);
      setError("Password is required!");
      return;
    }
    if (password.length < 8) {
      ToastAndroid.show(
        "Password must be at least 8 characters!",
        ToastAndroid.SHORT,
      );
      setError("Password must be at least 8 characters!");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      ToastAndroid.show(
        "Password must contain at least one uppercase letter!",
        ToastAndroid.SHORT,
      );
      setError("Password must contain at least one uppercase letter!");
      return;
    }
    if (!/[a-z]/.test(password)) {
      ToastAndroid.show(
        "Password must contain at least one lowercase letter!",
        ToastAndroid.SHORT,
      );
      setError("Password must contain at least one lowercase letter!");
      return;
    }
    if (!/[0-9]/.test(password)) {
      ToastAndroid.show(
        "Password must contain at least one number!",
        ToastAndroid.SHORT,
      );
      setError("Password must contain at least one number!");
      return;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      ToastAndroid.show(
        "Password must contain at least one special character!",
        ToastAndroid.SHORT,
      );
      setError("Password must contain at least one special character!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await registerUser(email, password);
      if (res.statusCode === 200) {
        ToastAndroid.show("Sending OTP..", ToastAndroid.SHORT);
        const lgin = await loginUser(email, password);
        console.log(lgin);
        if (!lgin.error) {
          await storeData({ key: "token", value: lgin.token });
          router.push("/verify");
        }
      }
    } catch (error: any) {
      if (error.response.data.statusMessage) {
        ToastAndroid.show("Email Already Exists!", ToastAndroid.SHORT);
        Alert.alert(
          "Email Already Exists!",
          "Please try again with a different email.",
          [{ text: "OK", onPress: () => {} }],
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="h-full py-10 relative">
      <View className="px-8 pt-10">
        <Text className="font-rubik text-3xl font-bold text-foreground">
          Great To Have You!
        </Text>
        <Text className="font-rubik text-lg mt-3 text-foreground">
          Get started by creating your secure account!
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
        <Label className="mt-2">Password</Label>
        <Input
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
          placeholder="your password"
          id="password"
        />
        {error && (
          <Text className="text-red-500 text-sm font-rubik">{error}</Text>
        )}
      </View>
      <View className="absolute bottom-14 px-8 grid gap-4 w-full">
        <Text className="text-foreground/80 text-center font-rubik">
          Already have an account?{" "}
          <Text
            className="text-foreground"
            onPress={() => {
              router.back();
            }}
          >
            Login!
          </Text>
        </Text>
        <Button
          disabled={loading}
          onPress={handleRegister}
          size="lg"
          className="rounded-full"
        >
          {loading ? (
            <ActivityIndicator className="text-primary-foreground" />
          ) : (
            <Text className="text-primary-foreground font-rubik">Continue</Text>
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
}
