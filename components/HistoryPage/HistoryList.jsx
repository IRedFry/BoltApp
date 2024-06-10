import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import useUsersHistory from "../../hooks/useUsersHistory";
import HistoryItem from "./HistoryItem";
import { ActivityIndicator } from "react-native-paper";

const HistoryList = ({ user, isRefresh, setIsRefresh }) => {
  const { songs, loading, refetch } = useUsersHistory({ userId: user.userId });

  useEffect(() => {
    if (isRefresh) {
      refetch();
      setIsRefresh(false);
    }
  }, [isRefresh]);

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          className="h-full w-full"
          color="#FFFF62"
        />
      ) : (
        <View className="mx-10">
          <FlatList
            className="mb-16"
            data={songs}
            showsVerticalScrollIndicator={false}
            keyExtractor={() => Math.random().toString(16).slice(2)}
            renderItem={({ item }) => {
              return <HistoryItem track={item} />;
            }}
            ListHeaderComponent={() => (
              <View className="w-[80vw] justify-start border-white border-b-2 pb-2">
                <Text className="text-2xl font-pregular text-white">
                  Your history
                </Text>
              </View>
            )}
            ListEmptyComponent={() => (
              <View className="w-[80vw] mt-5 justify-center items-center pb-2">
                <Text className="text-white text-xl font-pregular">
                  You haven't recognise anything yet
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </>
  );
};

export default HistoryList;
