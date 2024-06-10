import {
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import React from "react";
import { getImage } from "../../utility";
import { router } from "expo-router";

const ArtistsAlbum = ({ album, setOpenAlbumBlock }) => {
  const cover = getImage({ imageByte: album.cover });
  return (
    <View className="flex-1 flex-row w-full h-full p-2 ">
      <TouchableOpacity
        className="flex-1 flex-row "
        onPress={() => {
          setOpenAlbumBlock({ album: album, opened: true });
          LayoutAnimation.configureNext({
            duration: 150,
            update: { type: "linear", property: "opacity" },
          });
          //router.push(`/album/${album.id}`);
        }}
      >
        <Image
          source={{ uri: cover }}
          className="w-28 h-28"
          resizeMode="contain"
        />
        <View className="flex-1 pl-2 items-start justify-center max-w-[30vh]">
          <Text className="font-pbold text-lg text-white">{album.name}</Text>
          <Text className="font-plight text-base text-white">
            {album.publishDate?.split("-")[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ArtistsAlbum;
