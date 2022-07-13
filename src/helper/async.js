import AsyncStorage from '@react-native-community/async-storage';
import { asyncKeys } from '../constant/keys';

/** Async-Storage Methods */
class AsyncHelper {
  async setAsyncValues(key, item) {
    return await AsyncStorage.setItem(key, item);
  }
  async getAsyncValues(key) {
    return await AsyncStorage.getItem(key);
  }
  async removeAsyncValues(key) {
    return await AsyncStorage.removeItem(key);
  }
  async removeAllValues() {
    return AsyncStorage.getAllKeys((err, keys) => {
      keys.forEach(key => {
        AsyncStorage.removeItem(key);
      });
    });
  }
  async removeLogoutValues() {
    AsyncStorage.getAllKeys((err, keys) => {
      keys.forEach(key => {
        if (key !== asyncKeys.REMEMBER_ME && key !== asyncKeys.IS_INTRO) {
          AsyncStorage.removeItem(key);
        }
      });
    });
  }
}

const asyncHelper = new AsyncHelper();
Object.freeze(asyncHelper);
export default asyncHelper;
