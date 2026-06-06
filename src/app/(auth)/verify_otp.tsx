import { auth, firebaseConfig } from '@/src/firebaseConfig';
import OTPInput from "@codsod/react-native-otp-input";
import AntDesign from '@expo/vector-icons/AntDesign';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { router, useLocalSearchParams } from 'expo-router';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
// import { storage } from '@/src/utils/utils';

const Verify_otp = () => {
  const [count,setCount] = useState(30)
  const [otp, setOTP] = useState("");
  const { fullPhone } = useLocalSearchParams();
  const recaptchaVerifier = useRef<any>(null);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [hasTriedVerify, setHasTriedVerify] = useState(false);

  useEffect(() => {
    if(count > 0){
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  useEffect(() => {
    if (fullPhone) {
      sendVerificationCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullPhone]);

  const onPressArrow = ()=>{
    router.back()
  }
  const onVerify = ()=>{
    verifyCode();
  }

  const sendVerificationCode = async () => {
    try {
      setLoading(true);
      const phoneProvider = new PhoneAuthProvider(auth);
      console.log('Sending verification code to', fullPhone);
      const id = await phoneProvider.verifyPhoneNumber(fullPhone as string, recaptchaVerifier.current);
      setVerificationId(id);
      setSent(true);
      setHasTriedVerify(false);
      setCount(30);
      console.log('Received verificationId:', id);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.error('sendVerificationCode error:', err);
      Alert.alert('Error', err.message || String(err));
    }
  }

  const verifyCode = async () => {
    if (hasTriedVerify) return;
    setHasTriedVerify(true);
    if (!verificationId) {
      Alert.alert('Error', 'No verification ID, try resending the code.');
      return;
    }
    if (!otp || otp.length < 6) {
      Alert.alert('Error', 'Please enter the 6-digit OTP');
      return;
    }
    try {
      setLoading(true);
      console.log('Verifying with verificationId:', verificationId, 'otp:', otp);
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const userCred = await signInWithCredential(auth, credential);
      setLoading(false);
      if (userCred && userCred.user) {
        console.log('Phone auth successful, uid:', userCred.user.uid);
        // clear verificationId to prevent auto-retry loops
        setVerificationId(null);
        router.push('/(main)');
      } else {
        console.warn('signInWithCredential returned no user:', userCred);
        Alert.alert('Verification failed', 'Unable to verify OTP — no user returned.');
      }
    } catch (err: any) {
      setLoading(false);
      console.error('verifyCode error:', err);
      Alert.alert('Verification failed', err.message || String(err));
    }
  }

  // Auto-verify when a full OTP is entered (e.g. pasted)
  useEffect(() => {
    if (otp && otp.length >= 6 && verificationId && !loading && !hasTriedVerify) {
      verifyCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp, verificationId, loading]);
  return (
    <SafeAreaView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={false}
      />
      <View style={styles.header}>
        <AntDesign style={styles.icon} name="arrow-left" size={24} color="black" onPress={onPressArrow}/>
        <Text style={styles.headerText}>Enter OTP Code</Text>
      </View>
      <View style={styles.body}>
        <Text>Enter the 6-digit code sent to {fullPhone}</Text>
          <OTPInput
            length={6}
            onOtpComplete={(txt: string) => setOTP(txt)}
          />
          {count > 0 ? (
            <Text style={{color: "#00A884"}}>Resend OTP in {count} seconds</Text>
          ) : (
            <TouchableOpacity onPress={() => { sendVerificationCode(); }}>
              <Text style={{color: "#00A884"}}>Resend</Text>
            </TouchableOpacity>
          )}
          {!sent && <Text style={{color: '#666'}}>Sending code...</Text>}
      </View>
      <View style={styles.footer}>
        {loading ? <ActivityIndicator size="large" color="#00A884" /> : null}
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