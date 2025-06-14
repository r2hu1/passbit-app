import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logout from "~/components/logout";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { sendVerificationEmail, verifyEmail } from "~/lib/api";
import { storeData } from "~/lib/storage/fn";

export default function Verify() {
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleResendCode = () => {
    sendOtp();
  };
  const sendOtp = async () => {
    try {
      setSending(true);
      const res = await sendVerificationEmail();
      ToastAndroid.show("OTP sent", ToastAndroid.SHORT);
    } catch (error: any) {
      ToastAndroid.show(error.message.data?.statusMessage, ToastAndroid.SHORT);
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async () => {
    if (!code) {
      ToastAndroid.show("Please enter the code", ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    try {
      const res = await verifyEmail(String(code));
      if (res.statusCode == 200) {
        await storeData({ key: "status", value: "verified" });
        router.push("/(root)/home");
      }
    } catch (error: any) {
      // console.log(error);
      Alert.alert("Invalid OTP", error.message.data?.statusMessage);
      ToastAndroid.show("Invalid OTP", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sendOtp();
  }, []);

  return (
    <SafeAreaView className="py-10 relative h-full w-full">
      <View className="mb-8 px-8">
        <Text className="text-3xl font-bold text-foreground">
          Email Verification
        </Text>
        <Text className="text-lg mt-3 text-foreground">
          Enter the otp verification code sent to your email.
        </Text>
      </View>
      <View className="px-8">
        <Input
          value={code}
          onChangeText={setCode}
          textContentType="oneTimeCode"
          placeholder="1 2 3 4 5"
        />
        <View className="flex-row justify-between mt-3">
          <Logout
            className="text-sm text-foreground/90"
            text="Wrong Email? Logout!"
          />
          <Text
            disabled={sending}
            className="text-sm text-foreground/80"
            onPress={handleResendCode}
          >
            {sending ? (
              <ActivityIndicator
                key={Math.random()}
                className="scale-50 text-foreground/80"
              />
            ) : (
              "Resend Code?"
            )}
          </Text>
        </View>
      </View>
      <View className="absolute bottom-14 px-8 w-full">
        <Button
          disabled={loading}
          onPress={handleVerify}
          className="w-full rounded-full"
          size={"lg"}
        >
          {loading ? (
            <ActivityIndicator
              key={Math.random()}
              className="text-foreground"
            />
          ) : (
            <Text>Verify</Text>
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
}
