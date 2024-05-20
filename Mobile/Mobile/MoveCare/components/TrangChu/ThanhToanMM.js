import React from "react";
import { TouchableOpacity } from "react-native";
import { Touchable } from "react-native";
import { View, Text, Image, StyleSheet,SafeAreaView } from "react-native";
import { PRIMARY } from "../../assets/style/style-global";
import Icon from "react-native-vector-icons/FontAwesome5";


export const ThanhToanMM = ({price}) => {
  // Generate your QR code image URL or import it from a source

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Queyeets mã QR sau với app ngân hàng của bạn</Text>
      <Text style={styles.title}>Chủ taì khoản: Vũ Quang Huy</Text>
      <Text style={styles.title}>0984218xxx</Text>
      <Text style={styles.title}>Số tiền: 2000 đ </Text>


      <Image
        source={require("../../assets/payment/QR.png")}
        style={styles.qrCode}
        resizeMode="contain"
      />

    

      <TouchableOpacity
        // onPress={handleDatDichVu}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  qrCode: {
    width: 200,
    height: 200,
  },
});
