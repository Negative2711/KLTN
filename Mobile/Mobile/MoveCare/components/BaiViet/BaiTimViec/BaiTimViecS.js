import React, { useEffect, useState, useCallback } from "react";
import { Button, ScrollView, SafeAreaView, TouchableOpacity, View, TextInput, StatusBar, StyleSheet } from "react-native";
import axios from "axios";
import RNPickerSelect from 'react-native-picker-select';

import { getData } from "../../../helper/StoregeHelper";
import BaiTimViec from "./BaiTimViec";

// config
import { API_ROOT } from "../../../config-global";
import { PRIMARY } from "../../../assets/style/style-global";

const API_LIST_BAI = API_ROOT + "rental/posts/";
const API_Find_By_user = `booking/posts/bykhachhang/4f2ef95b-fdf1-46a5-be39-de0aeb96f918/`;

export default function BaiTimViecS({ navigation }) {
  const [dsbaiDang, setDSBaiDang] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [show, setShow] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAge, setSelectedAge] = useState('');

  const fetchData = useCallback(async () => {
    const staff = await getData("STAFF");
    setIsStaff(staff);
  }, []);

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
      const response = await axios.get(`${API_ROOT}rental/posts/bykhachhang/${khid}/`);
      const data = response.data.data;
      setDSBaiDang(data);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAllDSBaiDang();
      fetchData();
    });

    return unsubscribe;
  }, [navigation, getAllDSBaiDang]);

  const handleCreate = () => {
    navigation.navigate("Create");
  };

  const handleDetail = (id) => {
    console.log("Da click vao bai post co id " + id);
    navigation.navigate("BaiTimViecDetail", {
      idpost: id,
    });
  };

  const handleSearch = () => {
    console.log("Đã tìm kiếm với từ khóa:", searchText);
    console.log("Khu vực:", selectedRegion);
    console.log("Giới tính:", selectedGender);
    console.log("Độ tuổi:", selectedAge);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
        {isStaff && <Button onPress={handleCreate} title="Bài viết mới" color={PRIMARY.main} />}
        <Button onPress={handleFindByUsser} title="Bài viết của bạn" color={PRIMARY.main} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <View style={{ flex: 1, marginRight: 5 }}>
          {/* Combobox độ tuổi */}
          <RNPickerSelect
            onValueChange={(value) => setSelectedAge(value)}
            items={[
              { label: 'Dưới 18', value: 'duoi18' },
              { label: 'Từ 18 đến 30', value: '18-30' },
              { label: 'Từ 31 đến 45', value: '31-45' },
              { label: 'Trên 45', value: 'tren45' },
            ]}
            placeholder={{ label: "Chọn độ tuổi", value: null }}
            style={pickerSelectStyles}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 5 }}>
          {/* Combobox khu vực */}
          <RNPickerSelect
            onValueChange={(value) => setSelectedRegion(value)}
            items={[
              { label: 'Khu vực 1', value: 'khuvuc1' },
              { label: 'Khu vực 2', value: 'khuvuc2' },
              { label: 'Khu vực 3', value: 'khuvuc3' },
            ]}
            placeholder={{ label: "Chọn khu vực", value: null }}
            style={pickerSelectStyles}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <View style={{ flex: 1, marginRight: 5 }}>
          {/* Combobox giới tính */}
          <RNPickerSelect
            onValueChange={(value) => setSelectedGender(value)}
            items={[
              { label: 'Nam', value: 'nam' },
              { label: 'Nữ', value: 'nu' },
              { label: 'Khác', value: 'khac' },
            ]}
            placeholder={{ label: "Chọn giới tính", value: null }}
            style={pickerSelectStyles}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 5 }}>
          {/* Ô nhập liệu tìm kiếm */}
          <TextInput
            style={styles.textInput}
            onChangeText={text => setSearchText(text)}
            value={searchText}
            placeholder="Nhập từ khóa tìm kiếm"
          />
        </View>
      </View>
      {/* Nút tìm kiếm */}
      <Button onPress={handleSearch} title="Tìm kiếm" color={PRIMARY.main} />
      <StatusBar />

      <ScrollView>
        {dsbaiDang.map((baidang) => (
          <TouchableOpacity key={baidang.id} onPress={() => handleDetail(baidang.id)}>
            <BaiTimViec show={show} baidang={baidang} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputAndroid: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
   
    marginBottom: 10,
  },
});
