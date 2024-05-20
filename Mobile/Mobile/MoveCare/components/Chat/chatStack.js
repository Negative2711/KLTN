import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { PRIMARY } from '../../assets/style/style-global';

const ChatStack = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Xin chào!', sender: 'user' },
    { id: 2, text: 'Chào bạn!', sender: 'bot' },
    { id: 3, text: 'Bạn có cần giúp đỡ gì không?', sender: 'bot' },
    { id: 4, text: 'Không, cảm ơn!', sender: 'user' },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null); // Ref cho FlatList

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    flatListRef.current.scrollToEnd({ animated: true }); // Cuộn xuống dưới cùng
    // Tạo một hàm để xử lý phản hồi từ bot và cập nhật tin nhắn vào messages state
    // Sau khi bạn gửi tin nhắn của người dùng, bạn có thể gọi hàm này để thêm tin nhắn từ bot
    // ví dụ: handleBotResponse(inputText);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef} // Sử dụng ref cho FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messagesContainer}
         // Đảo ngược danh sách hiển thị
      />
      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          placeholder="Nhập tin nhắn..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Gửi</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#C8FACD',
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    borderWidth: 1,
    borderColor: '#007bff',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#28a745',
    borderWidth: 1,
    borderColor: '#28a745',
  },
  messageText: {
    fontSize: 16,
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:10,
    marginBottom:20,
    paddingBottom: 10, // Thêm paddingBottom để giữ phần cuối của input mở ra khi bàn phím xuất hiện
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: PRIMARY.main,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default ChatStack;
