import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type NotificationType = "error" | "success" | "warning" | "notify";

type NotificationProps = {
  type: NotificationType;
  message: string;
  visible: boolean;
  onDismiss?: () => void;
  duration?: number;
};

export const ToastNotification = ({
  type,
  message,
  visible,
  onDismiss,
  duration = 3000,
}: NotificationProps) => {
  const [animation] = useState(new Animated.Value(0));

  const getConfig = () => {
    switch (type) {
      case "error":
        return {
          backgroundColor: "#F56565",
          icon: "alert-circle",
          color: "white",
        };
      case "success":
        return {
          backgroundColor: "#48BB78",
          icon: "checkmark-circle",
          color: "white",
        };
      case "warning":
        return {
          backgroundColor: "#ED8936",
          icon: "warning",
          color: "white",
        };
      case "notify":
        return {
          backgroundColor: "#E2E8F0",
          icon: "information-circle",
          color: "black",
        };
      default:
        return {
          backgroundColor: "#F56565",
          icon: "alert-circle",
          color: "white",
        };
    }
  };

  const config = getConfig();

  useEffect(() => {
    if (visible) {
      Animated.spring(animation, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();

      if (duration > 0 && onDismiss) {
        const timer = setTimeout(() => {
          dismiss();
        }, duration);
        return () => clearTimeout(timer);
      }
    } else {
      dismiss();
    }
  }, [visible]);

  const dismiss = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onDismiss) onDismiss();
    });
  };

  const animatedStyle = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 0],
        }),
      },
    ],
  };

  if (!visible && (animation as any)._value === 0) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        { backgroundColor: config.backgroundColor },
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={config.icon as React.ComponentProps<typeof Ionicons>["name"]}
          size={24}
          color={config.color}
        />
      </View>
      <Text style={[styles.message, { color: config.color }]}>{message}</Text>
      <TouchableOpacity style={styles.closeButton} onPress={dismiss}>
        <Ionicons name="close" size={20} color={config.color} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
  },
  iconContainer: {
    marginRight: 10,
  },
  message: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  closeButton: {
    padding: 5,
  },
});
