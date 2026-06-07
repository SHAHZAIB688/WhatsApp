import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import MessageCart from './MessageCart'
import ImagePath from '@/src/constants/ImagePath'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { moderateScale } from 'react-native-size-matters';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
const Calls = () => {
  const data = [
    {
      id: 1,
      name: 'John Doe',
      message: 'Today, 10:30 AM',
      rightIcon:<FontAwesome name="video-camera" style={styles.rightIcon} />,
      callIcon:<Feather name="arrow-down-left" style={styles.callIcon} />,
      avatar: ImagePath.whatsapp_logo,

    },
    {
      id: 2,
      name: 'Jane Smith',
      message: 'Yesterday, 2:45 PM',
      rightIcon:<FontAwesome name="video-camera" style={styles.rightIcon} />,
      callIcon:<Feather name="arrow-up-right" style={[styles.callIcon, { color: 'green' }]} />,
      avatar: ImagePath.whatsapp_logo,
    },
    {
      id: 3,
      name: 'Bob Johnson',
      message: '2 days ago, 1:20 PM',
      rightIcon:<Ionicons name="call" style={styles.rightIcon}/>,
      callIcon:<Feather name="arrow-down-left" style={styles.callIcon} />,
      avatar: ImagePath.whatsapp_logo,
    },
  ]
  return (
    <View style={{flex:1,gap:15,backgroundColor:'white',width:'100%'}}>
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
  rightIcon: {
    color: '#00A884',
    fontSize: moderateScale(20),
  },
  callIcon:{
    color: 'red',
    fontSize: moderateScale(17),
  }
})

export default Calls