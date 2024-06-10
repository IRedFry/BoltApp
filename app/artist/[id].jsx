import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";

import useArtist from "../../hooks/useArtist";
import useArtistsLastRelease from "../../hooks/useArtistsLastRelease";

import { ActivityIndicator } from "react-native-paper";
import { getImage } from "../../utility";
import { LinearGradient } from "expo-linear-gradient";
import { icons } from "../../constants";
import CustomButton from "../../components/Common/CustomButton";
import ArtistAboutBlock from "../../components/ArtistPage/ArtistAboutBlock";
import ArtistsSongsList from "../../components/ArtistPage/ArtistsSongsList";
import OneItemBlock from "../../components/Common/OneItemBlock";
import ArtistsAlbumsList from "../../components/ArtistPage/ArtistsAlbumsList";
import AlbumBlock from "../../components/ArtistPage/AlbumBlock";

const ArtistScreen = () => {
  const { id } = useLocalSearchParams();

  const { artist, loading } = useArtist({ id });
  const [open, setOpen] = useState({ album: {}, opened: false });

  const {
    lastRelease,
    loading: lastReleaseLoading,
    refetch: lastReleaseRefetch,
  } = useArtistsLastRelease({ id: id });

  useEffect(() => {
    lastReleaseRefetch();
  }, [loading]);

  const cover = getImage({ imageByte: artist.cover });

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

        <TouchableOpacity
          className="mt-[80] ml-3 w-12 h-12 justify-center items-center"
          onPress={() => {
            router.back();
          }}
        >
          <Image
            source={icons.close}
            className=" w-10 h-10"
            resizeMode="contain"
          />
        </TouchableOpacity>

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
                {artist.name}
              </Text>
            </View>

            <ArtistAboutBlock description={artist.description} />
            <ArtistsSongsList id={id} />
            {lastRelease.id != undefined ? (
              <OneItemBlock
                image={getImage({ imageByte: lastRelease.cover })}
                blockName={"Last release"}
                title={lastRelease.title}
                subtitle={lastRelease.publishDate?.split("-")[0]}
                onPress={() => {
                  router.push(`/song/${lastRelease.id}`);
                }}
              />
            ) : (
              <></>
            )}

            <ArtistsAlbumsList id={id} setOpenAlbumBlock={setOpen} />

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
    </>
  );
};

export default ArtistScreen;
