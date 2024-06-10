import { View, Text, Image, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import { StatusBar } from "expo-status-bar";

const TabIcon = ({ icon, color, focused, isLast }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseOut = () => {
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.2,
        duration: 65,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1.0,
        duration: 65,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (focused) pulseOut();
    return () => {
      pulseAnim.resetAnimation();
    };
  });

  return (
    <View className="flex-row items-center justify-space-between">
      <Animated.View
        style={{ transform: [{ scale: pulseAnim }] }}
        className="items-center justify-space-between gap-2"
      >
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className="w-10 h-10"
        />
      </Animated.View>
      {!isLast ? (
        <Text className="color-pyellow pl-[33%] text-4xl">|</Text>
      ) : (
        <Text className="color-pyellow pl-[33%] text-4xl"></Text>
      )}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          unmountOnBlur: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFFF62",
          tabBarInactiveTintColor: "#FFFFFF",
          tabBarStyle: {
            backgroundColor: "#282828",
            border: 1,
            borderTopWidth: 0,
            alignContent: "center",
            justifyContent: "space-between",
            paddingLeft: "10%",
          },
        }}
      >
        <Tabs.Screen
          name="history"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return (
                <>
                  <TabIcon
                    icon={icons.history}
                    color={color}
                    focused={focused}
                  />
                </>
              );
            },
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.playlists}
                color={color}
                focused={focused}
                isLast={true}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search/[query]"
          options={{
            headerShown: false,
            href: null,
          }}
        />
      </Tabs>

      <StatusBar style="light"></StatusBar>
    </>
  );
};

export default TabsLayout;
