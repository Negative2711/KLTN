import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PRIMARY } from '../assets/style/style-global';

export default ModelMessage = ({ isVisible, message, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.messageText}>{message}</Text>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    textAlign:'center',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    width: 200,
    height: "35%",
  },
  closeButtonContainer: {
    position: 'absolute',
    bottom: 20, // Điều chỉnh khoảng cách từ dưới lên
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor:PRIMARY.main,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

