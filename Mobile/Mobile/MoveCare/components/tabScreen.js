import React from "react";
import { View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import TrangChuStack from "./TrangChu/TrangChuStack";
import PostStackNavigator from "./BaiViet/Post";
import TaiKhoanStack from "./ThongTin/TaiKhoanStack";
import ChatStack from "./Chat/chatStack";
import GiaoDichStack from "./GiaoDich/GiaoDichStack";

import { ThanhToanMM } from "./TrangChu/ThanhToanMM";

// Thông Báo
import StackThongBao from "./ThongBao/DSThongBao";

const Tab = createBottomTabNavigator();

export default  TabScreen = () => {
  return (
    <Tab.Navigator
    
      initialRouteName="Trang Chủ"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = focused ? "#2baf66" : color; // Màu của icon khi được nhấn

          switch (route.name) {
           
          
            case "Bài Viết": // Bạn có thể loại bỏ một trong hai, nếu chúng có cùng ý nghĩa
              iconName = focused ? "create" : "create-outline";
              break;
            case "Lịch sử":
              iconName = focused ? "reader-outline" : "receipt-outline";
              break;
            case "Trang Chủ":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Đăng Bài":
              iconName = focused ? "create" : "create-outline";
              break;
            case "Thông tin":
              iconName = "person-outline";
              break;
            case "Thông báo":
              iconName = focused
                ? "notifications-circle-outline"
                : "notifications-outline";
              break;
            case "Nhắn tin":
              iconName = focused
                ? "chatbubble-ellipses-outline"
                : "chatbubble-outline";
              break;
            default:
              iconName = ""; // Nếu không có icon nào được thiết lập
              break;
          }

          return <Ionicons name={iconName} size={size} color={iconColor} />;
        },
      })}
    >
      <Tab.Screen
        name="Lịch sử"
        component={GiaoDichStack}
        options={{
          headerLeft: null, // Ngăn chặn nút quay trở lại ở màn hình chính
        }}
      />
 
      <Tab.Screen name="Thông báo" component={StackThongBao} />
      <Tab.Screen
        name="Trang Chủ"
        component={TrangChuStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                borderColor: "#C8FACD",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                top: -15,
                borderWidth: 1,
                paddingVertical: 5,
                paddingHorizontal: 2,
                backgroundColor: focused ? "#2baf66" : "#C8FACD",
              }}
            >
              <Image
                source={require("../assets/favicon-32x32.png")} // Đường dẫn đến hình ảnh
                style={{ width: 37, height: 37 }} // Kích thước của hình ảnh
              />
            </View>
          ),
        }}
      />
      <Tab.Screen name="Bài Viết" component={PostStackNavigator} />
      {/* <Tab.Screen name="Nhắn tin" component={ChatStack} /> */}
      <Tab.Screen name="Thông tin" component={TaiKhoanStack} />
      {/* <Tab.Screen name="Momo" component={ThanhToanMM} /> */}

      
    </Tab.Navigator>
  );
};


