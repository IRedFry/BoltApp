import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { getImage } from "../../utility";
import { router } from "expo-router";
const HistoryItem = ({ track }) => {
  const image = getImage({ imageByte: track.cover });

  const goToSongScreen = () => {
    router.push(`/song/${track.id}`);
  };
  const recDate = track.recognitionDate?.split("-");

  return (
    <TouchableOpacity onPress={goToSongScreen}>
      <View className="flex-row mt-3">
        <Image
          source={{ uri: image }}
          className="w-28 h-28"
          resizeMode="contain"
        />
        <View>
          <Text className="text-2xl text-white font-pbold pl-3">
            {track.title}
          </Text>
          <Text className="text-lg text-gray-400 font-plight pl-3">
            {track.artistName}
          </Text>
          <Text className="text-lg text-gray-400 font-plight pl-3">
            {recDate[2].slice(0, 2) + "." + recDate[1] + "." + recDate[0]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryItem;
