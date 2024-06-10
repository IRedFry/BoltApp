import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import useArtistsSongs from "../../hooks/useArtistsSongs";
import ArtistsTrack from "./ArtistsTrack";
import { ActivityIndicator } from "react-native-paper";

const ArtistsSongsList = ({ id }) => {
  const {
    songs,
    loading: songsLoading,
    refetch: songsRefetch,
  } = useArtistsSongs({ id: id });

  const numColumns = Math.ceil(songs.length / 2);

  return (
    <View className="bg-pblack">
      <Text className="font-bold text-xl text-white p-2 mb-5">Tracks</Text>

      {songsLoading ? (
        <ActivityIndicator
          size="large"
          className="h-32 w-full"
          color="#FFFF62"
        />
      ) : (
        <View>
          {songs.length === 0 ? (
            <View className="flex-1 w-full justify-center items-center pl-5 bg-pblack">
              <Text className="text-white text-xl font-pregular">
                This artist doesn't have any songs yet :{"("}
              </Text>
            </View>
          ) : (
            <>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <FlatList
                  data={songs}
                  scrollEnabled={false}
                  key={numColumns}
                  numColumns={numColumns}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <ArtistsTrack song={item} />}
                />
              </ScrollView>
              <LinearGradient
                pointerEvents="none"
                start={{ x: 0.3, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["transparent", "#1A1A1A"]}
                className="absolute left-0 right-0 top-0 h-full"
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default ArtistsSongsList;
