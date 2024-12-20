import {  useRouter } from "expo-router";
import { useEffect } from "react";
import appwriteService from "../appwrite/service";
import { useAuth } from "../context/AuthContext";

export default function Index() {

  const router = useRouter()
  useEffect(()=> {
    router.replace("/login")
  }, [])
  return null
}
