import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";
import { PRIMARY } from '../../assets/style/style-global';
import { createStackNavigator } from "@react-navigation/stack";

// Bai Thuê việc
import BaiThueS from './BaiThue/BaiThueS'
import BaiThueMoi from './BaiThue/BaiThueMoi'
import ChiTietBaiDang from "./BaiThue/ChiTietBaiThue";

// Bài tìm việc
import BaiTimViecS from './BaiTimViec/BaiTimViecS';
import BaiTimViecMoi from './BaiTimViec/BaiTimViecMoi';
import ChiTietBaiTimViec from './BaiTimViec/ChiTietBaiTimViec';

//Giao dich
import GiaoDich from '../TrangChu/GiaoDich';


const Post = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chọn loại bài viết bạn muốn xem?</Text>
      <View style={styles.contentContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>{
            navigation.navigate("List")
          }}>
            <Ionicons name="person" size={24} color="black" />
            <Text style={styles.buttonText}>Thuê  giúp việc</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
          onPress={()=>{navigation.navigate("BaiTimViecS")}}>
            <Ionicons name="briefcase" size={24} color="black" />
            <Text style={styles.buttonText}>Tìm việc làm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Đặt 'flex-start' để tiêu đề nằm ở trên cùng
    alignItems: 'center',
    backgroundColor: 'white',
  
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center', // Đảm bảo nút nằm ở giữa
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Đảm bảo nút nằm ở giữa
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderWidth:1,
   
    borderColor: PRIMARY.main,
    borderRadius: 10,
  },
  buttonText: {
    marginLeft: 10,
  },
});



const Stack = createStackNavigator();
const PostStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Post">

      {/* Root Stack */}
      <Stack.Screen name="Post" component={Post} options={{headerShown:false, headerTitle:""}}/>
      {/* Bài Thuê */}
      <Stack.Screen name="List" component={BaiThueS} options={{headerShown:true, headerTitle:""}}/>
      <Stack.Screen name="Detail" component={ChiTietBaiDang} options={{headerTitle: ''}} />
      <Stack.Screen name="Create" component={BaiThueMoi} options={{headerTitle: ''}} />
      {/* Bài tìm việc */}
      <Stack.Screen name="BaiTimViecS" component={BaiTimViecS} options={{headerTitle: ''}} />
      <Stack.Screen name="BaiTimViecMoi" component={BaiTimViecMoi} options={{headerTitle: ''}} />
      <Stack.Screen name="BaiTimViecDetail" component={ChiTietBaiTimViec} options={{headerTitle: ''}} />
      <Stack.Screen name="GiaoDich" component={GiaoDich} options={{headerTitle: ''}} />




    </Stack.Navigator>
  );
};


export default PostStackNavigator;
