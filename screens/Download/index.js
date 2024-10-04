import React, { useLayoutEffect, useState, useEffect } from "react";

import { StyleSheet } from "react-native";
import { ThemedFlatList } from "../../components/Themed"; // Ensure this path is correct
import { NEWS_DATA } from "../../constants/NewsData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import ItemOffline from "../../components/ItemOffline";
export default function Download() {
  const [loading, setLoading] = useState(false);
  const [dataStored, setDataStored] = useState([]);
  const checkIfSaved = async () => {
    const existingItems = await AsyncStorage.getItem("news");
    const newsArray = existingItems ? JSON.parse(existingItems) : [];
    setDataStored(newsArray);
  };
  const yourRefreshFunction = () => {
    setLoading(true);
    setTimeout(() => {
      checkIfSaved();
    }, 2000);
  };
  useFocusEffect(
    React.useCallback(() => {
      checkIfSaved();
    }, [])
  );
  useEffect(() => {
    checkIfSaved();
  }, []);

  return (
    <ThemedFlatList
      data={dataStored}
      renderItem={({ item, index }) => <ItemOffline item={item} index={index} />}
      onRefresh={yourRefreshFunction}
      refreshing={loading}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
