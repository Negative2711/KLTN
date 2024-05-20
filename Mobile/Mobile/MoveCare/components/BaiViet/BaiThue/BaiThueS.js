import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
  TextInput,
  StatusBar,
} from "react-native";
import axios from "axios";
import BaiThue from "./BaiThue";
import { getData } from "../../../helper/StoregeHelper";

//config
import { API_ROOT } from "../../../config-global";
import { PRIMARY } from "../../../assets/style/style-global";

const API_LIST_BAI = API_ROOT + "booking/posts/";

const API_Find_By_user = `booking/posts/bykhachhang/4f2ef95b-fdf1-46a5-be39-de0aeb96f918/`;

export default function BaiThueS({ navigation }) {
  const [dsbaiDang, setDSBaiDang] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(false);

  const getAllDSBaiDang = useCallback(async () => {
    try {
      const response = await axios.get(API_LIST_BAI);
      const data = response.data.data;
      setDSBaiDang(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFindByUsser = useCallback(async () => {
    const khid = await getData("ID");
    try {
      const response = await axios.get(
        `${API_ROOT}
        /`
      );
      const data = response.data.data;
      setDSBaiDang(data);
      setShow(true);
      console.log(setDSBaiDang);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllDSBaiDang();
    });

    return unsubscribe;
  }, [navigation, getAllDSBaiDang]);



  const handleCreate = () => {
    navigation.navigate("Create");
  };

  const handleDetail = (id) => {
    console.log("Da click vao bai post co id " + id);
    navigation.navigate("Detail", {
      idpost: id,
    });
  };

  const handleSearch = () => {
    console.log("Đã tìm kiếm với từ khóa:", searchText);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Button
          onPress={handleCreate}
          title="Tạo bài viết"
          color={PRIMARY.main}
        />
        <Button
          onPress={handleFindByUsser}
          title="Bài viết của bạn"
          color={PRIMARY.main}
          
        />
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginRight: 10,
            borderRadius: 5,
            paddingLeft: 10,
          }}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
          placeholder="Nhập từ khóa tìm kiếm"
        />
        <Button onPress={handleSearch} title="Tìm kiếm" color={PRIMARY.main} />
      </View>

      <StatusBar />

      <ScrollView>
        {dsbaiDang.map((baidang) => (
          <TouchableOpacity
            key={baidang.id}
            onPress={() => handleDetail(baidang.id)}
          >
            <BaiThue
              show={show}
              baidang={baidang}
             
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
