import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import useArtistsAlbums from "../../hooks/useArtistsAlbums";
import ArtistsAlbum from "./ArtistsAlbum";
import { ActivityIndicator } from "react-native-paper";

const ArtistsAlbumsList = ({ id, setOpenAlbumBlock }) => {
  const {
    albums,
    loading: albumsLoading,
    refetch: albumsRefetch,
  } = useArtistsAlbums({ id: id });

  const numColumns = Math.ceil(albums.length / 2);

  return (
    <View className="bg-pblack">
      <Text className="font-bold text-xl text-white p-2 mb-5">Albums</Text>

      {albumsLoading ? (
        <ActivityIndicator
          size="large"
          className="h-32 w-full"
          color="#FFFF62"
        />
      ) : (
        <View>
          {albums.length === 0 ? (
            <View className="flex-1 w-full justify-center items-center pl-5 bg-pblack">
              <Text className="text-white text-xl font-pregular">
                This artist doesn't have any albums yet :{"("}
              </Text>
            </View>
          ) : (
            <>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <FlatList
                  data={albums}
                  scrollEnabled={false}
                  key={numColumns}
                  numColumns={numColumns}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <ArtistsAlbum
                      album={item}
                      setOpenAlbumBlock={setOpenAlbumBlock}
                    />
                  )}
                  ListEmptyComponent={() => (
                    <View className="flex-1 w-full justify-center items-center pl-5 bg-pblack">
                      <Text className="text-white text-xl font-pregular">
                        This artist doesn't have any albums yet :{"("}
                      </Text>
                    </View>
                  )}
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

export default ArtistsAlbumsList;
