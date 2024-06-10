import { View, Text, ScrollView, RefreshControl, Modal } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UpperLeftButton from "../../components/Common/UpperLeftButton";
import { icons } from "../../constants";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import PleaseEnterAccount from "../../components/Common/PleaseEnterAccount";
import PlaylistList from "../../components/PlaylistsPage/PlaylistsList";
import CustomButton from "../../components/Common/CustomButton";
import CreatePlaylist from "../../components/PlaylistsPage/CreatePlaylist";

const Playlists = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [modal, setModal] = useState(false);

  const logout = async () => {
    const requestOptions = {
      method: "POST",
    };
    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + "api/Account/Logoff",
      requestOptions
    ).then((response) => {
      console.log(response.json());
      setUser({
        isAuthenticated: false,
        userName: "",
        userRole: "",
        userId: -1,
      });
      setModal(false);
      setIsLogged(false);
      router.replace("/");
    });
  };

  return (
    <SafeAreaView className="bg-pblack w-full h-full items-center flex-1">
      <View className="w-full flex-row min-h-[10vh] playlists">
        {user.userName == "" ? (
          <UpperLeftButton
            icon={icons.account}
            onPress={() => router.push("/sign-in")}
          />
        ) : (
          <UpperLeftButton icon={icons.logout} onPress={() => setModal(true)} />
        )}
        <View className="w-full flex-1 items-center mt-5 pr-10">
          <Text className="text-3xl font-pregular text-pyellow">Playlists</Text>
        </View>
      </View>
      {user != null && user.userName != "" ? (
        <>
          <View className="h-full w-full">
            <View className="mx-10">
              <ScrollView
                showsVerticalScrollIndicator={false}
                directionalLockEnabled={true}
                alwaysBounceHorizontal={false}
                refreshControl={
                  <RefreshControl
                    tintColor={"#FFFF62"}
                    onRefresh={() => setIsRefresh(true)}
                  />
                }
              >
                <PlaylistList
                  user={user}
                  isRefresh={isRefresh}
                  setIsRefresh={setIsRefresh}
                />
              </ScrollView>
            </View>
            <View className="w-full items-center">
              <CustomButton
                text={"Create playlist"}
                additionalStyle={"w-[70vw]"}
                onPress={() => {
                  setModalVisible(true);
                }}
              />
            </View>
          </View>
        </>
      ) : (
        <>
          <PleaseEnterAccount subtext={"To manage your playlists"} />
        </>
      )}

      <CreatePlaylist
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        userId={user.userId}
      />

      <Modal animationType="slide" transparent={true} visible={modal}>
        <View className="h-full w-full flex-1 justify-center items-center">
          <View className="h-[20%] w-[60%] bg-pgray rounded-3xl items-center">
            <Text className="text-white font-pbold text-lg mt-2">
              You sure you want to quit?
            </Text>
            <CustomButton text={"No"} onPress={() => setModal(false)} />
            <CustomButton
              text={"Yes"}
              additionalStyle={"mx-16 rounded-3xl bg-transparent"}
              additionalTextStyle={"text-pyellow font-plight"}
              onPress={() => logout()}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Playlists;
