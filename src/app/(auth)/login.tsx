import ReusableButton from '@/src/components/Atoms/ReusableButton'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
import { moderateScale } from 'react-native-size-matters'

const Login = () => {
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [pickerVisible, setPickerVisible] = useState(false)
  const [country, setCountry] = useState({ code: '', name: 'Select country', flag: '' })

  const countryCodeToEmoji = (code: string) =>
    code
      .toUpperCase()
      .split('')
      .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
      .join('')

  const onSelect = (selectedCountry: any) => {
    const callingCode = selectedCountry.callingCode?.[0] ?? ''
    const emojiFlag = selectedCountry.emoji || countryCodeToEmoji(selectedCountry.cca2 || countryCode)

    setCountryCode(selectedCountry.cca2 || countryCode)
    setCountry({
      code: callingCode ? `+${callingCode}` : country.code,
      name: typeof selectedCountry.name === 'string' ? selectedCountry.name : selectedCountry.name?.common || country.name,
      flag: emojiFlag || country.flag
    })
    setPickerVisible(false)
  }

  const onNext = () => {
    router.push({
      pathname: '/verify_otp',
      params: {
        fullPhone: `${country.code} ${phone}`,
      },
    });
  }
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Enter Your Phone Number</Text>
        <Text style={styles.desc}>WhatsApp will need to verify your phone number <Link href="/" style={styles.desc_link}>What's my number?</Link></Text>
      </View>

      <View style={styles.body}>
        <View style={styles.countryRow}>
          <TouchableOpacity style={styles.countrySelect} onPress={() => setPickerVisible(true)}>
            <Text style={styles.flag}>{country.flag}</Text>
            <Text style={[styles.countryName, !country.code && styles.placeholderText]}>{country.name}</Text>
            <AntDesign name="caret-down" size={20} color="black" />
          </TouchableOpacity>
          <CountryPicker
            countryCode={countryCode}
            withFilter
            withFlag
            withEmoji
            withCallingCode
            withFlagButton={false}
            withCountryNameButton={false}
            withModal
            withAlphaFilter
            onSelect={onSelect}
            visible={pickerVisible}
            onClose={() => setPickerVisible(false)}
          />
        </View>

        <View style={styles.phoneRow}>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>{country.code}</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={15}
          />
        </View>

        <Text style={styles.note}>Carrier charges may apply</Text>
      </View>

      <View style={styles.footer}>
        <ReusableButton title="Next" onpress={onNext} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(20)
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  body: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: '#ddd',
    padding: moderateScale(30),
    width: '100%'
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  desc: {
    fontSize: 12,
    textAlign: 'center'
  },
  desc_link: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
  ,
  countryRow: {
    width: '90%',
    alignItems: 'flex-start',
    marginBottom: moderateScale(8),
    position: 'relative'
  },
  countrySelect: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#05AA82',
    paddingVertical: moderateScale(8),
    width: '100%'
  },
  flag: {
    fontSize: 18,
    marginRight: moderateScale(8)
  },
  countryName: {
    fontSize: 16,
    flex: 1
  },
  placeholderText: {
    color: '#999'
  },
  chev: {
    color: '#666',
    marginLeft: moderateScale(8)
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: moderateScale(12)
  },
  codeBox: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    borderBottomWidth: 1,
    borderColor: '#05AA82',
    // borderRadius: 6,
    marginRight: moderateScale(8)
  },
  codeText: {
    fontSize: 14
  },
  phoneInput: {
    flex: 1,
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#05AA82',
    // borderRadius: 6,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(12)
  },
  note: {
    marginTop: moderateScale(8),
    fontSize: 12,
    color: '#666'
  }
})


export default Login