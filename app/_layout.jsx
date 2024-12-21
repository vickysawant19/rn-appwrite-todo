import { Stack } from "expo-router";
import {} from "@reduxjs/toolkit/react"

import AuthProvider from "../context/AuthContext";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import store from '../store/store'

export default function RootLayout() {
  return (
    <Provider store={store}>
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </AuthProvider>
    </Provider>
  );
}
