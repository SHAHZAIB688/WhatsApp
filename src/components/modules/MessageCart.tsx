import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import ImagePath from '@/src/constants/ImagePath'
import { moderateScale } from 'react-native-size-matters'

const MessageCart = ({ name, message, time, avatar, messagecount, LogoComponent, rightIcon, callIcon, onPress }: any) => {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.leftContainer}>
                <View>
                    <Image source={avatar} style={styles.userImage} />
                    {LogoComponent}
                </View>
                <View >
                    <Text style={styles.userName}>{name}</Text>
                    <View style={styles.callContainer}>
                        {callIcon}
                        <Text style={styles.message}>{message}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.message}>{time}</Text>
                {
                    messagecount && <View style={styles.messageContainer}>
                        <Text style={styles.message}> {messagecount}</Text>
                    </View>
                }
                {rightIcon}
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    btn: {
        width: '100%',
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(20),
        backgroundColor: 'white',
    },
    userImage: {
        width: moderateScale(53),
        height: moderateScale(53),
        borderRadius: moderateScale(25),
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(15),
    },
    rightContainer: {
        position: 'absolute',
        right: moderateScale(20),
        top: moderateScale(15),
        alignItems: 'flex-end',
        gap: moderateScale(5),
        justifyContent: 'center',
    },
    userName: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
    },
    message: {
        fontSize: moderateScale(14),
        color: '#666',
    },
    messageContainer: {
        backgroundColor: '#00A884',
        width: moderateScale(20),
        height: moderateScale(20),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(5),
    },
    callContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(5),
    }
})

export default MessageCart