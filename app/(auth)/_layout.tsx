import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const isUser = true;

  if (isUser) {
    return <Redirect href="/(index)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="authSheet"
        options={{
          headerShown: false,
          sheetGrabberVisible: true,
        }}
      />
      <Stack.Screen
        name="verification"
        options={{
          headerShown: false,
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
