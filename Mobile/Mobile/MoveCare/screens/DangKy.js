import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, } from 'react-native';
import { AntDesign, Feather } from "@expo/vector-icons";
import { useState } from 'react';
import axios from "axios";
import { appName } from '../config-global';
import { API_ROOT } from '../config-global';

const endpointDangKy = API_ROOT + "auth/khachhang/register/"

export default function DangKy({ navigation }) {

  const [phone_number, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("")

  const dangKy = () => {
    // Gọi API đăng nhập bằng axios
    axios
      .post(endpointDangKy, {
        name:name,
        email:email,
        phone_number: phone_number,
        password1: password1,
        password2: password2,
      })
      .then((response) => {
        console.log(response.data);
        // Nếu đăng ký thành công chuyển qua trang đăng nhập và lưu vào database
        if (response.data.message === "Register successful") {
          console.log("Đăng ký thành công");
          navigation.navigate("DangNhap");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const { message } = error.response.data;

          if (message === "User already exists") {
            console.log(
              "Số điện thoại này đã được đăng ký. Vui lòng sử dụng số điện thoại khác."
            );
            Alert.alert('', 'Số điện thoại này đã được đăng ký. Vui lòng sử dụng số điện thoại khác.');
          }
          // Điền thiếu thông tin
          else if (message === "Missing required fields") {
            console.log("Điền thiếu thông tin ");
            Alert.alert('', 'Điền thiếu thông tin');
          }
          // Điền sai chuỗi
          else if (
            message ===
            "(1) The string supplied did not seem to be a phone number."
          ) {
            console.log("Số điện thoại phải là số");
            Alert.alert('', 'Số điện thoại bị sai');
          }
          // số dt không phải kiểu string
          else if (
            message === "__str__ returned non-string (type NoneType)"
          ) {
            console.log("Số điện thoại phải đủ 10 số và phải là số");
            Alert.alert('', 'Số điện thoại bị sai');
          }
          // Lỗi khác
          else {
            console.log("Lỗi khác:", message);
          }
        } else {
          console.error("Lỗi kết nối API:", error);
        }
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{
          height: 900,
        }}>
          <View style={{
            alignItems: "center",
            justifyContent: "center",
            height: 200,
          }}>
            <Text style={{
              fontSize: 40,
              color: "#2baf66",
              fontWeight: "bold",
            }}>{appName}</Text>
          </View>
          <View style={{
            flex: 700,
          }}>
            <View style={{
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
            }}>
              <TextInput
                style={{
                  paddingLeft: 10,
                  fontSize: 20,
                  width: "85%",
                }}
                placeholder="Họ và tên"
                value={name}
                onChangeText={(name) => setName(name)}
              />
              <View style={{
                resizeMode: "center",
                width: "15%",
              }}>
                <AntDesign name="user" size={30} color="gray" />
              </View>
            </View>
            <View style={{
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
            }}>
              <TextInput
                style={{
                  paddingLeft: 10,
                  fontSize: 20,
                  width: "85%",
                }}
                placeholder="Số điện thoại"
                onChangeText={(phone_number) => setPhone(phone_number)}
                value={phone_number}
              />
              <View style={{
                resizeMode: "center",
                width: "15%",
              }}>
                <AntDesign name="phone" size={30} color="gray" />
              </View>
            </View>
            <View style={{
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
            }}>
              <TextInput
                style={{
                  paddingLeft: 10,
                  fontSize: 20,
                  width: "85%",
                }}
                placeholder="Email"
                value={email}
                onChangeText={(email)=>{setEmail(email)}}
              />
              <View style={{
                resizeMode: "center",
                width: "15%",
              }}>
                <Feather name="map-pin" size={30} color="gray" />
              </View>
            </View>
            <View style={{
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
            }}>
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
              <View style={{
                resizeMode: "center",
                width: "15%",
              }}>
                <AntDesign name="lock" size={30} color="gray" />
              </View>
            </View>
            <View style={{
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
            }}>
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
              <View style={{
                resizeMode: "center",
                width: "15%",
              }}>
                <AntDesign name="lock" size={30} color="gray" />
              </View>
            </View>

            <View style={{
              flexDirection: 'row'
            }}>
              <TouchableOpacity style={{
                backgroundColor: "#2baf66",
                height: 60,
                width: "37%",
                marginLeft: "10%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 50,
              }}
                onPress={dangKy}>
                <Text style={{
                  fontSize: 20,
                  color: "white",
                  fontWeight: "bold",
                }}>Đăng ký</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                height: 60,
                width: "37%",
                marginLeft: "7%",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 50,
                flexDirection: 'row',
              }}
                onPress={() => navigation.navigate("DangNhap")}>
                <Text style={{
                  fontSize: 15,
                  color: "#2baf66",
                  fontWeight: "bold",
                  marginRight: 10,
                }}>Đăng nhập</Text>
                <AntDesign name="arrowright" size={20} color="#2baf66" />
              </TouchableOpacity>
            </View>


          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
