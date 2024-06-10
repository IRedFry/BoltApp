import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import useMatchedArtists from "../../hooks/useMatchedArtists";
import MatchedArtist from "./MatchedArtist";

const MatchedArtistsList = ({ query }) => {
  const { matchedArtists, refetch, loading } = useMatchedArtists({
    query: query,
  });

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
          data={matchedArtists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <MatchedArtist artist={item} />;
          }}
          ListHeaderComponent={() => (
            <View className="w-[80vw] mt-5 justify-start border-white border-b-2 pb-2">
              <Text className="text-3xl font-pbold text-white">Artists</Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View className="w-[80vw] mt-5 justify-center items-center pb-2">
              <Text className="text-white text-xl font-pregular">
                No matches found :{"("}
              </Text>
            </View>
          )}
          refreshControl={
            <RefreshControl tintColor={"#FFFF62"} onRefresh={refetch} />
          }
        />
      )}
    </>
  );
};

export default MatchedArtistsList;
