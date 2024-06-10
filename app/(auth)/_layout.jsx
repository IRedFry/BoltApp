import React from "react";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </Stack>

      <StatusBar style="light"></StatusBar>
    </>
  );
};

export default AuthLayout;
