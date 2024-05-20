import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,Alert
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useState } from "react";
import axios from "axios";
import { API_ROOT, appName } from "../../config-global";
import { getData } from "../../helper/StoregeHelper";


const API_CHANGE_PASSWORD = API_ROOT + "auth/khachhang/change-password/";

export default function DoiMatKhau({ navigation }) {
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    const token = await getData("TOKEN");
    if (!token) {
      Alert.alert("Lỗi", "Không tìm thấy token. Vui lòng đăng nhập lại.");
      return;
    }
  
    try {
      const response = await axios.post(
        API_CHANGE_PASSWORD,
        {
          password: password,
          password1: password1,
          password2: password2,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.status === 200) {
        Alert.alert("Thành công", "Thông tin đã được cập nhật");
        // Optionally, you can reset the password fields after successful password change
        setPassword("");
        setPassword1("");
        setPassword2("");
        navigation.navigate("DangNhap")
      } else {
        Alert.alert(
          "Lỗi",
          "Cập nhật thông tin thất bại. Vui lòng thử lại sau."
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Lỗi",
        "Đã xảy ra lỗi trong quá trình cập nhật thông tin."
      );
    }
  };
  

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            height: 900,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 50,
            }}
          ></View>
          <View
            style={{
              flex: 700,
            }}
          >
            <View
              style={{
                color: "red",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "red" }}> {error}</Text>
            </View>

            <View
              style={{
                height: 60,
                width: "80%",
                marginLeft: "10%",
                marginBottom: 40,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "gray",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextInput
                style={{
                  paddingLeft: 10,
                  fontSize: 20,
                  width: "85%",
                }}
                placeholder="Nhập mật khẩu cũ"
                onChangeText={(password) => setPassword(password)}
                value={password}
              />
              <View
                style={{
                  resizeMode: "center",
                  width: "15%",
                }}
              >
                <AntDesign name="phone" size={30} color="gray" />
              </View>
            </View>

            <View
              style={{
                height: 60,
                width: "80%",
                marginLeft: "10%",
                marginBottom: 40,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "gray",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextInput
                style={{
                  paddingLeft: 10,
                  fontSize: 20,
                  width: "85%",
                }}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                onChangeText={(password1) => setPassword1(password1)}
                value={password1}
              />
              <View
                style={{
                  resizeMode: "center",
                  width: "15%",
                }}
              >
                <AntDesign name="lock" size={30} color="gray" />
              </View>
            </View>
            <View
              style={{
                height: 60,
                width: "80%",
                marginLeft: "10%",
                marginBottom: 40,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "gray",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextInput
                style={{
                  paddingLeft: 10,
                  fontSize: 20,
                  width: "85%",
                }}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry={true}
                onChangeText={(password2) => setPassword2(password2)}
                value={password2}
              />
              <View
                style={{
                  resizeMode: "center",
                  width: "15%",
                }}
              >
                <AntDesign name="lock" size={30} color="gray" />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#2baf66",
                  height: 60,
                  width: "37%",
                  marginLeft: "10%",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 50,
                }}
                onPress={handleChangePassword}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Đổi mật khẩu
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
