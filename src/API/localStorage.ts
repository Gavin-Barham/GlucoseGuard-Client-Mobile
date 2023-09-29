import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(
      key,
      value,
    );
  } catch (error: any) {
      throw new Error(`Could not retrieve data, ERROR:${error.message}`);
  }
};

const retrieveData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value
    }
    throw new Error(`No value for key ${key}`);
  } catch (error) {
    throw new Error('Could not retrieve data')
  }
};

export { storeData, retrieveData };