import { View, Text } from "react-native";
import React from "react";
import GiaoDich from "./GiaoDich";
import TrangChuTab from "./TrangChuTab";
import { ThanhToanMM } from "./ThanhToanMM";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function TrangChuStack() {
  return (
    <Stack.Navigator initialRouteName="TrangChu">
      {/* Root Stack */}

      {/* Bài Thuê */}
      <Stack.Screen
        name="TrangChu"
        component={TrangChuTab}
        options={{ headerShown: true, headerTitle: "Trang chủ" }}
      />
      <Stack.Screen
        name="Giao Dịch"
        component={GiaoDich}
        options={{
          headerShown: true,
          headerTitle: "Giao dịch",
          headerBackTitle: "Quay lại",
          headerBackTitleVisible: true,
        }}
        
      />
      <Stack.Screen
        name="Thanh Toán MM"
        component={ThanhToanMM}
        options={{
          headerShown: true,
          headerTitle: "Thanh toán",
          headerBackTitle: "Quay lại",
          headerBackTitleVisible: true,
        }}
        
      />
    </Stack.Navigator>
  );
}
