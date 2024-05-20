import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";
import { getData } from "../../../helper/StoregeHelper";

import { Calendar, LocaleConfig } from "react-native-calendars";
import { format } from "date-fns";

import Icon from "react-native-vector-icons/FontAwesome5";

//config
import { API_ROOT } from "../../../config-global";

const API_CREATE_POST = API_ROOT + "booking/post/create/";
LocaleConfig.locales["vi"] = {
  monthNames: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
  monthNamesShort: [
    "Th01",
    "Th02",
    "Th03",
    "Th04",
    "Th05",
    "Th06",
    "Th07",
    "Th08",
    "Th09",
    "Th10",
    "Th11",
    "Th12",
  ],
  dayNames: [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
};
LocaleConfig.defaultLocale = "vi";

const BaiThueMoi = () => {
  const [tieuDe, setTieuDe] = useState("");
  const [chiTiet, setChiTiet] = useState("");
  const [thoiGian, setThoiGian] = useState(new Date());
  const [gia, setGia] = useState("");
  const [moTaNgan, setMoTaNgan] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // lấy giá trị địa chỉ
  const [text, setText] = useState("");

  // chọn ngày tháng và thể hiện ngày tháng

  const today = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(today);

  const [textInputValue, setTextInputValue] = useState(today);

  const hideDatePicker = () => {
    setModalVisible(false);
  };

  const showDatePicker = () => {
    setModalVisible(true);
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setTextInputValue(day.dateString);
    hideDatePicker();
  };

  // Hàm để chuyển đổi định dạng ngày
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  // chọn và tính tổng số giờ chọn để tính tiền
  const [startHour, setStartHour] = useState(6);
  const [endHour, setEndHour] = useState(7);
  const [totalHours, setTotalHours] = useState(0);

  const handleCreatePost = async () => {
    const id = await getData("ID");
    console.log(id);

    try {
      const response = await axios.post(API_CREATE_POST, {
        khach_hang_id: id,
        tieu_de: tieuDe,
        chi_tiet: chiTiet,
        thoi_gian: "2024-04-20", //thoiGian.toISOString().split("T")[0], // Chuyển đổi ngày thành chuỗi yyyy-mm-dd
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
        style={styles.inputText}
        placeholder="Tiêu đề"
        onChangeText={(text) => setTieuDe(text)}
        value={tieuDe}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Mô tả ngắn"
        onChangeText={(text) => setMoTaNgan(text)}
        value={moTaNgan}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Chi tiết"
        onChangeText={(text) => setChiTiet(text)}
        value={chiTiet}
      />

      <View
        style={{
          paddingLeft: "5%",
          paddingTop: 20,
          paddingBottom: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Icon name="calendar-alt" size={20} color="black" />
        <Text style={{ fontWeight: "bold", fontSize: 15, paddingLeft: 5 }}>
          Ngày làm việc
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={showDatePicker}
          style={styles.inputText}
        >
          <Text>{formatDate(textInputValue) || "Chọn ngày"}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={hideDatePicker}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Calendar
                onDayPress={onDayPress}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: "blue" },
                }}
              />
              <Button title="Đóng" onPress={hideDatePicker} />
            </View>
          </View>
        </Modal>
      </View>

      <TextInput
        style={styles.inputText}
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
          marginVertical:30
        }}
        onPress={handleCreatePost}
      >
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "bold",
           
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
    margin:3
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
  inputText: {
    borderWidth: 1,
    padding: 10,
    borderColor: "gray",
    width: "95%",
    marginLeft: "5%",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    marginVertical:5
  },
});

export default BaiThueMoi;
