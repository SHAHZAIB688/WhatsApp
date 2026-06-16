import { StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import MessageCart from './MessageCart'
import { CHAT_CONTACTS } from '@/src/constants/chatData'

const Chat = () => {
  const router = useRouter()

  return (
    <FlatList
      data={CHAT_CONTACTS}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MessageCart
          name={item.name}
          message={item.message}
          time={item.time}
          avatar={item.avatar}
          messagecount={item.messagecount}
          onPress={() =>
            router.push({
              pathname: '/(main)/chat/[id]',
              params: { id: item.id },
            })
          }
        />
      )}
      style={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
})

export default Chat
