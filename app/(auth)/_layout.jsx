import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'

export default function AuthLayout() {
  return (
   <Stack>
    <Stack.Screen name='login'/>
    <Stack.Screen name='signup'/>
   </Stack>
  )
}