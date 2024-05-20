import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function OTP({ navigation }) {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [isLastDigitEntered, setIsLastDigitEntered] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Move to next input field
      if (value.length === 1 && index < otp.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }

    // Check if last digit is entered
    if (index === otp.length - 1 && value.length === 1) {
      setIsLastDigitEntered(true);
    } else {
      setIsLastDigitEntered(false);
    }
  };

  const handleLastDigitSubmit = () => {
    Keyboard.dismiss(); // Dismiss keyboard after entering last digit
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.img1} source={require('../assets/imgs/Otp.png')} />
        </View>
        <View style={styles.body}>
          <Text style={styles.lbl1}>Nhập mã OTP bao gồm 6 số được gửi về email:</Text>
          <View style={styles.inputContainer}>
            {otp.map((value, index) => (
              <View key={index} style={styles.pnl1}>
                <TextInput
                  ref={(ref) => inputsRef.current[index] = ref}
                  style={styles.input}
                  value={value}
                  onChangeText={(text) => handleChange(index, text)}
                  keyboardType="numeric"
                  maxLength={1}
                  onSubmitEditing={index === otp.length - 1 ? handleLastDigitSubmit : undefined}
                />
              </View>
            ))}
          </View>
          <Text>Xác minh số điện thoại trong: </Text>
          <TouchableOpacity style={styles.btn1}>
            <Text style={styles.txt2}>Xác minh</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img1: {
    height: '100%',
  },
  body: {
    flex: 0.6,
    width: '80%',
    marginLeft: '10%',
    marginTop: 15,
  },
  lbl1: {
    fontSize: 15,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  pnl1: {
    width: '13%',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 20,
    textAlign: 'center',
  },
  btn1: {
    marginTop: 15,
    backgroundColor: '#2baf66',
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt2: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
