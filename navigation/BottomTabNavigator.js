// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import News from "../screens/News";
import Search from "../screens/Search";
import Download from "../screens/Download";
import Detail from "../screens/News/detail";
import NewsWithCategory from "../screens/Search/show";
import DetailOffline from "../screens/Download/detail";
const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="NewsNavigator"
        component={NewsNavigator}
        options={{
          headerShown: false,
          title: "Tin tức",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="newspaper-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{
          headerShown: false,
          title: "Tìm kiếm",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="search-outline" color={color} />
          ),
        }}
      />
            <BottomTab.Screen
        name="DownloadNavigator"
        component={DownloadNavigator}
        options={{
          headerShown: false,
          title: "Tải xuống",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="download-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

function NewsNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="News"
        component={News}
        options={{
          headerTitle: "Tin tức",
      }}
      />
      <TabOneStack.Screen
        name="DetailNews"
        component={Detail}
        options={{ headerTitle: "Chi tiết tin tức" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function SearchNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Search"
        component={Search}
        options={{ headerTitle: "Tìm kiếm" ,
        }}
      />
      <TabTwoStack.Screen
        name="NewsWithCategory"
        component={NewsWithCategory}
      />
      <TabTwoStack.Screen
        name="DetailNews"
        component={Detail}
        options={{ headerTitle: "Chi tiết tin tức" }}
      />
    </TabTwoStack.Navigator>
  );
}
const TabThreeStack = createStackNavigator();

function DownloadNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="Download"
        component={Download}
        options={{ headerTitle: "Tải xuống" }}
      />
      <TabThreeStack.Screen
        name="DetailNewsOffline"
        component={DetailOffline}
        options={{ headerTitle: "Chi tiết tin tức" }}
      />
    </TabThreeStack.Navigator>
  );
}
