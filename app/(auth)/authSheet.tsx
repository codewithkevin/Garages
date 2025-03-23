import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, FC, ReactNode } from "react";
import { BodyScrollView } from "@/components/BodyScrollView";
import { ThemedText } from "@/components/ThemedText";
import { useResponsiveScreen } from "@/hooks/useResponsiveScreen";
import Button from "@/components/ui/button";
import TextInput from "@/components/text-input";
import { zincColors } from "@/constants/Colors";
import { Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useGetThemeColor } from "@/helpers";
import { router, useLocalSearchParams } from "expo-router";
import { SellerFormData, UserFormData, UserRoles } from "@/types/user.type";
import { FormikProps, useFormik } from "formik";
import {
  sellerValidationSchema,
  userValidationSchema,
} from "@/validation/authSchema";

interface AuthLayoutProps {
  children: ReactNode;
  isKeyboardVisible?: boolean;
  title: string;
  subtitle: string;
  icon: ReactNode;
  showBackButton?: boolean;
  onContinue: () => void;
  isContinueDisabled: boolean;
}

interface AuthFormProps<T> {
  formik: FormikProps<T>;
}

interface ContinueButtonProps {
  onPress: () => void;
  disabled: boolean;
}

interface VerificationFormProps {
  email: string;
}

type RouteParams = {
  title?: string;
  email?: string;
};

const AuthLayout: FC<AuthLayoutProps> = ({
  children,
  isKeyboardVisible = false,
  title,
  subtitle,
  icon,
  showBackButton = true,
  onContinue,
  isContinueDisabled,
}) => {
  const { wp } = useResponsiveScreen();
  const { isWhiteTheme } = useGetThemeColor();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <BodyScrollView
            style={styles.scrollView}
            keyboardShouldPersistTaps="handled"
          >
            {showBackButton && (
              <View style={styles.backButtonContainer}>
                <Button onPress={() => router.back()} variant="ghost">
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color={isWhiteTheme ? "black" : "white"}
                  />
                </Button>
              </View>
            )}

            <View style={styles.contentContainer}>
              <View
                style={{
                  backgroundColor: isWhiteTheme ? zincColors[500] : "#31363F",
                  padding: 10,
                  borderRadius: 99,
                }}
              >
                {icon}
              </View>

              <View>
                <ThemedText style={{ lineHeight: 0 }} type="defaultTitle">
                  {title}
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
                  {subtitle}
                </ThemedText>
              </View>

              {children}
            </View>
            <View style={{ height: wp(20) }} />
          </BodyScrollView>
        </View>
      </TouchableWithoutFeedback>

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
        <ContinueButton onPress={onContinue} disabled={isContinueDisabled} />
      </View>
    </KeyboardAvoidingView>
  );
};

const ContinueButton: FC<ContinueButtonProps> = ({ onPress, disabled }) => {
  const { wp } = useResponsiveScreen();

  return (
    <Button
      onPress={onPress}
      size="xl"
      style={{ width: wp(90), borderRadius: wp(30) }}
      disabled={disabled}
    >
      Continue
    </Button>
  );
};

const UserAuthForm: FC<AuthFormProps<UserFormData>> = ({ formik }) => {
  const { wp, scaleFontSize } = useResponsiveScreen();

  return (
    <View style={{ width: "100%", marginTop: wp(5), gap: wp(4) }}>
      <TextInput
        variant="filled"
        size="lg"
        inputStyle={{
          fontSize: scaleFontSize(15),
          fontWeight: "semibold",
        }}
        placeholder="Enter your name"
        label="Name"
        value={formik.values.name}
        onChangeText={formik.handleChange("name")}
        onBlur={formik.handleBlur("name")}
        error={formik.touched.name && formik.errors.name}
      />

      <TextInput
        variant="filled"
        size="lg"
        inputStyle={{
          fontSize: scaleFontSize(15),
          fontWeight: "semibold",
        }}
        placeholder="Enter your email"
        label="Email"
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        error={formik.touched.email && formik.errors.email}
      />
    </View>
  );
};

const SellerAuthForm: FC<AuthFormProps<SellerFormData>> = ({ formik }) => {
  const { wp, scaleFontSize } = useResponsiveScreen();

  return (
    <View style={{ width: "100%", marginTop: wp(4), gap: wp(3) }}>
      <TextInput
        variant="filled"
        size="lg"
        inputStyle={{
          fontSize: scaleFontSize(15),
          fontWeight: "semibold",
        }}
        placeholder="Enter your garage name"
        label="Garage Name"
        value={formik.values.garageName}
        onChangeText={formik.handleChange("garageName")}
        onBlur={formik.handleBlur("garageName")}
        error={formik.touched.garageName && formik.errors.garageName}
      />

      <TextInput
        variant="filled"
        size="lg"
        inputStyle={{
          fontSize: scaleFontSize(15),
          fontWeight: "semibold",
        }}
        placeholder="Enter your email"
        label="Email"
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        keyboardType="email-address"
        error={formik.touched.email && formik.errors.email}
      />

      <TextInput
        variant="filled"
        size="lg"
        inputStyle={{
          fontSize: scaleFontSize(15),
          fontWeight: "semibold",
        }}
        placeholder="Enter your phone number"
        label="Phone Number"
        value={formik.values.contactNumber}
        onChangeText={formik.handleChange("contactNumber")}
        onBlur={formik.handleBlur("contactNumber")}
        keyboardType="phone-pad"
        error={formik.touched.contactNumber && formik.errors.contactNumber}
      />

      <TextInput
        variant="filled"
        size="lg"
        inputStyle={{
          fontSize: scaleFontSize(15),
          fontWeight: "semibold",
        }}
        placeholder="Enter your location..."
        label="Location"
        value={formik.values.address}
        onChangeText={formik.handleChange("address")}
        onBlur={formik.handleBlur("address")}
        error={formik.touched.address && formik.errors.address}
      />
    </View>
  );
};

const VerificationForm: FC<VerificationFormProps> = ({ email }) => {
  const { scaleFontSize } = useResponsiveScreen();
  const [verificationCode, setVerificationCode] = useState<string>("");

  return (
    <View style={{ width: "100%" }}>
      <TextInput
        variant="filled"
        size="lg"
        inputStyle={{
          fontSize: scaleFontSize(15),
          fontWeight: "semibold",
        }}
        placeholder="Enter verification code"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
    </View>
  );
};

const useKeyboardVisibility = (): boolean => {
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};

const AuthSheet: FC = () => {
  const params = useLocalSearchParams<RouteParams>();
  const { wp } = useResponsiveScreen();
  const { isWhiteTheme } = useGetThemeColor();
  const isKeyboardVisible = useKeyboardVisibility();

  const [isVerification, setIsVerification] = useState<boolean>(
    params.title === "verification"
  );
  const [userEmail, setUserEmail] = useState<string>(params.email || "");

  const userFormik = useFormik<UserFormData>({
    initialValues: {
      email: "",
      name: "",
      role: UserRoles.user,
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      console.log("User form submitted:", values);
      setUserEmail(values.email);
      setIsVerification(true);
    },
  });

  const sellerFormik = useFormik<SellerFormData>({
    initialValues: {
      email: "",
      garageName: "",
      contactNumber: "",
      address: "",
      role: UserRoles.seller,
    },
    validationSchema: sellerValidationSchema,
    onSubmit: (values) => {
      console.log("Seller form submitted:", values);
      setUserEmail(values.email);
      setIsVerification(true);
    },
  });

  const isUserAuth = params.title === UserRoles.user;

  if (isVerification) {
    return (
      <AuthLayout
        isKeyboardVisible={isKeyboardVisible}
        title="Enter Code"
        subtitle={`We have sent a code to your email ${userEmail}`}
        icon={
          <Fontisto
            name="email"
            size={wp(6)}
            color={isWhiteTheme ? zincColors[300] : "#DBD8E3"}
          />
        }
        onContinue={() => {
          console.log("Verification submitted");
        }}
        isContinueDisabled={false}
      >
        <VerificationForm email={userEmail} />
      </AuthLayout>
    );
  }

  if (isUserAuth) {
    return (
      <AuthLayout
        isKeyboardVisible={isKeyboardVisible}
        title="Continue with account"
        subtitle="Sign in or sign up with your email"
        icon={
          <Fontisto
            name="email"
            size={wp(6)}
            color={isWhiteTheme ? zincColors[300] : "#DBD8E3"}
          />
        }
        onContinue={() => {
          userFormik.handleSubmit();
        }}
        isContinueDisabled={!userFormik.isValid || userFormik.isSubmitting}
      >
        <UserAuthForm formik={userFormik} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      isKeyboardVisible={isKeyboardVisible}
      title="Enter Garage Details"
      subtitle="Setup a garage for easy identification."
      icon={
        <MaterialCommunityIcons
          name="account-group"
          size={wp(6)}
          color={isWhiteTheme ? zincColors[300] : "#DBD8E3"}
        />
      }
      onContinue={() => {
        sellerFormik.handleSubmit();
      }}
      isContinueDisabled={!sellerFormik.isValid || sellerFormik.isSubmitting}
    >
      <SellerAuthForm formik={sellerFormik} />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 8,
    flex: 1,
  },
  backButtonContainer: {
    alignItems: "flex-start",
    marginBottom: 40,
  },
  contentContainer: {
    paddingHorizontal: 16,
    alignItems: "flex-start",
    gap: 16,
    width: "100%",
  },
});

export default AuthSheet;
