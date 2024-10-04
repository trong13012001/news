import React, { useState, useCallback, useEffect } from "react";
import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Button,
  FlatList,
} from "react-native";
import Colors from "../constants/Colors";
import NetInfo from "@react-native-community/netinfo";

export function useThemeColor(props, colorName) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ThemedView(props) {
  const {
    style,
    contentContainerStyle,
    lightColor,
    darkColor,
    onRefresh,
    refreshing,
    loading,
    children,
    offlineMode,
    ...otherProps
  } = props;

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const [isRefreshing, setIsRefreshing] = useState(refreshing || false);
  const [isConnected, setIsConnected] = useState(true); // Track network connectivity

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    if (onRefresh) {
      onRefresh();
    }
    setTimeout(() => setIsRefreshing(false), 2000); // Simulate refresh time
  }, [onRefresh]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ScrollView
      style={[{ backgroundColor }, style]}
      contentContainerStyle={contentContainerStyle}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
      {...otherProps}
    >
      {!isConnected && !offlineMode ? (
        <DefaultView style={{ padding: 10, alignItems: "center" }}>
          <Text style={{ color: "red" }}>No Internet Connection</Text>

          <Button
            title="Refresh"
            onPress={handleRefresh}
          />
        </DefaultView>
      ) : loading ? (
        <ActivityIndicator size="large" color={Colors[useColorScheme()].text} />
      ) : (
        children
      )}
    </ScrollView>
  );
}
export function ThemedFlatList(props) {
  const {
    style,
    contentContainerStyle,
    lightColor,
    darkColor,
    onRefresh,
    refreshing,
    loading,
    data,
    renderItem,
    offlineMode,
    ...otherProps
  } = props;

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const [isRefreshing, setIsRefreshing] = useState(refreshing || false);
  const [isConnected, setIsConnected] = useState(true); // Track network connectivity

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    if (onRefresh) {
      onRefresh();
    }
    setTimeout(() => setIsRefreshing(false), 2000); // Simulate refresh time
  }, [onRefresh]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <FlatList
      style={[{ backgroundColor }, style]}
      contentContainerStyle={contentContainerStyle}
      data={data}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
      keyExtractor={(item, index) => item.id || index.toString()}
      {...otherProps}
    >
      {!isConnected && !offlineMode ? (
        <DefaultView style={{ padding: 10, alignItems: "center" }}>
          <Text style={{ color: "red" }}>No Internet Connection</Text>
          <Button
            title="Refresh"
            onPress={handleRefresh}
          />
        </DefaultView>
      ) : loading ? (
        <ActivityIndicator size="large" color={Colors[useColorScheme()].text} />
      ) : null}
    </FlatList>
  );
}
