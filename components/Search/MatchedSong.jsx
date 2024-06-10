import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import React from "react";
import { getImage } from "../../utility";

const MatchedSong = ({ song }) => {
  const image = getImage({ imageByte: song.cover });

  const goToSongScreen = () => {
    router.push(`/song/${song.id}`);
  };

  return (
    <TouchableOpacity onPress={goToSongScreen}>
      <View className="flex-row mt-3">
        <Image
          source={{ uri: image }}
          className="w-28 h-28"
          resizeMode="contain"
        />
        <View>
          <Text className="text-3xl text-white font-pbold pl-3">
            {song.title}
          </Text>
          <Text className="text-lg text-gray-400 font-plight pl-3">
            {song.artistName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MatchedSong;
