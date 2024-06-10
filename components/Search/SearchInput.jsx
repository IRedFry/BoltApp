import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "../../constants";
import { usePathname, router } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();

  const [query, setQuery] = useState(initialQuery || "");

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const search = () => {
    if (!query)
      return Alert.alert(
        "Missing query",
        "Please enter something to search for"
      );
    if (pathname.startsWith("/search")) router.setParams({ query });
    else router.push(`/search/${query}`);
  };

  return (
    <View className="flex flex-row items-center w-[80%] h-12 mt-5 px-2 bg-black-100 rounded-3xl border-2 border-pgray focus:border-white">
      <TextInput
        className={`flex-1 text-base text-white px-2 h-full font-pregular ${
          query === "" || query === undefined ? "" : "mb-2"
        }`}
        value={query}
        placeholder="Search by artist, song name or lyrics"
        placeholderTextColor="#797979"
        onChangeText={(e) => setQuery(e)}
        onSubmitEditing={search}
      />

      <TouchableOpacity
        className="bg-pyellow rounded-3xl w-8 h-8 items-center justify-center"
        onPress={search}
      >
        <Image source={icons.search} className="w-4 h-4" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
