import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";

import { PRIMARY } from "../../assets/style/style-global";

const { width } = Dimensions.get("window");

const imagesList = [
  "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg",
  "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg",
  "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg",
  "https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg",
];

const services = [
  { id: 1, name: "Dọn dẹp định kỳ ", icon: require("../../assets/imgs/donnha-icon.png"), route: "Giao Dịch", price: "100" },
  { id: 2, name: "Trông em bé", icon: require("../../assets/imgs/trongtre-icon.png"), route: "TrongEmBe", price: "80" },
  { id: 3, name: "Giúp việc theo tháng", icon: require("../../assets/imgs/repeat-icon.png"), route: "GiupViecThang" },
  { id: 4, name: "Dọn dẹp nhà", icon: require("../../assets/imgs/donnha-icon.png"), route: "DonDepNha" },
  { id: 5, name: "Vệ sinh máy giặt", icon: require("../../assets/imgs/maygiat-icon.png"), route: "VeSinhMayGiat" },
  { id: 6, name: "Nấu ăn", icon: require("../../assets/imgs/nauan-icon.png"), route: "NauAn" },
];

const Slideshow = ({ images }) => {
  return (
    <View style={styles.sliderContainer}>
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        autoplay={true}
        autoplayTimeout={4}
        loop={true}
        paginationStyle={{ bottom: 10 }}
        nextButton={<Text style={styles.nextPrevButtonText}>›</Text>}
        prevButton={<Text style={styles.nextPrevButtonText}>‹</Text>}
      >
        {images.map((image, index) => (
          <View style={styles.slide} key={index}>
            <ImageBackground
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            >
              <Text style={styles.slideText}></Text>
            </ImageBackground>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const ServiceItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Giao Dịch', { item: item })} style={styles.serviceItem}>
      <View style={styles.serviceIconContainer}>
        <ImageBackground
          source={item.icon}
          style={styles.serviceIcon}
          resizeMode="cover"
        />
        <Text style={styles.serviceName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const TrangChuTab = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Xin chào, chúc bạn một ngày tốt lành
        </Text>
      </View>
      <Slideshow images={imagesList} />
      <Text style={styles.categoryTitle}>Định kỳ</Text>
      <FlatList
        data={services}
        renderItem={({ item }) => <ServiceItem item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={width > 600 ? 4 : 3} // Hiển thị 4 cột trên các màn hình lớn, ngược lại là 3 cột
        contentContainerStyle={styles.servicesContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginVertical: 5,
  },
  header: {
    backgroundColor: PRIMARY.main,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryTitle: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },

  sliderContainer: {
    height: 200,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  nextPrevButtonText: {
    color: "#ffffff",
    fontSize: 50,
  },
  servicesContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },

  serviceItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: PRIMARY.main,
    borderRadius: 60,
    elevation: 5,
    width: width > 600 ? (width - 40) / 4 : (width - 20) / 3, // Tính toán kích thước cho mỗi mục
    height: width > 600 ? (width - 40) / 4 : (width - 20) / 3, // Chiều rộng và chiều cao bằng nhau để tạo hình vuông
  },
  serviceIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8, // Độ mờ
  },
  serviceName: {
    color: PRIMARY.main,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default TrangChuTab;
