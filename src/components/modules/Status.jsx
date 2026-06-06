import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Status = () => {
  return (
    <View style={styles.container}>
      <Text>Status</Text>
    </View>
  )
}

const styles = StyleSheet .create({
  container:{
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
  }
})
export default Status