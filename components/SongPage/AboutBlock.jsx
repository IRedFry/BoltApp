import { View, Text } from "react-native";
import React from "react";

const AboutBlock = ({ albumName, releaseDate, genre }) => {
  return (
    <View className="w-full mt-10 flex-1 bg-pgray">
      <Text className="font-bold text-xl text-white p-2">About</Text>
      <View className="flex-1 p-2">
        <View className="flex-1 flex-row justify-between border-b-2 border-plightgray mb-2 pb-2">
          <Text className="text-plightgray text-base font-pregular">Album</Text>
          <Text className="text-white text-base font-pregular">
            {albumName}
          </Text>
        </View>
        <View className="flex-1 flex-row justify-between border-b-2 border-plightgray mb-2 pb-2">
          <Text className="text-plightgray text-base font-pregular">
            Released
          </Text>
          <Text className="text-white text-base font-pregular">
            {releaseDate?.split("-")[0]}
          </Text>
        </View>
        <View className="flex-1 flex-row justify-between border-b-2 border-plightgray mb-2 pb-2">
          <Text className="text-plightgray text-base font-pregular">Genre</Text>
          <Text className="text-white text-base font-pregular">{genre}</Text>
        </View>
      </View>
    </View>
  );
};

export default AboutBlock;
