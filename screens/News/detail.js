import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Detail = ({ route, navigation }) => {
  const { item } = route.params;
  const timeNow = new Date();
  const pubDate = new Date(item.pubDate);
  const timeDiff = timeNow - pubDate;
  const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutesLeft = Math.floor((timeDiff / (1000 * 60)) % 60);

  const [hasSaved, setHasSaved] = useState(false); 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.header}>
          <Image source={{ uri: item.source_icon }} style={styles.headerIcon} />
          <Text style={styles.headerTitle}>{item.source_name}</Text>
        </View>
      ),
    });
  }, [navigation, item]);
  const checkIfSaved = async () => {
    const existingItems = await AsyncStorage.getItem("news");
    const newsArray = existingItems ? JSON.parse(existingItems) : [];
    const isSaved = newsArray.some((newsItem) => newsItem.article_id === item.article_id);
    setHasSaved(isSaved);
  };
  useFocusEffect(
    React.useCallback(() => {
      checkIfSaved();
    }, [])
  );
  useEffect(() => {
    checkIfSaved();
  }, [item]);

  const handleLinkCopy = async () => {
    await Clipboard.setStringAsync(item.link);
    Alert.alert("Đã sao chép", "Liên kết đã được sao chép vào bảng tạm của bạn");
  };

  const saveToLocalStorage = async () => {
    try {
      const existingItems = await AsyncStorage.getItem("news");
      const newsArray = existingItems ? JSON.parse(existingItems) : [];
      newsArray.push(item);
      await AsyncStorage.setItem("news", JSON.stringify(newsArray));
      setHasSaved(true);
      Alert.alert("Đã lưu", "Bài viết đã được lưu vào bộ nhớ cục bộ.");
    } catch (error) {
      Alert.alert("Lỗi", "Không lưu được bài viết.");
    }
  };

  const removeFromLocalStorage = async () => {
    try {
      const existingItems = await AsyncStorage.getItem("news");
      const newsArray = existingItems ? JSON.parse(existingItems) : [];
      const updatedNewsArray = newsArray.filter(
        (newsItem) => newsItem.article_id !== item.article_id
      );

      await AsyncStorage.setItem("news", JSON.stringify(updatedNewsArray));
      setHasSaved(false);
      Alert.alert("Đã xóa", "Bài viết đã bị xóa khỏi bộ nhớ cục bộ.");
    } catch (error) {
      Alert.alert("Lỗi", "Không xóa được bài viết.");
    }
  };

  const toggleSaveStatus = () => {
    if (hasSaved) {
      removeFromLocalStorage();
    } else {
      saveToLocalStorage();
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.subtitle}>
        <Text style={styles.timeInfo}>
          {daysLeft === 0
            ? hoursLeft === 0
              ? `${minutesLeft} phút trước`
              : `${hoursLeft} giờ trước`
            : daysLeft === 1
            ? "1 ngày trước"
            : `${daysLeft} ngày trước`}
        </Text>

        <TouchableOpacity onPress={toggleSaveStatus}>
          <Ionicons
            size={20}
            name={hasSaved ? "bookmark" : "bookmark-outline"} 
            color={hasSaved ? "#f29900" : "#ccc"} 
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.content}>{item.description}</Text>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.creator}>{item.creator}</Text>

      <TouchableOpacity onPress={handleLinkCopy} style={styles.linkContainer}>
        <Ionicons size={20} name="alert-circle-outline" />
        <Text style={styles.link}>{item.link.substring(0, 40) + "..."} </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  subtitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  creator: {
    fontSize: 32,
    fontWeight: "600",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  content: {
    fontSize: 16,
    marginTop: 10,
    lineHeight: 22,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  timeInfo: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
  },
  link: {
    fontSize: 16,
    color: "#555",
    marginLeft: 10,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 16,
    marginBottom: 20,
  },
});
