import {
  View,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { icons } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import useAlbumsSongs from "../../hooks/useAlbumsSongs";
import { getImage } from "../../utility";
import { router } from "expo-router";
import {
  GestureDetector,
  Gesture,
  Directions,
} from "react-native-gesture-handler";

const AlbumBlock = ({ open, setOpen }) => {
  const fling = Gesture.Fling()
    .runOnJS(true)
    .onEnd(() => {
      setOpen({ ...open, opened: false });
      LayoutAnimation.configureNext({
        duration: 150,
        update: { type: "linear", property: "opacity" },
      });
    });
  fling.direction(Directions.DOWN);
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const album = open.album;

  const { songs, refetch, loading } = useAlbumsSongs({ id: album.id });

  useEffect(() => {
    refetch();
  }, [open]);

  return (
    <View
      className={`absolute flex-1 w-full h-full items-center justify-center  ${
        open.opened ? "top-[5vh]" : "top-[100vh]"
      }`}
    >
      <GestureDetector gesture={fling}>
        <View className="bg-pgray w-[90vw] h-[95vh] rounded-xl">
          <ImageBackground
            className="top-0 w-full h-[50vh]"
            source={{ uri: getImage({ imageByte: album.cover }) }}
            resizeMode="cover"
            imageStyle={{ borderRadius: 20 }}
          >
            <LinearGradient
              colors={["transparent", "#282828"]}
              className="absolute left-0 right-0 top-0 h-[50vh]"
            ></LinearGradient>

            <TouchableOpacity
              className="ml-3 mt-10 w-12 h-12 justify-center items-center"
              onPress={() => {
                setOpen({ ...open, opened: false });
                LayoutAnimation.configureNext({
                  duration: 150,
                  update: { type: "linear", property: "opacity" },
                });
              }}
            >
              <Image
                source={icons.close}
                className="w-10 h-10 "
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View className="flex-1 justify-center items-center">
              <Text className="text-3xl shadow-xl shadow-black font-pbold w-full text-white text-center">
                {album.name}
              </Text>
              <Text className="text-2xl shadow-xl shadow-black font-pregular w-full text-white text-center">
                {album.publishDate?.split("-")[0]}
              </Text>

              <FlatList
                className="top-[30vh]  w-full absolute h-[50vh] rounded-xl"
                showsVerticalScrollIndicator={false}
                data={songs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <TouchableOpacity
                        className="flex-row mb-3 ml-3"
                        onPress={() => router.push(`/song/${item.id}`)}
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
            </View>
          </ImageBackground>
        </View>
      </GestureDetector>
    </View>
  );
};

export default AlbumBlock;
