import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { Text, View } from "../../components/Themed";
import axios from 'axios'; 
import { Categories } from "../../constants/Categories"; 
import Item from '../../components/Item';
import { useNavigation } from '@react-navigation/native'; 

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [newsData, setNewsData] = useState([]);
  const navigation = useNavigation(); 

  const searchNews = async () => {
    try {
      const response = await axios.get(`https://newsdata.io/api/1/news`, {
        params: {
          apikey: 'pub_55141b30261f24d5324f546e18b4c3f7a3a9b',
          q: searchTerm,
          language: 'vi'
        }
      });
      if (response.data.results) {
        setNewsData(response.data.results);
      } else {
        setNewsData([]); 
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.itemContainer, { backgroundColor: '#f2f2f2' }]} 
      onPress={() => {
        navigation.navigate("NewsWithCategory", {
          item: item,
        });
      }}>
      <Text style={styles.categoryName}>{ item.name }</Text> 
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={searchNews} 
      />
      
      {searchTerm.length > 0 && newsData.length > 0 ? (
        <FlatList
          data={newsData} 
          key={"news"}
          keyExtractor={item => item.link} 
          renderItem={({ item,index }) => <Item item={item} index={index} />} 
        />
      ) : (
        <FlatList
          data={Categories} 
          key={"categories"}
          keyExtractor={item => item.id.toString()} 
          renderItem={renderItem} 
          numColumns={2}
          contentContainerStyle={styles.list} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 10,
    marginHorizontal: 16,
  },
  list: {
    paddingHorizontal: 16, 
  },
  itemContainer: {
    flex: 1,
    padding: 30,
    margin: 8,
    borderRadius: 10,
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
