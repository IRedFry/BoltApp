import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../../constants";
import { getImage } from "../../utility";
import usePlaylists from "../../hooks/usePlaylists";

const PlaylistPick = ({ songId, isVisible, onClose }) => {
  const { playlists, loading, refetch } = usePlaylists();
  const [changed, setChanged] = useState(false);

  const addTrackToPlaylist = async ({ item }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playlistId: item.id,
        trackId: songId,
      }),
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + "api/Playlist/Add",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          if (!data.message) {
            Alert.alert("Error", "Can't add tack to playlist");
            return "error";
          } else {
            item.positionId = data.positionId;
            item.trackCount++;
            setChanged((prev) => !prev);
          }
        },
        (error) => {
          console.log(error);
          return error;
        }
      );
  };

  const removeTrackFromPlaylist = async ({ item }) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API +
        `api/Playlist/Position/${item.positionId}`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          if (!data.message) {
            Alert.alert("Error", "Can't delete a playlist");
            return "error";
          } else {
            item.positionId = null;
            item.trackCount--;
            setChanged((prev) => !prev);
          }
        },
        (error) => {
          console.log(error);
          return error;
        }
      );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View className="absolute w-[90vw] h-[80vh] left-[5vw] top-[10vh] bg-pgray flex-1 items-center justify-center rounded-2xl">
        <View className="bg-pgray w-full h-full  rounded-xl">
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="ml-3 mt-5 w-12 h-12 justify-center items-center"
              onPress={() => {
                onClose();
              }}
            >
              <Image
                source={icons.close}
                className="w-10 h-10 "
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View className="justify-center items-center">
            <Text className="text-4xl shadow-xl shadow-black font-pbold w-full text-white text-center">
              Playlists
            </Text>
            <Text className="text-xl pb-20 shadow-xl shadow-black font-pregular w-full text-white text-center px-5">
              Choose in which playlists you want to add this song
            </Text>
            {loading ? (
              <>
                <ActivityIndicator
                  size="large"
                  className="h-36 w-full"
                  color="#FFFF62"
                />
              </>
            ) : (
              <FlatList
                className="top-[20vh]  w-full absolute h-[50vh] rounded-xl"
                showsVerticalScrollIndicator={false}
                data={playlists}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <TouchableOpacity
                        className="flex-row mb-3 ml-3"
                        onPress={() => {
                          if (!item.positionId) {
                            addTrackToPlaylist({ item });
                          } else {
                            removeTrackFromPlaylist({ item });
                          }
                        }}
                      >
                        <Image
                          source={{
                            uri: getImage({ imageByte: item.cover }),
                          }}
                          className="w-24 h-24"
                          resizeMode="contain"
                        />
                        {item.positionId ? (
                          <Image
                            source={icons.check}
                            className="w-16 h-16 absolute"
                            resizeMode="contain"
                          />
                        ) : (
                          <></>
                        )}

                        <View className="ml-5 flex-1">
                          <Text className="text-3xl text-white font-pbold">
                            {item.name}
                          </Text>
                          <Text className="text-xl text-white font-plight">
                            {item.trackCount} songs
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PlaylistPick;
