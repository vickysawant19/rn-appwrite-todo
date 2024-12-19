
import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from "react";
import appwriteService from '../appwrite/service';



const AuthContext = createContext({})

export default function AuthProvider({children}) {
  const [user , setUser ] = useState(null)
  const [isLoading , setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
        try {
           setIsLoading(true)
           const resp = await appwriteService.getAccount()
           setUser(resp)   
        } catch (error) {
            console.log(error)
        } finally{
            setIsLoading(false)
        }
    }
    fetchUser()
  } , [])

  return (
    <AuthContext.Provider value={{user,setUser,isLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)