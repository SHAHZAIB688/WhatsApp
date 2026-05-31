import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Authlayout = () => {
  return (
    <Stack screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='login' />
        <Stack.Screen name='verify_otp' />
        <Stack.Screen name='terms_agree' />
    </Stack>
  )
}

export default Authlayout