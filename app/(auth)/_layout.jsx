import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

import { useAuth } from "../../context/AuthContext";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export default function _layout() {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/home");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (error) {
      Toast.show({
        text1: 'Network Error',
        type: "error",
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
