import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getData } from './StoregeHelper'; // Đảm bảo đường dẫn đến file StoregeHelper là chính xác

export default function checkLoginAndAlert(action) {
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await getData("Token"); // Lấy dữ liệu token từ bộ nhớ
      if (token) {
        // Nếu có token, người dùng đã đăng nhập
        performAction(action);
      } else {
        // Ngược lại, người dùng chưa đăng nhập, hiển thị thông báo
        showAlert();
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái đăng nhập:", error);
      // Xử lý lỗi tại đây nếu cần
    }
  };

  const performAction = (action) => {
    // Thực hiện hành động sau khi kiểm tra đăng nhập thành công
    // Ví dụ: chuyển hướng đến trang thanh toán hoặc mua hàng
    console.log("Thực hiện hành động:", action);
  };

  const showAlert = () => {
    // Hiển thị thông báo khi người dùng chưa đăng nhập
    Alert.alert(
      "Thông báo",
      "Vui lòng đăng nhập để thực hiện hành động này.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Đăng nhập", onPress: () => console.log("Đăng nhập Pressed") }
      ],
      { cancelable: false }
    );
  };

  // Không cần trả về gì từ hàm này vì các hành động được thực hiện thông qua side effects và Alert
}
