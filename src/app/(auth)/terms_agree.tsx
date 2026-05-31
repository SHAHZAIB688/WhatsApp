import { View, Text, StyleSheet, Image, Touchable, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import ImagePath from '@/src/constants/ImagePath';
import { Link, router } from 'expo-router';
import { moderateScale } from 'react-native-size-matters';
import ReusableButton from '@/src/components/Atoms/ReusableButton';

const Terms_agree = () => {
  const onAgreeAndContinue = () => {
    router.push("/login")
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome to WhatsApp</Text>
        <Image style={styles.img} source={ImagePath.welcome_img} />
        <Text style={styles.privacy_policy}>Read Our <Link style={styles.link} href={"/"}>Privacy Policy</Link> Tap "Agree and continue" to accept the <Link style={styles.link} href={"/"}>Terms of Service</Link></Text>
      </View>
      <View style={styles.footer}>
        <ReusableButton title='Agree and Continue' onpress={onAgreeAndContinue} />
        <View style={{alignItems: 'center'}}>
          <Text style={styles.from_text}>From</Text>
          <Text style={styles.from_facebook}>Facebook</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'space-between',
    backgroundColor: 'white',
    // paddingVertical: moderateScale(20)
    // alignItems: 'center',
  },
  header: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: "space-between",
    // borderWidth: 1,
    height: "70%",
      paddingVertical: moderateScale(50)
  },
  footer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: "space-between",
    paddingVertical:moderateScale(10),
    // borderWidth: 1,
    height: "30%"
  },
  img: {
    width: moderateScale(250),
    height: moderateScale(250),
  },
  from_text: {
    fontSize: moderateScale(12),
    color: "#867373"
  },
  from_facebook: {
    fontSize: moderateScale(15),
    color: "#000000"
  },
  privacy_policy: {
    fontSize: moderateScale(12),
    width: moderateScale(300),
    textAlign: 'center'
  },
  welcome: {
    fontSize: moderateScale(25),
    fontWeight: 'bold'
  },
  link: {
    color: 'blue'
  }
});

export default Terms_agree