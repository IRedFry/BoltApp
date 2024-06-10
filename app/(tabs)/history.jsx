import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UpperLeftButton from "../../components/Common/UpperLeftButton";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import PleaseEnterAccount from "../../components/Common/PleaseEnterAccount";
import HistoryList from "../../components/HistoryPage/HistoryList";
import { router } from "expo-router";
import { Button } from "react-native-paper";
import CustomButton from "../../components/Common/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const History = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
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
          <Text className="text-3xl font-pregular text-pyellow">History</Text>
        </View>
      </View>
      {user != null && user.userName != "" ? (
        <>
          <View className="h-full w-full">
            <View className="w-full items-center">
              <HistoryList
                user={user}
                isRefresh={isRefresh}
                setIsRefresh={setIsRefresh}
              />
            </View>
          </View>
        </>
      ) : (
        <>
          <PleaseEnterAccount subtext={"To see your recognition history"} />
        </>
      )}

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

export default History;
