import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { API_ROOT } from "../../config-global";
import { getData } from "../../helper/StoregeHelper";
import { PRIMARY } from "../../assets/style/style-global";

const API_GIAODICH_GETS = API_ROOT + "transaction/giaodich/getByKhachHangId/";

export default function GiaoDichS({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    const id = await getData("ID");
    try {
      const response = await axios.get(API_GIAODICH_GETS + id + "/");
      setOrders(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchOrders);
    return unsubscribe;
  }, [navigation, fetchOrders]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("ChiTietGiaoDich", { item: item })}
    >
      <View style={styles.orderItem}>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
        <Text>Date: {item.ghi_chu}</Text>
        <Text>Price: ${item.gia_tri}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Tất cả các giao dịch của bạn sẽ được hiển thị tại đây{" "}
          </Text>
        </View>
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => <View style={{ height: 50 }} />}
          ListFooterComponent={() => <View style={{ height: 50 }} />}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapper: {
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    width: "90%",
    marginTop: 50,
    height: '90%',
    marginLeft: "5%",
  },
  messageContainer: {
    width: "90%",
    marginLeft: "5%",
    height: 50,
    marginTop: "5%",
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
  },
  messageText: {
    marginLeft: "5%",
    marginRight: "5%",
  },
  linkText: {
    color: "blue",
  },
  orderItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PRIMARY.main,
    margin: 2,
  },
  serviceName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
