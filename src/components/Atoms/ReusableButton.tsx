import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { moderateScale } from 'react-native-size-matters'

const ReusableButton = ({ title, onpress ,style}: { title: string, onpress: () => void, style?: any }) => {
  return (
    <TouchableOpacity style={[styles.btn_container,style]} onPress={onpress} activeOpacity={.8}>
      <Text style={styles.btn_text}>{title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  btn_container: {
    backgroundColor: '#00A884',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn_text: {
    fontSize: moderateScale(16),
    color: 'white',
  }
})

export default ReusableButton