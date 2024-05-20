import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";
import { format } from "date-fns";

import Icon from "react-native-vector-icons/FontAwesome5";
import { API_ROOT } from "../../config-global";
import { getData } from "../../helper/StoregeHelper";
//axios
import axios from "axios";
import ModelMessage from "../../helper/ModelMessage";
import { PRIMARY } from "../../assets/style/style-global";


const API_DICHVU_ADD = API_ROOT + "transaction/giaodich/create/"

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

export default function GiaoDich({ route,navigation }) {
  const { item } = route.params;


  // Model

  const [showModal, setShowModal] = useState(false);
  const [message,setMessage] = useState("")

  const openModal = () => {
    setShowModal(true);
    setMessage("Halilu xa")
  };

  const closeModal = () => {
    setShowModal(false);
  };


  // lấy giá trị địa chỉ
  const [text, setText] = useState("");

  // chọn ngày tháng và thể hiện ngày tháng
  const [modalVisible, setModalVisible] = useState(false);

  const today = format(new Date(), "yyyy-MM-dd");
  const [selectedDate, setSelectedDate] = useState(today);

  const [textInputValue, setTextInputValue] = useState(today);

  const showDatePicker = () => {
    setModalVisible(true);
  };

  const hideDatePicker = () => {
    setModalVisible(false);
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

  const hours1 = Array.from({ length: 16 }, (_, i) => `${i + 6}:00`);
  const hours2 = Array.from({ length: 16 }, (_, i) => `${i + 7}:00`);

  const handleStartHourChange = (hour) => {
    setStartHour(hour);
    if (hour >= endHour) {
      setEndHour(hour + 1);
    }
  };

  const handleEndHourChange = (hour) => {
    setEndHour(hour);
    if (hour <= startHour) {
      setStartHour(hour - 1);
    }
  };
  // Hàm lấy tổng số giờ trong 1 ngày
  useEffect(() => {
    const calculateTotalHours = () => {
      // Tính toán tổng số giờ
      const total = endHour - startHour;
      setTotalHours(total);
      console.log("Tổng số giờ:", total); // In tổng số giờ ra console
    };

    calculateTotalHours();
  }, [startHour, endHour]);

  // testarea
  const [textarea, setTextArea] = useState("");
  // Định nghĩa hàm để in giá trị của TextInput ra console
  const logTextAreaValue = (text) => {
    console.log("Giá trị của TextInput ghi chú:", text);
    // Cập nhật giá trị của TextInput
    setTextArea(text);
  };

  // Tạo trạng thái để theo dõi nút nào được chọn
  const [selectedButton, setSelectedButton] = useState(null);

  // Hàm xử lý sự kiện khi một nút được nhấn
  const handlePress = (buttonName) => {
    setSelectedButton(buttonName); // Cập nhật trạng thái với nút được chọn
  };

  // Hàm tính tổng tiền
  const calculateTotalCost = (unitPrice, hours) => {
    // Tính tổng tiền
    const totalCost = unitPrice * hours;
    return totalCost;
  };

 
 

  const unitPrice = 100000; // Đơn giá
  const hours = calculateTotalCost; // Số giờ
  const totalCost = calculateTotalCost(unitPrice, totalHours);
  console.log("Tổng tiền:", totalCost);

  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    let valid = true;
    let tempErrors = {};

    if (!text) {
      tempErrors.text = "Địa chỉ làm việc là bắt buộc";
      valid = false;
    }

    if (!selectedDate) {
      tempErrors.selectedDate = "Ngày làm việc là bắt buộc";
      valid = false;
    }

    if (totalHours <= 0) {
      tempErrors.totalHours = "Thời gian làm việc phải lớn hơn 0";
      valid = false;
    }

    if (!selectedButton) {
      tempErrors.paymentMethod = "Hình thức thanh toán là bắt buộc";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };



  const handleDatDichVu = async () => {

   if (selectedButton === "Chuyen")
     navigation.navigate('Thanh Toán MM',{})
   else{

   

    const id = await getData("ID");
    console.log(id);

    try {
      const response = await axios.post(API_DICHVU_ADD, {
        khach_hang_thue: id,
        thoi_gian_lam_viec: selectedDate,
        gia_tri: totalCost,
        ghi_chu:textarea ,
        dia_chi_lam_viec:text,
       
      });
      Alert.alert("Success", "Bài post đã được tạo thành công");
    } catch (error) {
  
    }
    setShowModal(true);
    setMessage("Đặt dịch vụ thành công bạn có thể theo dõi đơn hàng tại phần Lịch sử")
  }};

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", backgroundColor: "white" }}>
        <View style={{ width: "100%", marginLeft: "5%", marginVertical: 6 }}>
          <Text style={{ fontSize: 25 }}>Dùng lẻ</Text>
        </View>
        <View style={{ width: "100%", marginLeft: "5%" }}>
          <Text style={{ fontSize: 25 }}>Loại dịch vụ: {item.name}</Text>
        </View>
        <View style={{ width: "100%", marginLeft: "5%", marginVertical: 6 }}>
          <Text style={{ fontSize: 25 }}>Đơn Giá: {item.price}</Text>
        </View>
        <View
          style={{
            height: 700,
            width: "90%",
            marginLeft: "5%",
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 5,
          }}
        >
          <View
            style={{
              paddingLeft: "5%",
              paddingTop: 20,
              paddingBottom: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon name="map-marker-alt" size={20} color="black" />
            <Text style={{ fontWeight: "bold", fontSize: 15, paddingLeft: 5 }}>
              Địa chỉ làm việc
            </Text>
          </View>
          <TextInput
            style={{
              height: 50,
              width: "90%",
              borderColor: "gray",
              borderWidth: 1,
              marginLeft: "5%",
              paddingLeft: 10,
              borderRadius: 5,
            }}
            onChangeText={(text) => {
              console.log("Giá trị của TextInput:", text);
              setText(text); // Cập nhật giá trị của TextInput vào state
            }}
            placeholder="Nhập địa chỉ"
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
              Lịch làm việc
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={showDatePicker}
              style={{
                borderWidth: 1,
                padding: 10,
                borderColor: "gray",
                width: "90%",
                marginLeft: "5%",
                borderRadius: 5,
                height: 50,
                justifyContent: "center",
              }}
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
          <View
            style={{
              paddingLeft: "5%",
              paddingTop: 20,
              paddingBottom: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon name="clock" size={20} color="black" />
            <Text style={{ fontWeight: "bold", fontSize: 15, paddingLeft: 5 }}>
              Thời gian làm việc
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              height: 50,
              marginLeft: "5%",
              width: "90%",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "47%",
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <Picker
                selectedValue={startHour}
                onValueChange={handleStartHourChange}
                style={{ width: 125 }}
              >
                {hours1.map((hour) => (
                  <Picker.Item
                    key={hour}
                    label={`${hour}`}
                    value={parseInt(hour)}
                  />
                ))}
              </Picker>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "6%",
                height: 50,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 15, paddingLeft: 5 }}
              >
                -
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "47%",
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              <Picker
                selectedValue={endHour}
                onValueChange={handleEndHourChange}
                style={{ width: 125 }}
              >
                {hours2.map((hour) => (
                  <Picker.Item
                    key={hour}
                    label={`${hour}`}
                    value={parseInt(hour)}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View
            style={{
              paddingLeft: "5%",
              paddingTop: 20,
              paddingBottom: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon name="list-alt" size={20} color="black" />
            <Text style={{ fontWeight: "bold", fontSize: 15, paddingLeft: 5 }}>
              Ghi chú
            </Text>
          </View>
          <TextInput
            style={{
              height: 150,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
              marginLeft: "5%",
              width: "90%",
            }}
            multiline={true}
            numberOfLines={4}
            placeholder="Nhập ghi chú của bạn tại đây"
            onChangeText={logTextAreaValue}
            value={textarea}
          />
          <View
            style={{
              paddingRight: "5%",
              paddingTop: 20,
              paddingBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20, paddingLeft: 5 }}>
              Tổng tiền: {totalCost.toLocaleString()} đ
            </Text>
          </View>
          <View
            style={{
              paddingLeft: "5%",
              paddingTop: 20,
              paddingBottom: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon name="dollar-sign" size={20} color="black" />
            <Text style={{ fontWeight: "bold", fontSize: 15, paddingLeft: 5 }}>
              Hình thức thanh toán
            </Text>
          </View>
          <View
            style={{
              height: 70,
              flexDirection: "row",
              width: "90%",
              marginLeft: "5%",
              borderColor: "gray",
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <TouchableOpacity
              style={{
                width: "45%",
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginRight: "4%",
                marginLeft: "3%",
                marginVertical: "4%",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: selectedButton === "Thu" ? PRIMARY.main : "white",
              }}
              onPress={() => handlePress("Thu")}
            >
              <Icon name="hand-holding-usd" size={15} color="black" />
              <Text
                style={{
                  paddingLeft: 3,
                  color: selectedButton === "Thu" ? "white" : "black",
                }}
              >
                Thu tiền tại nhà
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "45%",
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginRight: "3%",
                marginVertical: "4%",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor:
                  selectedButton === "Chuyen" ? PRIMARY.main : "white",
              }}
              onPress={() => handlePress("Chuyen")}
            >
              <Icon name="money-check-alt" size={15} color="black" />
              <Text
                style={{
                  paddingLeft: 3,
                  color: selectedButton === "Chuyen" ? "white" : "black",
                }}
              >
                Chuyển khoản
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
        onPress={handleDatDichVu}
          style={{
            height: 50,
            backgroundColor: PRIMARY.main,
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            marginLeft: "5%",
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <Text style={{ color: "white", paddingRight: 15, fontSize: 15 }}>
            Đặt dịch vụ
          </Text>
          <Icon name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </ScrollView>

      <StatusBar style="auto" />
      <ModelMessage 
        isVisible={showModal}
        message={message}
        onClose={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
