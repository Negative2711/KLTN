import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import TrangChu from "../screens/TrangChu";
import DangNhap from "../screens/DangNhap";
import DangKy from "../screens/DangKy";
import OTP from "../screens/OTP";
import Intro from "../screens/Intro"; // Import màn hình chờ

// Navigation routing
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator() 
export default function Routing() {


  return (
    <NavigationContainer>
      <Tab.Navigator 
        tabBar={ () => null } // Ẩn nút điều hướng của các tab
       backBehavior="none" // Tắt chức năng quay lại
       initialRouteName="SplashScreen" // Đặt màn hình khởi đầu là SplashScreen
       >
       

      <Stack.Screen
          name="SplashScreen" // Đổi tên màn hình khởi đầu thành SplashScreen
          component={Intro} // Sử dụng SplashScreen làm màn hình khởi đầu
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DangNhap"
          component={DangNhap}
          options={{ headerShown: false , headerLeft: null}}
        />
        <Stack.Screen
          name="DangKy"
          component={DangKy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TrangChu"
          component={TrangChu}
          options={{ headerShown: false, headerLeft: null  }}
         
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{ headerShown: true }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
