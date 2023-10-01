import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: any) => {
  if (typeof(value) !== "string") {
    value = JSON.stringify(value);
  }
  if (key === undefined || value === undefined) {
    return;
  }
  try {
    await AsyncStorage.setItem(
      key,
      value,
    );
  } catch (error: any) {
      throw new Error(`Could not retrieve data, ERROR:${error.message}`);
  }
};

const retrieveData = async (key: string, isJson: Boolean = false) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      if (isJson) {
        return JSON.parse(value);
      }
      return value
    }
    return undefined;
  } catch (error) {
    throw new Error('Could not retrieve data')
  }
};

export { storeData, retrieveData };