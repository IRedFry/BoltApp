import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="space-y-2 px-10 my-5">
      <Text className="text-xl text-white font-pregular">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-3xl border-2 border-pyellow focus:border-white flex flex-row items-center">
        <TextInput
          className={`flex-1 text-white font-pregular text-lg overflow-visible h-full ${
            !value ? "" : "mb-3"
          }`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={
            (title === "Password" || title === "Password confirm") &&
            !showPassword
          }
          {...props}
        />

        {(title === "Password" || title === "Password confirm") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.closedEye : icons.eye}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
