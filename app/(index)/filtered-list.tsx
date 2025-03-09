import { View, ScrollView } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { BodySectionList } from "@/components/BodySectionList";
import { ThemedText } from "@/components/ThemedText";
import { Stack } from "expo-router";
import { categoryData } from "@/__mockData/category.mock";
import { useResponsiveScreen } from "@/hooks/useResponsiveScreen";
import Button from "@/components/ui/button";
import { BodyFlatList } from "@/components/BodyFlatList";
import SectionCard from "@/components/ui/section-card";
import { CategoryI } from "@/types/category.types";
import { useGetThemeColor } from "@/helpers";
import { primaryColor } from "@/constants/Colors";

const allCategoryData = [
  {
    id: 0,
    name: "Available Services",
  },
  ...categoryData,
];

export default function FilteredList() {
  const { isWhiteTheme } = useGetThemeColor();
  const { wp } = useResponsiveScreen();
  const [selectedCategory, setSelectedCategory] = useState<CategoryI>(
    allCategoryData[0]
  );
  const scrollViewRef = useRef<ScrollView>(null);

  const handleCategoryChange = (category: CategoryI) => {
    setSelectedCategory(category);
  };

  const getOrderedCategories = () => {
    if (selectedCategory.id === 0) {
      return allCategoryData;
    }

    return [
      selectedCategory,
      ...allCategoryData.filter((cat) => cat.id !== selectedCategory.id),
    ];
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    }
  }, [selectedCategory]);

  const sections = [
    {
      title: "header",
      data: [null],
      renderItem: () => {
        const orderedCategories = getOrderedCategories();

        return (
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: wp(2),
              marginBottom: wp(3),
            }}
          >
            {orderedCategories.map((category, index) => (
              <Button
                onPress={() => handleCategoryChange(category)}
                key={category.id}
                style={{
                  borderRadius: 30,
                  backgroundColor:
                    selectedCategory.id === category.id
                      ? primaryColor
                      : isWhiteTheme
                      ? "rgba(0, 0, 0, 0.05)"
                      : "rgba(255, 255, 255, 0.14)",
                  backdropFilter: "blur(10px)",
                  borderColor: isWhiteTheme
                    ? "rgba(0, 0, 0, 0.05)"
                    : "rgba(255, 255, 255, 0.14)",
                  marginLeft: index === 0 ? wp(5) : wp(1),
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
                  <ThemedText
                    type={
                      selectedCategory.id === category.id
                        ? "defaultSemiBold"
                        : "default"
                    }
                    style={{
                      color:
                        selectedCategory.id === category.id
                          ? "black"
                          : isWhiteTheme
                          ? "black"
                          : "white",
                    }}
                  >
                    {category.name}
                  </ThemedText>
                </View>
              </Button>
            ))}
          </ScrollView>
        );
      },
    },
    {
      title: "list",
      data: [null],
      renderItem: () => {
        return (
          <BodyFlatList
            data={categoryData}
            renderItem={({ item, index }) => <SectionCard />}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              padding: wp(4),
              gap: wp(4),
              justifyContent: "center",
            }}
          />
        );
      },
    },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Garages",
          headerBackTitle: "Back",
          headerLargeTitle: false,
        }}
      />

      <BodySectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        stickySectionHeadersEnabled={false}
        containerStyle={{ paddingVertical: wp(5), flexGrow: 1 }}
      />
    </>
  );
}
