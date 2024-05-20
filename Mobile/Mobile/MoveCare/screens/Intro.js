import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";

import { appName } from "../config-global";

const Intro = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
       navigation.navigate("DangNhap");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{appName}</Text>
        <View style={styles.wrap}>
        <Image
          source={require("../assets/icon-main.png")} // Đường dẫn đến hình ảnh
          style={styles.logo} // Kích thước của hình ảnh
        />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2baf66",
   
  },
  content: {
    alignItems: "center",
    // backgroundColor: PRIMARY.light,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: "#fff", // Màu sắc của tiêu đề
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    marginBottom:100
  },
  wrap:{
    borderColor: '#333',
    borderWidth: 1,
    marginBottom:100,
    border: '50px solid',
    borderRadius:75,
    backgroundColor:"#fff"

  } ,
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
   

    


    // Đảm bảo hình ảnh là hình tròn
  },
});

export default Intro;
