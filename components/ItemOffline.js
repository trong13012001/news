import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function ItemOffline({ item, index }) {
  const navigation = useNavigation(); // Use navigation hook

  const handlePress = (index) => {
    navigation.navigate("DetailNewsOffline", {
      item: item,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handlePress(index)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          backgroundColor: "#fff",
          paddingHorizontal: 16,
          borderWidth: 0.5,
          borderColor: "#ccc",
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flexShrink: 1,
  },
});
