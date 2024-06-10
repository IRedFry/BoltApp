import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import CustomButton from "../Common/CustomButton";

const PleaseEnterAccount = ({ subtext }) => {
  return (
    <View className="flex-1 items-center justify-center w-ful">
      <Text className="text-white font-pbold text-3xl py-2">
        Please sign in account
      </Text>
      <Text className="text-white font-plight text-lg">{subtext}</Text>
      <CustomButton text={"Sign in"} onPress={() => router.push("/sign-in")} />
    </View>
  );
};

export default PleaseEnterAccount;
