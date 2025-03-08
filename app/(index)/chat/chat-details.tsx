import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BodyFlatList } from "@/components/BodyFlatList";
import { useResponsiveScreen } from "@/hooks/useResponsiveScreen";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TextInput from "@/components/text-input";
import { emerald, primaryColor } from "@/constants/Colors";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

export default function ChatDetailScreen() {
  const { wp } = useResponsiveScreen();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How are you?",
      sender: "other",
      timestamp: "10:30 AM",
    },
  ]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;
    const newMessage: Message = {
      id: String(messages.length + 1),
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [newMessage, ...prev]);
    setText("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView
            style={[
              {
                maxWidth: wp(85),
                padding: wp(3),
                borderRadius: wp(2),
              },
              item.sender === "user" ? styles.userBubble : styles.otherBubble,
            ]}
          >
            <ThemedText>{item.text}</ThemedText>
            <ThemedText style={styles.timestamp}>{item.timestamp}</ThemedText>
          </ThemedView>
        )}
        contentContainerStyle={{ padding: wp(3), gap: wp(4) }}
        inverted
      />

      <ThemedView
        style={[
          {
            padding: wp(5),
            gap: wp(3),
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        <TextInput
          containerStyle={styles.input}
          placeholder="Type a message"
          value={text}
          onChangeText={setText}
          variant="outlined"
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: emerald[900],
            padding: wp(3),
            height: wp(10),
            width: wp(10),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: wp(10),
          }}
        >
          <Ionicons name="send" size={wp(4)} color="#fff" />
        </TouchableOpacity>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: emerald[900],
  },
  otherBubble: {
    alignSelf: "flex-start",
  },
  timestamp: {
    fontSize: 10,
    color: "#ccc",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
});
