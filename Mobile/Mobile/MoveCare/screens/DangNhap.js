import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import {  AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ROOT } from "../config-global";

//redux
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "../redux/actions/userActions";


// storage
import { saveData, getData} from "../helper/StoregeHelper"

export default function DangNhap({ navigation }) {
  const API_LOGIN = API_ROOT + "auth/khachhang/login/";
  const API_CURRENT_USER = API_ROOT + 'auth/khachhang/info/'
  const [phone_number, setPhone] = useState("0984218514");
  const [password, setPassword] = useState("123123");
   
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();






  const dangNhap = async () => {
    axios
      .post(API_LOGIN, {
        phone_number: phone_number,
        password: password,
      })
      .then((response) => {
        // Nếu đăng nhập thành công thì chuyển vào trang chủ
        token = saveData("TOKEN",response.data.data.token)
        saveData("NAME",response.data.data.ho_ten)
        saveData("ID",response.data.data.idkh)
        saveData("STAFF",response.data.data.is_staff)
        // toeken = saveDataToAsyncStorage(response.data.data.token);
        dispatch(setUser(response.data.data));
        if (response.data.message === "Login successful") {
          console.log("Đăng nhập thành công");
          navigation.navigate("TrangChu");
        }
      })
      .catch((error) => {
        // Nếu đăng nhập thất bại thì in ra lỗi
        if (error.response && error.response.data) {
          const { message } = error.response.data;
          // console.error("Lỗi API:", error.response.data);
          // Đăng nhập sai mật khẩu hoặc sai tài khoản
          if (message === "Invalid phone number or password") {
            console.log("Sai số điện thoại hoặc sai sai mật khẩu");
            Alert.alert("", "Sai số điện thoại hoặc sai sai mật khẩu");
          }
          // Chưa điền số điện thoại hoặc mật khẩu
          else if (message === "Missing required fields") {
            console.log("Bạn chưa điền số điện thoại hoặc mật khẩu");
            Alert.alert("", "Bạn chưa điền số điện thoại hoặc mật khẩu");
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


  const AutoLogin = async (token) => {
    try {
      const response = await axios.get(
        API_CURRENT_USER,
        
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
  
      if (response.data.status_code === 200) {
        console.log("Đăng nhập thành công");
        // Nếu bạn có truyền navigation vào hàm AutoLogin, bạn có thể sử dụng nó ở đây
        if (navigation) {
          navigation.navigate("TrangChu");
        }
      }
      else
         console.log(response.data.status_code);
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (message === "Invalid phone number or password") {
          console.log("Sai số điện thoại hoặc sai mật khẩu");
          Alert.alert("", "Sai số điện thoại hoặc sai mật khẩu");
        } else if (message === "Missing required fields") {
          console.log("Bạn chưa điền số điện thoại hoặc mật khẩu");
          Alert.alert("", "Bạn chưa điền số điện thoại hoặc mật khẩu");
        } else {
          console.log("Lỗi khác trong useEffect:", message);
          console.log(response.data);
        }
      } else {
        console.error("Lỗi kết nối API:", error);
      }
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const token = await getData("TOKEN");
      if (token !== null) {
        await AutoLogin(token);
      }
    };
    fetchData();
  }, []);
  

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 0.3,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            color: "#2baf66",
            fontWeight: "bold",
          }}
        >
          MOVE CARE!
        </Text>
      </View>
      <View
        style={{
          flex: 0.7,
        }}
      >
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
          placeholder="Số điện thoại"
          onChangeText={(phone_number) => setPhone(phone_number)}
          value={phone_number} >
          
        
          
          </TextInput>
          
   
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
            onChangeText={(password) => setPassword(password)}
            value={password}
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
        <TouchableOpacity
          style={{
            height: 30,
            width: "80%",
            marginLeft: "10%",
            marginTop: 10,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 10,
          }}
          onPress={() => navigation.navigate("OTP")}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#2baf66",
            }}
          >
            Quên mật khẩu ?
          </Text>
        </TouchableOpacity>
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
          onPress={dangNhap}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>Bạn chưa có tài khoản?</Text>
          <Text
            style={{
              fontSize: 20,
              color: "#2baf66",
              marginLeft: 10,
            }}
            onPress={() => navigation.navigate("DangKy")}
          >
            Đăng ký
          </Text>
        </View>
      </View>
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
