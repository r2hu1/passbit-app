import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ToastAndroid,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { resetPassword, sendResetPasswordEmail } from "~/lib/api";

export default function Forgot() {
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [code, setCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const sendOtp = async () => {
    try {
      setSending(true);
      const res = await sendResetPasswordEmail(email);
      ToastAndroid.show("OTP sent", ToastAndroid.SHORT);
      setIsOtpSent(true);
    } catch (error: any) {
      ToastAndroid.show(
        error.message.data?.statusMessage || "Account not found",
        ToastAndroid.SHORT,
      );
      Alert.alert(
        "Error",
        error.message.data?.statusMessage || "Account not found",
      );
    } finally {
      setSending(false);
    }
  };

  const savePassword = async () => {
    if (!code) {
      ToastAndroid.show("OTP is required!", ToastAndroid.SHORT);
      setError("OTP is required!");
      return;
    }
    if (!newPassword) {
      ToastAndroid.show("Password is required!", ToastAndroid.SHORT);
      setError("Password is required!");
      return;
    }
    if (newPassword.length < 8) {
      ToastAndroid.show(
        "Password must be at least 8 characters!",
        ToastAndroid.SHORT,
      );
      setError("Password must be at least 8 characters!");
      return;
    }
    if (!/[A-Z]/.test(newPassword)) {
      ToastAndroid.show(
        "Password must contain at least one uppercase letter!",
        ToastAndroid.SHORT,
      );
      setError("Password must contain at least one uppercase letter!");
      return;
    }
    if (!/[a-z]/.test(newPassword)) {
      ToastAndroid.show(
        "Password must contain at least one lowercase letter!",
        ToastAndroid.SHORT,
      );
      setError("Password must contain at least one lowercase letter!");
      return;
    }
    if (!/[0-9]/.test(newPassword)) {
      ToastAndroid.show(
        "Password must contain at least one number!",
        ToastAndroid.SHORT,
      );
      setError("Password must contain at least one number!");
      return;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) {
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
      const otp = code;
      const res = await resetPassword(email, otp, newPassword);
      ToastAndroid.show("Password reset successful!", ToastAndroid.SHORT);
      Alert.alert("Success", "Password reset successful!", [
        {
          text: "OK",
          onPress: () => {
            router.back();
          },
        },
      ]);
    } catch (error: any) {
      console.log(error);
      ToastAndroid.show("Invalid or Expired OTP", ToastAndroid.SHORT);
      Alert.alert("Error", "Invalid or Expired OTP", [
        { text: "OK", onPress: () => {} },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="py-10 relative h-full w-full">
      {!isOtpSent ? (
        <View className="mb-8 px-8">
          <Text className="text-3xl font-rubik-bold text-foreground">
            Verify Your Email
          </Text>
          <Text className="text-lg mt-3 font-rubik text-foreground">
            To ensure it is you, we will send you a one time password to your
            email.
          </Text>
        </View>
      ) : (
        <View className="mb-8 px-8">
          <Text className="text-3xl font-rubik-bold text-foreground">
            Reset Password
          </Text>
          <Text className="text-lg mt-3 font-rubik text-foreground">
            Enter otp send to your email. and create your new strong password!
          </Text>
        </View>
      )}
      {!isOtpSent ? (
        <View className="grid gap-3 px-8">
          <Label>Email</Label>
          <View className="flex flex-col !w-full gap-3">
            <Input
              value={email}
              onChangeText={setEmail}
              textContentType="emailAddress"
              placeholder="name@domain.com"
            />
          </View>
        </View>
      ) : (
        <View className="grid gap-3 px-8">
          <Label>OTP</Label>
          <Input
            value={code}
            onChangeText={setCode}
            textContentType="oneTimeCode"
            placeholder="123456"
          />
          <Label className="mt-2">New Password</Label>
          <Input
            value={newPassword}
            onChangeText={setNewPassword}
            textContentType="newPassword"
            placeholder="New Password"
          />
          {error && <Text className="text-red-500">{error}</Text>}
        </View>
      )}
      <View className="absolute bottom-14 px-8 w-full">
        {!isOtpSent ? (
          <Button
            disabled={sending}
            onPress={sendOtp}
            className="w-full rounded-full"
            size={"lg"}
          >
            {sending ? (
              <ActivityIndicator
                key={Math.random()}
                className="text-foreground"
              />
            ) : (
              <Text className="font-rubik">Send</Text>
            )}
          </Button>
        ) : (
          <Button
            disabled={loading}
            onPress={savePassword}
            className="w-full rounded-full"
            size={"lg"}
          >
            {loading ? (
              <ActivityIndicator
                key={Math.random()}
                className="text-foreground"
              />
            ) : (
              <Text className="font-rubik">Reset Password</Text>
            )}
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
}
