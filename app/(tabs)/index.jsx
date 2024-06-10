import { View, Text, TouchableOpacity, Alert, Animated } from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/Search/SearchInput";
import { images } from "../../constants";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import * as DocumentPicker from "expo-document-picker";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const Home = () => {
  const { user } = useGlobalContext();

  const openPicker = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
      multiple: false,
    });

    if (!result.canceled) {
      let uri = result.assets[0].uri;

      const file = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const { sound } = await Audio.Sound.createAsync({ uri: uri });

      let status = await sound.getStatusAsync();

      if (status.durationMillis > 15000) {
        Alert.alert("Error", "Audio is too big!");
        return;
      }

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.userName != "" ? user.userId : -1,
          base64: file,
        }),
      };

      setIsWaiting(true);
      startSpinAnimation();
      return await fetch(
        process.env.EXPO_PUBLIC_SERVER_API + "api/Recognition",
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then(
          (data) => {
            if (data.created != "yes") {
              console.log(data);
              Alert.alert("Error", "Can't upload file");
              return "error";
            } else {
              router.push(`/song/${data.trackId}`);
            }

            setIsWaiting(false);
            spinAnim.resetAnimation();
          },
          (error) => {
            setIsWaiting(false);
            spinAnim.resetAnimation();
            console.log(error);
            return error;
          }
        );
    }
    setIsPicking(false);
  };

  const longPress = Gesture.LongPress()
    .runOnJS(true)
    .onStart(() => {
      setIsPicking(true);
      openPicker().then(() => setIsPicking(false));
    });

  const [recording, setRecording] = useState(false);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [isWaiting, setIsWaiting] = useState(false);
  const [isPicking, setIsPicking] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const spinAnim = useRef(new Animated.Value(0.0)).current;

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  };

  startSpinAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinAnim, {
          toValue: 1.0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  };

  const startRecording = async () => {
    try {
      if (permissionResponse.status !== "granted") {
        await requestPermission();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      startPulseAnimation();
    } catch (error) {
      Alert.alert("Failded to start recording", err);
    }
  };

  const stopRecording = async () => {
    setRecording(false);
    pulseAnim.resetAnimation();
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const uri = recording.getURI();
    const file = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.userName != "" ? user.userId : -1,
        base64: file,
      }),
    };

    setIsWaiting(true);
    startSpinAnimation();
    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + "api/Recognition",
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          if (data.created != "yes") {
            console.log(data);
            Alert.alert("Error", "Can't upload file");
            return "error";
          } else {
            router.push(`/song/${data.trackId}`);
          }

          setIsWaiting(false);
          spinAnim.resetAnimation();
        },
        (error) => {
          setIsWaiting(false);
          spinAnim.resetAnimation();
          console.log(error);
          return error;
        }
      );
  };

  return (
    <SafeAreaView className="bg-pblack w-full h-full items-center">
      <SearchInput />
      <View className="flex items-center justify-center h-full w-full">
        <GestureDetector gesture={longPress}>
          <TouchableOpacity
            onPress={() => {
              !isPicking
                ? recording || isWaiting
                  ? stopRecording()
                  : startRecording()
                : {};
            }}
          >
            <Animated.Image
              style={{ transform: [{ rotate: spin }, { scale: pulseAnim }] }}
              source={images.recButton}
              resizeMode="contain"
              className="w-50 h-50 "
            />
          </TouchableOpacity>
        </GestureDetector>

        <Text className="align-center color-pyellow mt-5 font-plight text-base">
          {isWaiting
            ? "Trying to guess this song"
            : "Press to reckognise the song"}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
