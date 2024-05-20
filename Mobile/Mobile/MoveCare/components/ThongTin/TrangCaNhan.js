import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { hotNumber, API_ROOT } from "../../config-global";
import { getData } from "../../helper/StoregeHelper";

import { useSelector, useDispatch } from 'react-redux';


const API_CURRENT_USER = API_ROOT + 'auth/khachhang/info/';

const TrangCaNhan = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  console.log("reudex"+ user.ho_ten)


  const appVersion = "1.0.0";
  const [currentUser, setCurrentUser] = useState(null);

  const fetchData = useCallback(async () => {
    const token = await getData("TOKEN");
    console.log("token từ bro file " + token);
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
      const response = await axios.get(
        API_CURRENT_USER,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log('Data removed successfully');
      return true;
    } catch (error) {
      console.log('Error removing data: ', error);
      return false;
    }
  };

  const handleLogout = async () => {
    navigation.navigate("DangNhap");
    await removeData("TOKEN");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: currentUser ?currentUser.anh_dai_dien: null}}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{currentUser ? currentUser.ho_ten : "Loading"}</Text>
          <Text style={styles.customerType}>Mã Kh: {currentUser ? currentUser.ma_khach_hang : "Loading"}</Text>
          <Text style={styles.customerType}>Vai trò của bạn: {currentUser?.is_staff ? "Người lao động": "Khách hàng" }</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("ThongTinTaiKhoan")} style={styles.menuItem}>
        <Text style={styles.menuItemText}>Thông tin</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("DoiMatKhau")} style={styles.menuItem}>
        <Text style={styles.menuItemText}>Đổi mật khẩu</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <MenuItem text="Cam kết của MOVE CARE" />
        <MenuItem text="Điều khoản và dịch vụ sử dụng" />
        <MenuItem text="Ghé thăm website" />
        <MenuItem text={`Liên hệ: ${hotNumber}`} />
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Đăng Xuất</Text>
      </TouchableOpacity>

      <View style={styles.appVersionContainer}>
        <Text style={styles.appVersion}>Phiên bản: {appVersion}</Text>
      </View>
    </SafeAreaView>
  );
};

const MenuItem = ({ text }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuItemText}>{text}</Text>
    <Image source={require("../../assets/icon.png")} style={styles.arrowIcon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 25,
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  customerType: {
    fontSize: 16,
    marginTop: 5,
  },
  menuItem: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  menuItemText: {
    fontSize: 16,
    flex: 1,
  },
  footer: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "lightgray",
    paddingVertical: 10,
  },
  logoutButton: {
    margin: 10,
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,

    position: "absolute",
    bottom: 35,

    alignContent: "center",
    
  },
  logoutButtonText: {
    fontSize: 16,
    color: "white",
  },
  appVersionContainer: {
    position: "absolute",
    bottom: 20,
  },
  appVersion: {
    fontSize: 12,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
});

export default TrangCaNhan;
