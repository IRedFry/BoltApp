import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../../constants";
import { getImage } from "../../utility";
import usePlaylistSongs from "../../hooks/usePlaylistSongs";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { SwipeAction } from "@ant-design/react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const Playlist = ({ playlist, isVisible, onClose, setIsRefresh }) => {
  const { songs, refetch } = usePlaylistSongs({ id: playlist.id });

  const deletePlaylist = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + `api/Playlist/${playlist.id}`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          if (data.message) {
            Alert.alert("Success", "Playlist has been successfuly deleted");
          } else {
            Alert.alert("Error", "Can't delete a playlist");
            return "error";
          }
        },
        (error) => {
          console.log(error);
          return error;
        }
      )
      .then(() => setIsRefresh(true));
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
            Alert.alert("Error", "Can't remove track from playlist");
            return "error";
          } else {
            songs.splice(songs.indexOf(item), 1);
            refetch();
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
          <ImageBackground
            className="top-0 w-full h-[50vh] "
            source={{ uri: getImage({ imageByte: playlist.cover }) }}
            resizeMode="cover"
            imageStyle={{ borderRadius: 20 }}
          >
            <LinearGradient
              colors={["transparent", "#282828"]}
              className="absolute left-0 right-0 top-0 h-[50vh]"
            />
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
              <TouchableOpacity
                className="mr-3 mt-5 w-12 h-12 justify-center items-center"
                onPress={() => {
                  deletePlaylist();
                  onClose();
                }}
              >
                <Image
                  source={icons.deleteIcon}
                  className="w-9 h-9 "
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View className="flex-1 justify-center items-center">
              <Text className="text-4xl shadow-xl shadow-black font-pbold w-full text-white text-center">
                {playlist.name}
              </Text>
              <Text className="text-3xl pb-20 shadow-xl shadow-black font-pregular w-full text-white text-center">
                {playlist.creationDate?.split("-")[0]}
              </Text>

              <FlatList
                className="top-[30vh]  w-full absolute h-[40vh]"
                showsVerticalScrollIndicator={false}
                data={songs}
                keyExtractor={() => Math.random().toString(16).slice(2)}
                renderItem={({ item }) => {
                  return (
                    <GestureHandlerRootView>
                      <SwipeAction
                        right={[
                          {
                            text: "-",
                            backgroundColor: "red",
                            color: "white",
                            style: {
                              fontSize: 50,
                            },
                            onPress: () => {
                              removeTrackFromPlaylist({ item });
                            },
                          },
                        ]}
                      >
                        <TouchableOpacity
                          className="flex-row mb-3 ml-3"
                          onPress={() => {
                            onClose();
                            router.push(`/song/${item.id}`);
                          }}
                        >
                          <Image
                            source={{
                              uri: getImage({ imageByte: item.cover }),
                            }}
                            className="w-24 h-24"
                            resizeMode="contain"
                          />
                          <View className="ml-5 flex-1">
                            <Text className="text-3xl text-white font-pbold">
                              {item.title}
                            </Text>
                            <Text className="text-xl text-white font-plight">
                              {item.artistName}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </SwipeAction>
                    </GestureHandlerRootView>
                  );
                }}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default Playlist;
