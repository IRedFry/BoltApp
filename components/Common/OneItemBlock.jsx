import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";

const OneItemBlock = ({
  image,
  blockName,
  title,
  subtitle,
  loading,
  onPress,
}) => {
  return (
    <View className="w-full mt-10 flex-1 bg-pgray">
      {loading ? (
        <View className="w-full h-[200px]">
          <ActivityIndicator
            size="large"
            className="h-full w-full"
            color="#FFFF62"
          />
        </View>
      ) : (
        <>
          <Text className="font-bold text-xl text-white p-2">{blockName}</Text>
          <TouchableOpacity
            onPress={() => {
              if (onPress != undefined) onPress();
            }}
          >
            <View className="flex-1 flex-row min-h-[20vh]">
              <Image
                source={{ uri: image }}
                className="w-[40%] rounded-2xl m-3"
                resizeMode="cover"
              />
              <View className="flex-1 items-start justify-center">
                <Text className="text-2xl text-white font-pbold">{title}</Text>
                <Text className="text-xl text-white font-plight">
                  {subtitle}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default OneItemBlock;
