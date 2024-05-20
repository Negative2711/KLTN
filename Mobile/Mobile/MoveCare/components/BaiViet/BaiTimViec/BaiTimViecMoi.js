import React, { useState } from "react";
import { View,Text, TextInput, Button, Alert, StyleSheet,TouchableOpacity } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { getData } from "../../../helper/StoregeHelper";

//config
import { API_ROOT } from "../../../config-global";

const API_CREATE_POST = API_ROOT + "booking/post/create/";



export default BaiTimViecMoi = () => {
  const [tieuDe, setTieuDe] = useState("");
  const [chiTiet, setChiTiet] = useState("");
  const [thoiGian, setThoiGian] = useState(new Date());
  const [gia, setGia] = useState("");
  const [moTaNgan, setMoTaNgan] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(true);
 
  const handleCreatePost = async () => {
    const id = await getData("ID");
    console.log(id);
  
    try {
      const response = await axios.post(API_CREATE_POST, {
        khach_hang_id: id,
        tieu_de: tieuDe,
        chi_tiet: chiTiet,
        thoi_gian: "2024-04-20",//thoiGian.toISOString().split("T")[0], // Chuyển đổi ngày thành chuỗi yyyy-mm-dd
        gia: gia,
        mo_ta_ngan: moTaNgan,
      });
      Alert.alert("Success", "Bài post đã được tạo thành công");
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Đã có lỗi xảy ra khi tạo bài post");
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || thoiGian;
    setShowDatePicker(true);
    setThoiGian(currentDate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tiêu đề"
        onChangeText={(text) => setTieuDe(text)}
        value={tieuDe}
      />
         <TextInput
        style={styles.input}
        placeholder="Mô tả ngắn"
        onChangeText={(text) => setMoTaNgan(text)}
        value={moTaNgan}
      />
      <TextInput
        style={styles.input}
        placeholder="Chi tiết"
        onChangeText={(text) => setChiTiet(text)}
        value={chiTiet}
      />
      <View style={styles.datePickerContainer}>
        <Button title="Chọn ngày" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          // <DateTimePicker
          //   testID="dateTimePicker"
          //   value={thoiGian}
          //   mode="date"
          //   is24Hour={true}
          //   display="default"
          //   onChange={onChangeDate}
          // />
          <View/>
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Giá mong muốn"
        onChangeText={(text) => setGia(text)}
        value={gia}
        keyboardType="numeric"
      />
   
     
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
          }}
          onPress={handleCreatePost}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontWeight: "bold",
              marginTop:20
            }}
          >
            Đăng bài
          </Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  datePickerContainer: {
    alignItems: "center", // căn giữa theo chiều ngang
  },

});

