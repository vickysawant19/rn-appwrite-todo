import {  useRouter } from "expo-router";
import { useEffect } from "react";
import appwriteService from "../appwrite/service";
import { useAuth } from "../context/AuthContext";
import Toast from "react-native-toast-message";

export default function Index() {

  const router = useRouter()

  useEffect(()=> {
    setTimeout(() => router.replace("/login") ,0)
  }, [])

  return null
}
