import { StyleSheet, ActivityIndicator } from "react-native";
import { ThemedFlatList } from "../../components/Themed";
import Item from "../../components/Item";
import { useState, useEffect } from "react";
import axios from "axios";

const News = () => {
  const API_KEY = 'pub_55141b30261f24d5324f546e18b4c3f7a3a9b';

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (reset = false) => {
    if (loading) return; // Prevent duplicate fetches

    setLoading(true);
    try {
      const response = await axios.get(`https://newsdata.io/api/1/news`, {
        params: {
          apikey: API_KEY,
          language: 'vi',
          page: reset ? null : nextPage,
        }
      });


      if (response.data.results) {
        setNewsData(prev => reset ? response.data.results : [...prev, ...response.data.results]);
        setNextPage(response.data.nextPage);
        setHasMore(response.data.nextPage !== null);
      } else {
        setNewsData([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false); 
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchNews(true); 
  };

  const handleLoadMore = () => {
    if (!loading && hasMore && nextPage) {
      fetchNews(); 
    }
  };

  useEffect(() => {
    fetchNews(); 
  }, []);

  return (
    <ThemedFlatList
      data={newsData}
      renderItem={({ item, index }) => <Item item={item} index={index} />}
      onRefresh={handleRefresh}
      refreshing={isRefreshing}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator size="large" color="#ccc" /> : null} 
      style={styles.container}
    />
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
