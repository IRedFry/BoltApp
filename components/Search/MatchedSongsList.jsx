import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect } from "react";
import useMatchedSongs from "../../hooks/useMatchedSongs";
import MatchedSong from "../Search/MatchedSong";

const MatchedSongsList = ({ query }) => {
  const { matchedSongs, refetch, loading } = useMatchedSongs({ query: query });

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          className="h-full w-full"
          color="#FFFF62"
        />
      ) : (
        <FlatList
          className="mb-5 mx-5"
          scrollEnabled={false}
          data={matchedSongs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <MatchedSong song={item} />;
          }}
          ListHeaderComponent={() => (
            <View className="w-[80vw] mt-5 justify-start border-white border-b-2 pb-2">
              <Text className="text-3xl font-pbold text-white">Tracks</Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="w-[80vw] mt-5 justify-center items-center pb-2">
              <Text className="text-white text-xl font-pregular">
                No matches found :{"("}
              </Text>
            </View>
          )}
        />
      )}
    </>
  );
};

export default MatchedSongsList;
