import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import MessageCart from './MessageCart'
import ImagePath from '@/src/constants/ImagePath'

const Chat = () => {
    const data=[
        {
            id: 1,
            name: 'John Doe',
            message: 'Hello, how are you?',
            time: '10:30 AM',
            avatar: ImagePath.whatsapp_logo,
            messagecount:1
        },
        {
            id: 2,
            name: 'Jane Smith',
            message: 'I am doing great!',
            time: '11:00 AM',
            avatar: ImagePath.whatsapp_logo,
            messagecount: 0
        }
    ]
  return (
    <FlatList data={data} renderItem={({ item }) => <MessageCart {...item} />} style={styles.container} />
  )
}

const styles = StyleSheet.create({
  container:{
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
  }
})

export default Chat