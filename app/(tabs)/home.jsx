import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import appwriteService from '../../appwrite/service';
import { Button } from 'react-native';
import {  useRouter } from 'expo-router';

export default function Home() {

  const router = useRouter()
  const {setUser } = useAuth()
  const handleLogout = async () => {
    try {
      await appwriteService.logout();
      setUser(null)
      router.replace("/login"); 
    } catch (error) {
      Alert.alert("Logout Error", error?.message || "Failed to logout");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Home Screen</Text>
      <Button title="Logout" color="red" onPress={handleLogout} />
    </View>
  );
}
