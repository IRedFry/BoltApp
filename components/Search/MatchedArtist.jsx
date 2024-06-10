import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import React from "react";
import { getImage } from "../../utility";

const MatchedArtist = ({ artist }) => {
  const image = getImage({ imageByte: artist.cover });

  const goToArtistScreen = () => {
    router.push(`/artist/${artist.id}`);
  };

  return (
    <TouchableOpacity onPress={goToArtistScreen}>
      <View className="flex-row mt-3">
        <Image
          source={{ uri: image }}
          className="w-24 h-24 rounded-full"
          resizeMode="cover"
        />
        <View className="flex-1 justify-center">
          <Text className="text-2xl text-white font-pbold pl-3">
            {artist.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MatchedArtist;
