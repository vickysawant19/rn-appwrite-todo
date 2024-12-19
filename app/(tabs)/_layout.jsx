import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { router, Stack } from "expo-router";

export default function TabsLayout() {
  const { user, setUser, isLoading } = useAuth();
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
