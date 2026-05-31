import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { moderateScale } from 'react-native-size-matters';
import ReusableButton from '@/src/components/Atoms/ReusableButton';
import OTPInput from "@codsod/react-native-otp-input";
// import { storage } from '@/src/utils/utils';

const Verify_otp = () => {
  const [count,setCount] = useState(30)
  const [otp, setOTP] = useState("");
  const { fullPhone } = useLocalSearchParams();

  useEffect(() => {
    if(count > 0){
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const onPressArrow = ()=>{
    router.back()
  }
  const onVerify = ()=>{
  //  storage.setItem("token", "sajdkasjdsakjdk89kjaskjdksamnassa");
  //  router.push("/home")
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AntDesign style={styles.icon} name="arrow-left" size={24} color="black" onPress={onPressArrow}/>
        <Text style={styles.headerText}>Enter OTP Code</Text>
      </View>
      <View style={styles.body}>
        <Text>Enter the 4-digit code sent to {fullPhone}</Text>
          <OTPInput
            length={4}
            onOtpComplete={(txt: string) => setOTP(txt)}
          />
          <Text style={{color: "#00A884"}}>Resend OTP in {count} seconds</Text>
      </View>
      <View style={styles.footer}>
        <ReusableButton title='Verify' style={{width: moderateScale(100)}} onpress={onVerify} />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingVertical: moderateScale(20),
    backgroundColor: 'white'
  },
  header:{
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // borderWidth: 1,
    width: '100%',
    paddingHorizontal: moderateScale(20)
  },
  body:{
    flex: 1, 
    justifyContent: 'space-evenly',
    // borderWidth: 1, 
    alignItems: 'center'
  },
  footer:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  headerText:{
    fontSize: moderateScale(26), 
    fontWeight: 'bold',
    marginLeft: moderateScale(10)
  },
  icon:{
    marginTop: moderateScale(5),
  }
})

export default Verify_otp