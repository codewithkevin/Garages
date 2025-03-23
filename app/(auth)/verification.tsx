import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BodyScrollView } from "@/components/BodyScrollView";
import { useResponsiveScreen } from "@/hooks/useResponsiveScreen";
import { useGetThemeColor } from "@/helpers";
import Button from "@/components/ui/button";
import { router, useLocalSearchParams } from "expo-router";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { zincColors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import TextInput from "@/components/text-input";

export default function VerificationScreen() {
  const { wp, scaleFontSize } = useResponsiveScreen();
  const { isWhiteTheme } = useGetThemeColor();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const { email } = useLocalSearchParams();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <BodyScrollView
            style={{
              paddingHorizontal: wp(2),
              flex: 1,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={{
                alignItems: "flex-start",
                marginBottom: wp(10),
              }}
            >
              <Button
                onPress={() => {
                  router.back();
                }}
                variant="ghost"
              >
                <Ionicons
                  name="chevron-back"
                  size={30}
                  color={isWhiteTheme ? "black" : "white"}
                />
              </Button>
            </View>
            <View
              style={{
                paddingHorizontal: wp(4),
                alignItems: "flex-start",
                gap: wp(4),
                width: "100%",
              }}
            >
              <View
                style={{
                  backgroundColor: isWhiteTheme ? zincColors[500] : "#31363F",
                  padding: 10,
                  borderRadius: 99,
                }}
              >
                <Fontisto
                  name="email"
                  size={wp(6)}
                  color={isWhiteTheme ? zincColors[300] : "#DBD8E3"}
                />
              </View>
              <View>
                <ThemedText
                  style={{
                    lineHeight: 0,
                  }}
                  type="defaultTitle"
                >
                  Enter Code
                </ThemedText>
                <ThemedText
                  type="default"
                  style={{
                    fontSize: wp(3),
                    lineHeight: 0,
                    color: zincColors[500],
                    fontWeight: "bold",
                  }}
                >
                  We have sent a code to your email {email}
                </ThemedText>
              </View>
              <View style={{ width: "100%" }}>
                <TextInput
                  variant="filled"
                  size="lg"
                  inputStyle={{
                    fontSize: scaleFontSize(15),
                    fontWeight: "semibold",
                  }}
                  placeholder="Enter your email"
                />
              </View>
            </View>
            <View style={{ height: wp(20) }} />
          </BodyScrollView>
          <View
            style={{
              position: "absolute",
              bottom: isKeyboardVisible ? 0 : wp(10),
              left: 0,
              right: 0,
              paddingVertical: wp(4),
              alignItems: "center",
            }}
          >
            <Button
              onPress={() => router.push("/(auth)/verification")}
              size="xl"
              style={{ width: wp(90), borderRadius: wp(30) }}
            >
              Continue
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
