import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UpperLeftButton from "../../components/Common/UpperLeftButton";
import { icons } from "../../constants";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from "../../components/Common/FormField";
import CustomButton from "../../components/Common/CustomButton";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser, setIsLogged } = useGlobalContext();

  const login = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        rememberMe: true,
      }),
    };

    return await fetch(
      process.env.EXPO_PUBLIC_SERVER_API + "api/Account/Login",
      requestOptions
    )
      .then((response) => {
        response.status === 200 &&
          setUser({
            isAuthenticated: true,
            userName: "",
            userRole: "",
            userId: -1,
          });

        return response.json();
      })
      .then(
        (data) => {
          if (
            typeof data != "undefined" &&
            typeof data.userName != "undefined"
          ) {
            console.log(data);
            setUser({
              isAuthenticated: true,
              userName: data.userName,
              userRole: data.userRole,
              userId: data.userId,
            });
            setIsLogged(true);
            router.back();
          } else {
            Alert.alert("Error", "Wrong login or password");
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
    if (form.email === "" || form.password === "")
      Alert.alert("Error", "Please, fill in all fields");

    let error = await login();
    if (!error) Alert.alert("Success", "You signed in successfully");
  };

  return (
    <SafeAreaView className="bg-pblack w-full h-full items-center">
      <View className="flex-1 w-full flex-row">
        <UpperLeftButton icon={icons.close} onPress={() => router.back()} />
        <View className="w-full flex-1 items-center mt-5 pr-10">
          <Text className="text-3xl font-pregular text-pyellow">
            Sign in to Bolt
          </Text>
        </View>
      </View>
      <ScrollView className="w-full overflow-visible pb-32">
        <FormField
          title={"Login"}
          value={form.email}
          placeholder={"Enter your login"}
          handleChangeText={(e) => {
            setForm({ ...form, email: e });
          }}
          keyboardType="email-address"
        />
        <FormField
          title={"Password"}
          value={form.password}
          placeholder={"Enter your password"}
          handleChangeText={(e) => {
            setForm({ ...form, password: e });
          }}
        />

        <CustomButton
          text={"Sign in"}
          additionalStyle={"mx-16 rounded-3xl h-14"}
          onPress={() => submit()}
        />
        <CustomButton
          text={"Don't have an account?"}
          additionalStyle={"mx-16 rounded-3xl h-14 bg-transparent"}
          additionalTextStyle={"text-pyellow font-plight"}
          onPress={() => router.push("/sign-up")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
