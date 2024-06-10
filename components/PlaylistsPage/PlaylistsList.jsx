import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import useUsersPlaylists from "../../hooks/useUsersPlaylists";
import PlaylistItem from "./PlaylistItem";
import { ActivityIndicator } from "react-native-paper";

const PlaylistList = ({ user, isRefresh, setIsRefresh }) => {
  const {
    playlists,
    loading: playlistsLoading,
    refetch: playlistsRefetch,
  } = useUsersPlaylists({ id: user.userId });

  useEffect(() => {
    if (isRefresh) {
      playlistsRefetch();
      setIsRefresh(false);
    }
  }, [isRefresh]);

  const numColumns = Math.ceil(playlists.length / 3);

  return (
    <View className="bg-pblack">
      <View className="w-full border-b-2 border-white">
        <Text className="font-pregular text-2xl text-white mb-2">
          Your playlists
        </Text>
      </View>
      {playlistsLoading ? (
        <ActivityIndicator
          size="large"
          className="h-52 w-full"
          color="#FFFF62"
        />
      ) : (
        <View>
          {playlists.length === 0 ? (
            <View className="flex-1 w-full justify-center items-center pl-5 py-8 bg-pblack">
              <Text className="text-white text-xl font-pregular">
                You don't have any playlists yet :{"("}
              </Text>
            </View>
          ) : (
            <>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                directionalLockEnabled={true}
                alwaysBounceVertical={false}
              >
                <FlatList
                  data={playlists}
                  scrollEnabled={false}
                  key={numColumns}
                  numColumns={numColumns}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <PlaylistItem playlist={item} setIsRefresh={setIsRefresh} />
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

export default PlaylistList;
