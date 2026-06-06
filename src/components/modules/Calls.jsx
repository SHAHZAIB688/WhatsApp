import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Calls = () => {
  return (
    <View style={styles.container}>
      <Text>Calls</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
  }
})
export default Calls