import { View, Text, LayoutAnimation, Platform, UIManager } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import CustomButton from "../../components/Common/CustomButton";

const ArtistAboutBlock = ({ description }) => {
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const [isMore, setIsMore] = useState(false);

  const lessHeightStyle = "max-h-[23vh]";
  const moreHeightStyle = "h-full";

  return (
    <View className="w-full mt-10 flex-1 bg-zinc-700">
      <Text className="font-bold text-xl text-white p-2">About</Text>
      <Text
        className={`font-plight mb-10 text-base text-white p-2 ${
          isMore ? moreHeightStyle : lessHeightStyle
        }`}
      >
        {description}
      </Text>
      {isMore ? (
        <></>
      ) : (
        <LinearGradient
          colors={["transparent", "#1A1A1A"]}
          className="absolute left-0 right-0 top-0 h-full"
        />
      )}

      <View className="w-full h-full flex-1 items-end absolute justify-end">
        <CustomButton
          onPress={() => {
            setIsMore((prev) => !prev);
            // LayoutAnimation.configureNext({
            //   duration: 200,
            //   update: { type: "linear", property: "opacity" },
            // });
          }}
          text={isMore ? "Less" : "More"}
          additionalStyle={"min-w-0 w-20 rounded-full mr-5 mb-5"}
        />
      </View>
    </View>
  );
};

export default ArtistAboutBlock;
