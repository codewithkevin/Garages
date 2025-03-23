import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Keyboard,
  Alert,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useResponsiveScreen } from "@/hooks/useResponsiveScreen";
import Button from "./button";
import { ThemedText } from "../ThemedText";
import { greetingMessage } from "@/helpers";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { categoryData } from "@/__mockData/category.mock";
import { primaryColor, zincColors } from "@/constants/Colors";
import { regionsData } from "@/__mockData/regions.mock";
import { router } from "expo-router";
import TextInput from "../text-input";

export default function Header({ headerHeight }: { headerHeight: number }) {
  const { wp, scaleFontSize } = useResponsiveScreen();

  const logoutAlert = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Yes", onPress: () => console.log("Yes") },
      { text: "No", onPress: () => {}, style: "cancel" },
    ]);
  };
  return (
    <LinearGradient
      colors={[
        "rgba(0,0,0,0.2)",
        "rgba(0,0,0,0.2)",
        "rgba(0,0,0,0.2)",
        "rgba(0,0,0,0.2)",
        "rgba(0,0,0,0.2)",
        "rgba(0,0,0,0.2)",
      ]}
      start={[0.1, 0.1]}
      end={[0.9, 0.9]}
      style={{
        height: headerHeight,
        backgroundColor: primaryColor,
        borderRadius: 50,
        paddingTop: wp(15),
        gap: wp(6),
        paddingLeft: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <View
        style={[
          styles.rowSection,
          {
            paddingLeft: wp(4),
            paddingRight: wp(4),
          },
        ]}
      >
        <Button
          onPress={logoutAlert}
          style={{
            borderRadius: 30,
            backgroundColor: "rgba(255, 255, 255, 0.14)",
            backdropFilter: "blur(10px)",
            borderColor: "rgba(255, 255, 255, 0.14)",
            width: wp(12),
            height: wp(12),
          }}
          variant="outline"
        >
          <FontAwesome5 name="user-alt" size={wp(4)} color="white" />
        </Button>
        <ThemedText type="subtitle" style={{ color: "inherit" }}>
          {greetingMessage()}
        </ThemedText>
        <Button
          onPress={() => router.push("/chat/chat-preview")}
          style={{
            borderRadius: 30,
            backgroundColor: "rgba(255, 255, 255, 0.14)",
            backdropFilter: "blur(10px)",
            borderColor: "rgba(255, 255, 255, 0.14)",
            width: wp(13),
            height: wp(13),
          }}
          variant="outline"
        >
          <AntDesign name="wechat" size={wp(5)} color="white" />
        </Button>
      </View>

      <View
        style={{
          gap: wp(2),
        }}
      >
        <ThemedText
          type="defaultSemiBold"
          style={{ color: "inherit", paddingLeft: wp(4) }}
        >
          What service are you looking for?
        </ThemedText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: wp(2),
            paddingLeft: 0,
            marginLeft: 0,
          }}
          style={{
            left: 0,
          }}
        >
          {categoryData.map((category) => (
            <Button
              key={category.id}
              style={{
                borderRadius: 30,
                backgroundColor: "rgba(255, 255, 255, 0.14)",
                backdropFilter: "blur(10px)",
                borderColor: "rgba(255, 255, 255, 0.14)",
                marginLeft: category.id === categoryData[0].id ? wp(4) : 0,
              }}
              variant="outline"
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: wp(1),
                }}
              >
                <FontAwesome
                  name="dot-circle-o"
                  size={wp(4)}
                  color={zincColors[200]}
                />
                <Text style={{ color: "black", fontSize: scaleFontSize(12) }}>
                  {category.name}
                </Text>
              </View>
            </Button>
          ))}
        </ScrollView>
      </View>

      <View
        style={{
          gap: wp(2),
        }}
      >
        <ThemedText
          type="defaultSemiBold"
          style={{ color: "inherit", paddingLeft: wp(4) }}
        >
          Search
        </ThemedText>

        <View style={{ paddingHorizontal: wp(4) }}>
          <TextInput
            variant="ghost"
            containerStyle={{
              borderRadius: 20,
              backgroundColor: "white",
              backdropFilter: "blur(10px)",
              borderColor: "rgba(255, 255, 255, 0.14)",
              height: wp(11),
            }}
            inputStyle={{
              fontSize: scaleFontSize(14),
              fontWeight: "600",
            }}
            size="md"
            placeholder="Search for a service"
            rightIcon={
              <Ionicons name="search" size={wp(4)} color={zincColors[700]} />
            }
            onPress={() => {
              router.push("/search");
            }}
            autoFocus={false}
            editable={false}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rowSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
