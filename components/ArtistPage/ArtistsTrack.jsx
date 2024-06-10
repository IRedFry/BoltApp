import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { getImage } from "../../utility";
import { router } from "expo-router";

const ArtistsTrack = ({ song }) => {
  const cover = getImage({ imageByte: song.cover });
  return (
    <View className="flex-1 flex-row w-full h-full p-2 ">
      <TouchableOpacity
        className="flex-1 flex-row "
        onPress={() => {
          router.push(`/song/${song.id}`);
        }}
      >
        <Image
          source={{ uri: cover }}
          className="w-28 h-28"
          resizeMode="contain"
        />
        <View className="flex-1 pl-2">
          <Text className="font-pbold text-2xl text-white">{song.title}</Text>
          <Text className="font-plight text-base text-white">
            {song.artistName}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ArtistsTrack;
