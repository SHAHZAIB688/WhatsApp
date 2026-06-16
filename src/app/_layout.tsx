import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
// import { storage } from "../utils/utils";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // const access_token = storage.getString("token");
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  // useEffect(() => {
  //   console.log("Access Token:", access_token);
  // }, [access_token]);
  return (
    <>
    <Stack screenOptions={{ headerShown: false }} />
      {isLoggedIn ? (
        <Redirect href={"/(main)"} />
      ) : (
        <Redirect href={"/(auth)"} />
      )}
    </>
  )
}
