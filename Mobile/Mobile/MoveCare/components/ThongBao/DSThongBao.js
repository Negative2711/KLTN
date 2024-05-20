import {useState,useEffect,useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { getData } from "../../helper/StoregeHelper";

import axios from "axios";



import { API_ROOT } from "../../config-global";

const API_NOTI= API_ROOT + "notication/notis/byUser/b7e5d5cd7d6c4a11a646252acb0a5550/"

import ChiTietTB from "./ChiTietTB";
import { PRIMARY } from "../../assets/style/style-global";


const DSThongBao = ({navigation}) => {
  const [notifications, setNotifications] = useState([

  ]);

  const getAllNoti = useCallback(async () => {
    try {
      const response = await axios.get(API_NOTI);
      const data = response.data.data;
      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
  }, []);


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllNoti();
    });

    return unsubscribe;
  }, [navigation, getAllNoti]);



 

  const handleDetail = (id) => {
    console.log("Da click vao bai post co id " + id);
    navigation.navigate("ChiTietTB", { idpost: id }); // Navigate đến màn hình ScreenB trong cùng một Stack Navigator
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Danh sách thông báo</Text>
      <ScrollView>
        {notifications.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.notificationItem,
              { backgroundColor: item.read ? "#e0e0e0" : "#ffffff" },
            ]}
            onPress={() => handleDetail(item.id)}
          >
            <Text style={styles.notificationTitle}>Tiêu đề: {item.tieu_de}</Text>
            <Text style={styles.notificationDescription}>Nội dung: {item.mota_ngan}</Text>
            <Text style={styles.notificationDescription}>Trạng thái:  {item.da_doc ? "Đã đọc" :"Chưa đọc" }</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const Stack = createStackNavigator();
const StackThongBao = () => {
  return (
    <Stack.Navigator initialRouteName="DSThongBao">
      <Stack.Screen name="DSThongBao" component={DSThongBao}   options={{headerTitle: 'Thông báo', headerShown: false }} />
      <Stack.Screen name="ChiTietTB" component={ChiTietTB}  options={{headerTitle: ''}}  />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign:"center"
  },
  notificationItem: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: PRIMARY.main,
    marginHorizontal:5
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  notificationDescription: {
    fontSize: 14,
  },
});

export default StackThongBao;
