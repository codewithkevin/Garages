import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { truncateString, useGetThemeColor } from "@/helpers";
import { useResponsiveScreen } from "@/hooks/useResponsiveScreen";
import { ThemedText } from "../ThemedText";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { primaryColor } from "@/constants/Colors";

export default function SectionCard() {
  const { isWhiteTheme } = useGetThemeColor();
  const { wp } = useResponsiveScreen();

  return (
    <TouchableOpacity>
      <ThemedView
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.14)",
          overflow: "hidden",
          padding: wp(4),
          width: wp(43),
          height: wp(50),
          justifyContent: "space-between",
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: wp(3),
              marginBottom: wp(3),
            }}
          >
            <Image
              source={require("@/assets/images/__mock/mockImage0.jpg")}
              style={{
                width: wp(10),
                height: wp(10),
                borderRadius: 99,
              }}
            />
            <ThemedText type="defaultSemiBold">
              {truncateString("Garage Name Garage Name", 20)}
            </ThemedText>
          </View>

          <ThemedText>
            {truncateString(
              "Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur",
              40
            )}
          </ThemedText>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: wp(3),
          }}
        >
          <ThemedView
            style={{
              borderRadius: 10,
              borderWidth: 1,
              borderColor: isWhiteTheme
                ? "rgba(0, 0, 0, 0.05)"
                : "rgba(255, 255, 255, 0.14)",
              padding: wp(2),
              flexDirection: "row",
            }}
          >
            <ThemedText type="defaultSemiBold">Rating 4.9</ThemedText>
          </ThemedView>

          <ThemedView
            style={{
              borderRadius: 99,
              borderWidth: 1,
              borderColor: isWhiteTheme
                ? "rgba(0, 0, 0, 0.05)"
                : "rgba(255, 255, 255, 0.14)",
              padding: wp(2),
            }}
          >
            <Feather name="arrow-up-right" size={wp(4)} color={primaryColor} />
          </ThemedView>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}
