import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const UpperLeftButton = ({ icon, onPress }) => {
  return (
    <View className="items-left">
      <TouchableOpacity className="ml-5 mt-5" onPress={() => onPress()}>
        <Image source={icon} className="w-9 h-9" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default UpperLeftButton;
