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
import useRecommendations from "../../hooks/useRecommendations";
import { router } from "expo-router";

const Recommendations = ({ songName, songId, isVisible, onClose }) => {
  const { recommendationTracks, loading, refetch } = useRecommendations({
    songId: songId,
  });

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
              Recommendations
            </Text>
            <Text className="text-xl pb-20 shadow-xl shadow-black font-pregular w-full text-white text-center px-5">
              These songs might be similar to {songName}
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
                data={recommendationTracks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <TouchableOpacity
                        className="flex-row mb-3 ml-3"
                        onPress={() => {
                          router.push(`/song/${item.id}`);
                          onClose();
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

export default Recommendations;
