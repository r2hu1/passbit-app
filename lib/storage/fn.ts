import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e: any) {
    return e.message;
  }
};

export const getData = async ({ key }: { key: string }) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e: any) {
    return e.message;
  }
};

export const removeData = async ({ key }: { key: string }) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e: any) {
    return e.message;
  }
};
