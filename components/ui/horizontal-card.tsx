import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { primaryColor, zincColors } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useGetThemeColor } from "@/helpers";
import { useResponsiveScreen } from "@/hooks/useResponsiveScreen";
import { ThemedView } from "../ThemedView";

export default function HorizontalCard() {
  const { isWhiteTheme } = useGetThemeColor();
  const { wp } = useResponsiveScreen();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          borderColor: isWhiteTheme
            ? "rgba(0, 0, 0, 0.05)"
            : "rgba(255, 255, 255, 0.14)",
        },
      ]}
    >
      <ThemedView
        style={{
          padding: wp(4),
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: wp(3),
        }}
      >
        <Image
          source={require("@/assets/images/__mock/mockImage0.jpg")}
          style={{
            width: wp(30),
            height: wp(35),
            borderRadius: 20,
          }}
        />

        <View
          style={{
            gap: wp(2),
            flex: 1,
          }}
        >
          <ThemedText type="subtitle">Garage Name</ThemedText>
          <View style={[styles.rowSection, { gap: wp(2) }]}>
            <View style={[styles.rowSection, { gap: wp(1) }]}>
              <Entypo name="location" size={wp(4)} color={primaryColor} />
              <ThemedText type="defaultSemiBold">Location</ThemedText>
            </View>

            <View style={[styles.rowSection, { gap: wp(1) }]}>
              <MaterialIcons
                name="generating-tokens"
                size={wp(4)}
                color={primaryColor}
              />
              <ThemedText type="defaultSemiBold">Rating 4.9</ThemedText>
            </View>
          </View>

          {/* Description text positioned at the end of the content view with fixed width */}
          <View style={{ width: "100%", marginTop: wp(2) }}>
            <ThemedText style={{ width: "100%", maxWidth: wp(70) }}>
              Meet Garage highly skilled with over 10 years of experience
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rowSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
  },
});
