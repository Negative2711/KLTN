import AsyncStorage from '@react-native-async-storage/async-storage';



// Lưu dữ liệu vào AsyncStorage
export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log('Dữ liệu đã được lưu thành công!');
  } catch (error) {
    console.log('Lỗi khi lưu dữ liệu: ', error);
  }
};

// Lấy dữ liệu từ AsyncStorage
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      console.log('Không tìm thấy dữ liệu cho khóa: ', key);
      return null;
    }
  } catch (error) {
    console.log('Lỗi khi lấy dữ liệu: ', error);
    return null;
  }
};

// Xóa dữ liệu từ AsyncStorage
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Dữ liệu đã được xóa thành công!');
  } catch (error) {
    console.log('Lỗi khi xóa dữ liệu: ', error);
  }
};

// Xóa toàn bộ dữ liệu từ AsyncStorage
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Tất cả dữ liệu đã được xóa thành công!');
  } catch (error) {
    console.log('Lỗi khi xóa tất cả dữ liệu: ', error);
  }
};
