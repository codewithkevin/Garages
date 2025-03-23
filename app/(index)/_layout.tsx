import React from "react";
import { Stack } from "expo-router";

export default function UserLayout() {
  return (
    <Stack
      screenOptions={{
        ...(process.env.EXPO_OS !== "ios"
          ? {}
          : {
              headerLargeTitle: true,
              headerTransparent: true,
              headerBlurEffect: "systemChromeMaterial",
              headerLargeTitleShadowVisible: false,
              headerShadowVisible: true,
              headerLargeStyle: {
                backgroundColor: "transparent",
              },
            }),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="chat/chat-preview"
        options={{
          title: "Chats",
          headerSearchBarOptions: {
            placeholder: "Search",
          },
          headerBackButtonDisplayMode: "generic",
          headerBackTitle: "Back",
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name="chat/chat-details"
        options={{
          headerShown: true,
          headerLargeTitle: false,
          title: "Chat Details",
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen name="filtered-list" />
    </Stack>
  );
}
