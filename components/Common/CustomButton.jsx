import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const CustomButton = ({
  icon,
  text,
  additionalStyle,
  onPress,
  additionalTextStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-pyellow rounded-xl min-h-[40px] min-w-[200px] justify-center items-center mt-5 flex-row ${additionalStyle}`}
    >
      {icon ? (
        <Image source={icon} className="w-6 h-6" resizeMode="contain" />
      ) : (
        <></>
      )}
      <Text className={`font-pbold text-xl ${additionalTextStyle}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
