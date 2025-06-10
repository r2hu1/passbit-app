import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async ({
  key,
  value,
}: {
  key: string;
  value: any;
}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e: any) {
    return e.message;
  }
};

export const getData = async ({ key }: { key: string }) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e: any) {
    return e.message;
  }
};

export const removeValue = async ({ key }: { key: string }) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e: any) {
    return e.message;
  }
};
