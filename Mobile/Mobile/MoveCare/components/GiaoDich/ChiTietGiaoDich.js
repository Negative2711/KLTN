import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'

export default function ChiTietGiaoDich({ route }) {
  const { item } = route.params;
  return (
    <SafeAreaView>
      <Text>ChiTietGiaoDich + {item.id}</Text>
    </SafeAreaView>
  )
}