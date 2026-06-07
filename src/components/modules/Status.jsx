import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import MessageCart from './MessageCart'
import ImagePath from '@/src/constants/ImagePath'

const Status = () => {
  const data = [
    {
      id: 1,
      name: 'John Doe',
      message: 'Hello, how are you?',

      avatar: ImagePath.whatsapp_logo,

    },
    {
      id: 2,
      name: 'Jane Smith',
      message: 'I am doing great!',

      avatar: ImagePath.whatsapp_logo,

    },
  ]
  return (
    <View style={{flex:1,gap:15,backgroundColor:'white',width:'100%'}}>
      <MessageCart
        name="My Status"
        message="Tap to add status update"
        avatar={ImagePath.whatsapp_logo}
        LogoComponent={<View style={styles.logoContainer}>
          <Text style={styles.logoText}>+</Text>
        </View>}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => <MessageCart {...item} />}
        style={styles.container}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    gap: 10,
  },
  logoContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#25D366',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: 'white', 
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default Status