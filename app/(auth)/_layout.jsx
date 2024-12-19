import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { ActivityIndicator } from "react-native-web";

export default function _layout() {
  const { user, isLoading } = useAuth();
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/home");
    }
  }, [user, isLoading]);

   if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

  return <Stack screenOptions={{headerShown: false}}/>;
}
