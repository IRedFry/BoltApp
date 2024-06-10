import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import UpperLeftButton from "../Common/UpperLeftButton";
import { icons } from "../../constants";
import CustomButton from "../Common/CustomButton";
import FormField from "../Common/FormField";
import * as ImagePicker from "expo-image-picker";
import { getImage } from "../../utility";

const CreatePlaylist = ({ userId, isVisible, onClose }) => {
  const [form, setForm] = useState({ name: "", cover: "" });
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, cover: result.assets[0].base64 });
    }
  };

  const createPlaylist = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        userId: userId,
        cover: form.cover,
      }),
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + "api/Playlist/Create",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          if (data.created != "yes") {
            Alert.alert("Error", "Can't create a playlist");
            return "error";
          }
        },
        (error) => {
          console.log(error);
          return error;
        }
      );
  };

  const submit = async () => {
    if (form.name === "") Alert.alert("Error", "Please, fill in playlist name");

    let error = await createPlaylist();
    if (!error) {
      onClose();
      Alert.alert("Success", "Playlist successfully created");
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View className="absolute w-[90vw] h-[80vh] left-[5vw] top-[10vh] bg-pgray flex-1 items-center justify-center rounded-2xl">
        <View className="w-full flex-row mt-[5vh]">
          <UpperLeftButton
            icon={icons.close}
            onPress={() => {
              setForm({ name: "", cover: "" });
              onClose();
            }}
          />
          <View className=" w-full flex-1 items-center mt-5 pr-10">
            <Text className="text-3xl font-pregular text-pyellow">
              Create playlist
            </Text>
          </View>
        </View>
        <View className="h-full w-full items-center">
          <FormField
            title={"Name"}
            placeholder={"Enter playlist name"}
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
          />

          <TouchableOpacity
            onPress={() => pickImage()}
            className="border-pyellow border-2 rounded-3xl "
          >
            {form.cover ? (
              <Image
                source={{
                  uri: getImage({ imageByte: form.cover }),
                }}
                resizeMode="cover"
                className="w-64 h-64 rounded-3xl"
              />
            ) : (
              <View className="w-[70vw] h-16 rounded-3xl justify-center items-center flex-row space-x-2">
                <View className="items-center w-full flex-row justify-center space-x-3">
                  <Image
                    source={icons.eye}
                    resizeMode="contain"
                    alt="upload"
                    className="w-6 h-6"
                  />
                  <Text className="text-white font-pregular text-lg">
                    Choose a file
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          <CustomButton
            text={"Create"}
            additionalStyle={"w-[70%]"}
            onPress={() => submit()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CreatePlaylist;
