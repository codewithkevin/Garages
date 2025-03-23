import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Keyboard,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useResponsiveScreen } from "@/hooks/useResponsiveScreen";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/ui/button";
import { AntDesign } from "@expo/vector-icons";
import { zincColors } from "@/constants/Colors";
import { useGetThemeColor } from "@/helpers";
import HorizontalCard from "@/components/ui/horizontal-card";
import Header from "@/components/ui/header";
import { router } from "expo-router";

export default function HomeScreen() {
  const { isWhiteTheme } = useGetThemeColor();
  const { wp, hp } = useResponsiveScreen();

  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const headerHeight = hp(37);

  const headerTranslateY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const isScrollingUp = currentScrollY < lastScrollY.current;

        if (isScrollingUp && !isHeaderVisible) {
          setIsHeaderVisible(true);
          Animated.spring(headerTranslateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 20,
            friction: 60,
          }).start();
        } else if (
          !isScrollingUp &&
          isHeaderVisible &&
          currentScrollY > headerHeight
        ) {
          setIsHeaderVisible(false);
          Animated.spring(headerTranslateY, {
            toValue: -headerHeight,
            useNativeDriver: true,
            tension: 100,
            friction: 12,
          }).start();
        }

        lastScrollY.current = currentScrollY;
      },
    }
  );

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          transform: [{ translateY: headerTranslateY }],
        }}
      >
        <Header headerHeight={headerHeight} />
      </Animated.View>

      <FlatList
        data={Array.from({ length: 10 })}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          paddingTop: headerHeight + wp(5),
          padding: wp(3),
          paddingBottom: wp(8),
          gap: wp(4),
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListHeaderComponent={() => (
          <View style={styles.rowSection}>
            <ThemedText type="title">Garages</ThemedText>

            <Button
              variant="outline"
              style={{
                borderRadius: 99,
                width: wp(11),
                height: wp(11),
                backgroundColor: isWhiteTheme
                  ? zincColors[50]
                  : zincColors[1000],
                borderColor: isWhiteTheme ? zincColors[50] : zincColors[1000],
              }}
              onPress={() => router.push("/(index)/filtered-list")}
            >
              <AntDesign
                name="arrowright"
                size={wp(3.5)}
                color={isWhiteTheme ? "black" : "white"}
              />
            </Button>
          </View>
        )}
        renderItem={() => <HorizontalCard />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rowSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
