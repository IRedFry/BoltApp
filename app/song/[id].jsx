import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import useSong from "../../hooks/useSong";
import useAlbum from "../../hooks/useAlbum";
import { ActivityIndicator } from "react-native-paper";
import { getImage } from "../../utility";
import { LinearGradient } from "expo-linear-gradient";
import { icons } from "../../constants";
import OneItemBlock from "../../components/Common/OneItemBlock";
import AboutBlock from "../../components/SongPage/AboutBlock";
import CustomButton from "../../components/Common/CustomButton";
import AlbumBlock from "../../components/ArtistPage/AlbumBlock";
import PlaylistPick from "../../components/SongPage/PlaylistPick";
import Recommendations from "../../components/SongPage/Recommedations";
import { useGlobalContext } from "../../context/GlobalProvider";

const SongScreen = () => {
  const { user } = useGlobalContext();
  const { id } = useLocalSearchParams();
  const [open, setOpen] = useState({ album: {}, opened: false });
  const [pickerVisible, setPickerVisible] = useState(false);
  const [recommendationVisible, setRecommendationVisible] = useState(false);
  const { song, loading } = useSong({ id });

  const {
    album,
    loading: albumLoading,
    refetch,
  } = useAlbum({ id: song?.albumId });

  useEffect(() => {
    refetch();
  }, [loading]);

  const cover = getImage({ imageByte: song.cover });

  return (
    <>
      <ImageBackground
        source={{ uri: cover }}
        className="left-0 right-0 h-[50vh] flex-1 bg-pblack"
        resizeMode="cover"
      >
        <LinearGradient
          colors={["transparent", "#1A1A1A"]}
          className="absolute left-0 right-0 top-0 h-[50vh]"
        ></LinearGradient>

        <View className="flex-row justify-between">
          <TouchableOpacity
            className="mt-[80] ml-3 w-12 h-12 justify-center items-center"
            onPress={() => {
              router.back();
            }}
          >
            <Image
              source={icons.close}
              className=" w-12 h-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
          {user.userName != "" ? (
            <TouchableOpacity
              className="mt-[80] mr-3 w-24 h-12 justify-center items-center"
              onPress={() => {
                setPickerVisible(true);
              }}
            >
              <Image
                source={icons.addToPlaylist}
                className=" w-20 h-10"
                resizeMode="cover"
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        {loading ? (
          <ActivityIndicator
            size="large"
            className="h-full w-full"
            color="#FFFF62"
          />
        ) : (
          <ScrollView className="pt-[20vh]">
            <View className="pl-2">
              <Text className="text-5xl text-white font-pbold">
                {song.title}
              </Text>
              <TouchableOpacity
                onPress={() => router.push(`artist/${song.artistId}`)}
              >
                <Text className="text-xl text-white font-plight">
                  {song.artistName}
                </Text>
              </TouchableOpacity>
            </View>

            {album.id != undefined ? (
              <OneItemBlock
                image={getImage({ imageByte: album.cover })}
                blockName={"Recommended album"}
                title={album.name}
                subtitle={album.publishDate.split("-")[0]}
                loading={albumLoading}
                onPress={() => {
                  setOpen({ album: album, opened: true });
                  LayoutAnimation.configureNext({
                    duration: 150,
                    update: { type: "linear", property: "opacity" },
                  });
                }}
              />
            ) : (
              <></>
            )}

            <AboutBlock
              albumName={song.albumName}
              genre={song.genreName}
              releaseDate={song.publishDate}
            />
            <View className="w-full items-center">
              <CustomButton
                text="Recommendations"
                additionalStyle={"w-[50vw]"}
                onPress={() => setRecommendationVisible(true)}
              />
            </View>
            <View className="w-full items-center mb-[25vh]">
              <CustomButton
                icon={icons.share}
                text="Share"
                additionalStyle={"w-[50vw]"}
              />
            </View>
          </ScrollView>
        )}
      </ImageBackground>
      <AlbumBlock open={open} setOpen={setOpen} />
      <PlaylistPick
        songId={id}
        isVisible={pickerVisible}
        onClose={() => setPickerVisible(false)}
      />
      <Recommendations
        songName={song.title}
        songId={id}
        isVisible={recommendationVisible}
        onClose={() => setRecommendationVisible(false)}
      />
    </>
  );
};

export default SongScreen;
