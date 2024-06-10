import {
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import React, { useState } from "react";
import { getImage } from "../../utility";
import Playlist from "../PlaylistsPage/Playlist";

const PlaylistItem = ({ playlist, setIsRefresh }) => {
  const [playlistModal, setPlaylistModal] = useState(false);

  const cover = getImage({ imageByte: playlist.cover });
  return (
    <>
      <View className="flex-1 flex-row h-full p-2 500 w-[70vw]">
        <TouchableOpacity
          className="flex-1 flex-row "
          onPress={() => {
            setPlaylistModal(true);
            LayoutAnimation.configureNext({
              duration: 150,
              update: { type: "linear", property: "opacity" },
            });
          }}
        >
          <Image
            source={{ uri: cover }}
            className="w-28 h-28 rounded-2xl"
            resizeMode="contain"
          />
          <View className="flex-1 pl-2 items-start justify-center max-w-[30vh]">
            <Text className="font-pbold text-xl text-white">
              {playlist.name}
            </Text>
            <Text className="font-plight text-base text-white">
              {playlist.trackCount} songs
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Playlist
        playlist={playlist}
        isVisible={playlistModal}
        onClose={() => setPlaylistModal(false)}
        setIsRefresh={setIsRefresh}
      />
    </>
  );
};

export default PlaylistItem;
