import React, { useState } from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale } from 'react-native-size-matters'
import Calls from '../../components/modules/Calls'
import Chat from '../../components/modules/Chat'
import Status from '../../components/modules/Status'
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
const Main = () => {
  const [currentTab, setCurrentTab] = useState('chat');

  const ActiveTab = () => {
    switch (currentTab) {
      case 'chat':
        return <Chat />;
      case 'status':
        return <Status />;
      case 'calls':
        return <Calls />;
      default:
        return <Chat />;
    }
  }

  const WhatsAppHeader = () => {
    return (
      <View style={styles.header} >
        <Text style={styles.headerText}>Whatsapp</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: moderateScale(20) }} >
          <Feather name="search" size={24} color="white" />
          <Entypo name="dots-three-vertical" size={24} color="white" />
        </View>
      </View>
    )

  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#00A884' />
      <WhatsAppHeader/>
      <View style={styles.topBarHeader}>
        {['chat', 'status', 'calls'].map((tab, index) => (
          <TouchableOpacity key={index} onPress={() => setCurrentTab(tab)}>
            <Text style={[styles.tabText, currentTab === tab && styles.activeTabText]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {ActiveTab()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: moderateScale(20),
    backgroundColor: 'white'
  },
  topBarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    // paddingVertical: moderateScale(10),
    backgroundColor: '#00A884'
  },
  tabText: {
    color: 'white',
    fontSize: moderateScale(18),
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(10),
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  headerText: {
    color: 'white',
    fontSize: moderateScale(24),
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    backgroundColor: '#00A884',
  }
})


export default Main