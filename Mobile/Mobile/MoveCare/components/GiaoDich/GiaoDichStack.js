import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'
import GiaoDichS from './GiaoDichS'
import ChiTietGiaoDich from './ChiTietGiaoDich'
import { createStackNavigator } from "@react-navigation/stack";



const Stack = createStackNavigator();

export default function GiaoDichStack() {


  return (
    <Stack.Navigator initialRouteName="DSGiaoDich">
      <Stack.Screen name="DSGiaoDich" component={GiaoDichS}   options={{headerTitle: 'Tất cả giao dịch', headerShown: false }} />
      <Stack.Screen name="ChiTietGiaoDich" component={ChiTietGiaoDich}  options={{headerTitle: ''}}  />
    </Stack.Navigator>
  );
};