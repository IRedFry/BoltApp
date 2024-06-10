import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../../components/Search/SearchInput";
import MatchedSongsList from "../../../components/Search/MatchedSongsList";
import MatchedArtistsList from "../../../components/Search/MatchedArtistsList";
import { ScrollView, RefreshControl } from "react-native";

const Search = () => {
  const { query } = useLocalSearchParams();

  return (
    <SafeAreaView className="bg-pblack w-full h-full items-center">
      <SearchInput initialQuery={query} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl tintColor={"#FFFF62"} />}
      >
        <MatchedSongsList query={query} />
        <MatchedArtistsList query={query} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
