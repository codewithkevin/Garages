import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Button from "@/components/ui/button";
import { useResponsiveScreen } from "@/hooks/useResponsiveScreen";
import { primaryColor } from "@/constants/Colors";
import { router } from "expo-router";
import { UserRoles } from "@/types/user.type";

export default function WelcomeScreen() {
  const { wp } = useResponsiveScreen();
  const handleUser = () => {
    router.push({
      pathname: "/(auth)/authSheet",
      params: {
        title: UserRoles.user,
      },
    });
  };

  const handleSeller = () => {
    router.push({
      pathname: "/(auth)/authSheet",
      params: {
        title: UserRoles.seller,
      },
    });
  };

  const handleTermsPress = () => {
    console.log("Terms of use pressed");
    // Open terms of use page
  };

  const handlePrivacyPress = () => {
    console.log("Privacy policy pressed");
    // Open privacy policy page
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/736x/83/f8/9d/83f89dbc7105db091202f64b42d05ab0.jpg",
        }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.7)", "rgba(26, 42, 54, 0.85)"]}
          style={styles.gradientOverlay}
        >
          {/* Header/Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Garages</Text>
          </View>

          {/* Main content area */}
          <View style={styles.mainContent}>
            <Text style={styles.titleText}>
              Your Home{"\n"}
              for<Text style={{ color: primaryColor }}> Auto Care</Text>
            </Text>

            <View
              style={{
                gap: wp(4),
              }}
            >
              <Button
                onPress={handleUser}
                size="lg"
                style={{ backgroundColor: "white" }}
              >
                <Text
                  style={{
                    color: "#000",
                  }}
                >
                  Continue as user
                </Text>
              </Button>

              <Button
                style={styles.secondaryButton}
                onPress={handleSeller}
                size="lg"
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Set up a garage
                </Text>
              </Button>
            </View>

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By proceeding to use Garages, you agree to our{" "}
                <Text style={styles.termsLink} onPress={handleTermsPress}>
                  terms of use
                </Text>{" "}
                and acknowledge that you have read our{" "}
                <Text style={styles.termsLink} onPress={handlePrivacyPress}>
                  privacy policy
                </Text>
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a2a36",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  logoText: {
    color: primaryColor,
    fontSize: 28,
    fontWeight: "700",
  },
  mainContent: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: "#FF8C00",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 30,
  },
  secondaryButtonText: {
    color: "white",
    fontSize: 18,
  },
  termsContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  termsText: {
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    color: "white",
    fontWeight: "500",
  },
  bottomIndicator: {
    width: 60,
    height: 5,
    backgroundColor: "white",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
});
