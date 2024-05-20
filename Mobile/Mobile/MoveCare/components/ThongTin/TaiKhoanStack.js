import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

// child components
import TrangCaNhan from './TrangCaNhan';
import ThongTinTaiKhoan from './ThongTinTaiKhoan';
import DoiMatKhau from './DoiMatKhau';

const Stack = createStackNavigator();


export default function TaiKhoanStack() {
  return (
    <Stack.Navigator initialRouteName="Home">

   
    <Stack.Screen name="Home" component={TrangCaNhan} options={{headerShown:false, headerTitle:""}}/>
  
    <Stack.Screen name="ThongTinTaiKhoan" component={ThongTinTaiKhoan} options={{headerTitle: ''}} />
    <Stack.Screen name="DoiMatKhau" component={DoiMatKhau} options={{headerTitle: 'Đổi mật khẩu'}} />

  </Stack.Navigator>
  )
}