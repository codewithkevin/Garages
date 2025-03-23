import React, { useState } from "react";
import { Stack, router } from "expo-router";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Search",
          headerBackTitle: "Back",
          headerSearchBarOptions: {
            onChangeText: (e) => {
              setSearchText(e.nativeEvent.text);
            },
            placeholder: "Search",
            onSearchButtonPress: () => {
              router.push(
                `/(index)/filtered-list?searchText=${encodeURIComponent(
                  searchText
                )}`
              );
            },
          },
        }}
      />
    </>
  );
}
