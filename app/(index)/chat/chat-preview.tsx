// app/index.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { BodyFlatList } from "@/components/BodyFlatList";
import { primaryColor } from "@/constants/Colors";
import { useResponsiveScreen } from "@/hooks/useResponsiveScreen";

// Types for our chat data
interface ChatPreview {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
}

// Sample data for chat previews
const chatPreviews: ChatPreview[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: require("@/assets/images/__mock/mockImage0.jpg"),
    lastMessage: "Are we still meeting tomorrow?",
    time: "10:42 AM",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: require("@/assets/images/__mock/mockImage0.jpg"),
    lastMessage: "I sent you the files you requested",
    time: "Yesterday",
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Team Alpha",
    avatar: require("@/assets/images/__mock/mockImage0.jpg"),
    lastMessage: "John: Let's discuss this at the meeting",
    time: "Yesterday",
    unreadCount: 5,
  },
  {
    id: "4",
    name: "Lisa Wright",
    avatar: require("@/assets/images/__mock/mockImage0.jpg"),
    lastMessage: "Thanks for your help!",
    time: "Mar 6",
    unreadCount: 0,
  },
  {
    id: "5",
    name: "David Martinez",
    avatar: require("@/assets/images/__mock/mockImage0.jpg"),
    lastMessage: "The project deadline has been extended",
    time: "Mar 5",
    unreadCount: 0,
  },
  {
    id: "6",
    name: "Sophie Taylor",
    avatar: require("@/assets/images/__mock/mockImage0.jpg"),
    lastMessage: "Did you see the latest update?",
    time: "Mar 3",
    unreadCount: 0,
  },
  {
    id: "7",
    name: "Alex Morgan",
    avatar: require("@/assets/images/__mock/mockImage0.jpg"),
    lastMessage: "Let me know when you're free to talk",
    time: "Feb 28",
    unreadCount: 0,
  },
];

export default function ChatListScreen() {
  const { wp } = useResponsiveScreen();
  const router = useRouter();

  const navigateToChat = () => {
    router.push(`/chat/chat-details`);
  };

  const renderChatItem = ({ item }: { item: ChatPreview }) => (
    <TouchableOpacity
      style={[
        styles.chatItem,
        {
          gap: wp(3),
          padding: wp(3),
        },
      ]}
      onPress={() => navigateToChat()}
      activeOpacity={0.7}
    >
      <Image
        source={item.avatar as any}
        style={{
          width: wp(13),
          height: wp(13),
          borderRadius: 30,
        }}
      />

      <View
        style={[
          styles.chatContent,
          {
            paddingBottom: wp(4),
          },
        ]}
      >
        <View style={styles.chatHeader}>
          <ThemedText style={styles.chatName} numberOfLines={1}>
            {item.name}
          </ThemedText>
          <ThemedText style={styles.chatTime}>{item.time}</ThemedText>
        </View>

        <View style={styles.chatFooter}>
          <ThemedText style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </ThemedText>
          {item.unreadCount > 0 && (
            <View
              style={[
                styles.unreadBadge,
                {
                  borderRadius: 99,
                  width: wp(6),
                  height: wp(6),
                },
              ]}
            >
              <Text
                style={[
                  styles.unreadCount,
                  {
                    fontSize: wp(3),
                  },
                ]}
              >
                {item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <BodyFlatList
        data={chatPreviews}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: wp(3),
          paddingBottom: wp(8),
        }}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatContent: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E0E0E0",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  chatTime: {
    fontSize: 12,
  },
  chatFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: primaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadCount: {
    fontWeight: "600",
  },
});
