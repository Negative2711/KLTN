import React from "react";

import { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
//config
import { API_ROOT } from "../../../config-global";
//axios
import axios from "axios";
import { PRIMARY } from "../../../assets/style/style-global";

export default ChiTietBaiTimViec = ({ route,navigation }) => {
  // Lấy dữ liệu bài đăng từ route
  const { idpost } = route.params;

  const API_CHI_TIET = API_ROOT + `rental/post/detail/${idpost}/`;
  const [post, setPost] = useState();

  useEffect(() => {
    const getDetailPost = async () => {
      try {
        const response = await axios.get(API_CHI_TIET);
        setPost(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetailPost();
  }, []);

  const handleRental = ()=>{
    var item = {
      name: "Thuê từ bài tìm việc",
      price : post.price
    }
    navigation.navigate("GiaoDich",{item : item})
   
}

  return (
    post ?  <ScrollView style={styles.container}>
 
    <View
      key={post.id}
      style={{
        padding: 15,
      
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        margin: 5,
      }}
    >
      <View style={{}}>
      <Image
        source={{ uri: post.khach_hang_id.anh_dai_dien }}
        style={styles.avatar}
      />
      </View>
      <View style={{ flex: 1, marginRight: 10 }}>
        <Text
          style={{ color: PRIMARY.main, fontSize: 20, fontWeight: "bold" }}
        >
          {post.tieu_de}
        </Text>
        <View
          style={{ height: 1, backgroundColor: "black", marginBottom: 5 }}
        />
        <Text style={styles.title}>
          Người đăng: {post.khach_hang_id.ho_ten}
        </Text>
        <Text style={styles.description}>Mô tả: {post.mo_ta_ngan}</Text>
    
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Text style={styles.label}>Giá:</Text>
          <Text>{post.gia}  đ</Text>
        </View>
        <View>
          <Text>Trạng thái: {post.da_duyet ? "Được duyệt": "Chưa được duyệt"} </Text>
        </View>
        


        <TouchableOpacity
          style={{
            backgroundColor: "#2baf66",
            height: 60,
            width: "80%",
            marginLeft: "10%",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 50,
            marginTop:30
          }}
          onPress={handleRental}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontWeight: "bold",
            }}
          >
           Thuê người này
          </Text>
        </TouchableOpacity>
      
      </View>
    </View>
    
  </ScrollView> : null
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
   
   
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: "50%",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  salary: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  avatar: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginRight: 10,
    borderRadius: 60 // Sửa thành số
  },
});
