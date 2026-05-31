import ImagePath from '@/src/constants/ImagePath'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, verticalScale } from 'react-native-size-matters'

const index = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timeOutter = setTimeout(() => {
            setIsLoading(true);
        }, 2000);

        const timeInner = setTimeout(() => {
            router.push("/terms_agree");
        }, 5000);

        return () => {
            clearTimeout(timeOutter);
            clearTimeout(timeInner);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.body}>
                <Image style={styles.logo} source={ImagePath.whatsapp_logo} />
                <Text style={styles.app_name}>WhatsApp</Text>
            </View>
            <View style={styles.footer}>
                {
                    isLoading ? (
                        <>
                            <ActivityIndicator size={moderateScale(20)} color={"#0ccc83"} />
                            <Text style={styles.from_Loading}>Loading...</Text>
                        </>
                    ) : (
                        <>
                            <Text style={styles.from_text}>From</Text>
                            <Text style={styles.from_facebook}>Facebook</Text>
                        </>
                    )
                }

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: verticalScale(20),
        backgroundColor: '#fff'
    },
    header: {

    },
    body: {
        alignItems: 'center',
        gap: verticalScale(7),
    },
    logo: {
        width: moderateScale(50),
        height: moderateScale(50),
        resizeMode: 'contain',
        borderRadius: moderateScale(10),
    },
    app_name: {
        fontSize: moderateScale(20),
        fontWeight: 'bold',
    },
    footer: {
        alignItems: 'center',
        height: verticalScale(50),
    },
    from_text: {
        fontSize: moderateScale(12),
        color: "#867373"
    },
    from_facebook: {
        fontSize: moderateScale(15),
        color: "#000000"
    },
    from_Loading: {
        fontSize: moderateScale(12),
        marginTop: verticalScale(5),
        fontWeight: '500',
    }
})

export default index