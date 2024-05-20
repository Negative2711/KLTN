import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { getData } from '../../helper/StoregeHelper';
import axios from 'axios';
import { API_ROOT } from '../../config-global';
import { Cloudinary } from 'cloudinary-core';

const API_CURRENT_USER = API_ROOT + 'auth/khachhang/info/';
const API_UPDATE_USER = API_ROOT + 'auth/khachhang/update-auth/';

// Khởi tạo Cloudinary với thông tin của bạn
const cloudinary = new Cloudinary({ cloud_name: 'dtwy0ch1a', secure: true });

const ThongTinTaiKhoan = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [avatarSource, setAvatarSource] = useState();
  const [hoTen, setHoTen] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');
  const [diaChi, setDiaChi] = useState('');

  const fetchData = useCallback(async () => {
    const token = await getData("TOKEN");
    console.log("Token từ bro file: " + token);
    if (token !== null) {
      await autoLogin(token);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation, fetchData]);

  const autoLogin = async (token) => {
    try {
      const response = await axios.get(API_CURRENT_USER, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = response.data.data;
      setCurrentUser(userData);
      setAvatarSource(userData.anh_dai_dien);
      setHoTen(userData.ho_ten);
      setSoDienThoai(userData.phone_number);
      setDiaChi(userData.dia_chi);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Quyền truy cập thư viện ảnh bị từ chối');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { assets } = result;
      if (assets && assets.length > 0) {
        const imageUri = assets[0].uri;
        await uploadImageToCloudinary(imageUri);
      }
    }
  };

  const uploadImageToCloudinary = async (imageUri) => {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg'
    });
    formData.append('upload_preset', 'ml_default'); // Thay 'your_upload_preset' bằng upload preset của bạn

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dtwy0ch1a/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const imageUrl = response.data.secure_url;
      setAvatarSource(imageUrl);
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi trong quá trình upload ảnh.');
    }
  };

  const updateUserInfo = async () => {
    const token = await getData("TOKEN");
    if (!token) {
      Alert.alert('Lỗi', 'Không tìm thấy token. Vui lòng đăng nhập lại.');
      return;
    }

    try {
      const response = await axios.put(API_UPDATE_USER, {
        ho_ten: hoTen,
        dia_chi: diaChi,
        anh_dai_dien_url: avatarSource,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        Alert.alert('Thành công', 'Thông tin đã được cập nhật');
        fetchData();
      } else {
        Alert.alert('Lỗi', 'Cập nhật thông tin thất bại. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi trong quá trình cập nhật thông tin.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ height: 900 }}>
          <View style={styles.form}>
            <TouchableOpacity onPress={pickImage}>
              {avatarSource ? (
                <Image source={{ uri: avatarSource }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <AntDesign name="user" size={40} color="gray" />
                  <Text>Chọn ảnh</Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Họ và tên"
                value={hoTen}
                onChangeText={text => setHoTen(text)}
              />
              <AntDesign name="user" size={30} color="gray" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={soDienThoai}
                onChangeText={text => setSoDienThoai(text)}
                editable={false} 
              />
              <AntDesign name="phone" size={30} color="gray" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Địa chỉ"
                value={diaChi}
                onChangeText={text => setDiaChi(text)}
              />
              <Feather name="map-pin" size={30} color="gray" style={styles.icon} />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={updateUserInfo}>
                <Text style={styles.buttonText}>Chỉnh sửa thông tin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  form: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    height: 60,
    width: "80%",
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    paddingLeft: 10,
    fontSize: 20,
    width: "85%",
  },
  icon: {
    width: "15%",
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2baf66",
    height: 60,
    width: "37%",
    marginLeft: "10%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginRight: 10,
  },
  editButton: {
    alignItems: 'center',
  },
  editButtonText: {
    color: "#2baf66",
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});

export default ThongTinTaiKhoan;
