// app/(tabs)/signup.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { router } from "expo-router";

const webNoOutline: any =
  Platform.OS === "web" ? { outlineStyle: "none", outlineWidth: 0 } : undefined;

export default function SignupScreen() {
  const [showPw, setShowPw] = useState(false);
  const [accountType, setAccountType] =
    useState<"candidate" | "employer">("candidate");

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        className="flex-1"
      >
        <View className="flex-1 flex-col md:flex-row">
          {/* LEFT half — promo / future art */}
          <View className="w-full md:w-1/2 bg-neutral-100 p-6 md:p-8">
            <TouchableOpacity
              onPress={() => router.replace("/(tabs)")}
              activeOpacity={0.8}
              className="flex-row items-center"
              accessibilityRole="imagebutton"
              accessibilityLabel="Go to Home"
            >
              <Image
                source={require("@/assets/SWFTLogo3.png")}
                resizeMode="contain"
                style={{ width: 100, height: 75 }}
              />
            </TouchableOpacity>

            <View className="mt-8 h-72 w-full rounded-2xl bg-neutral-300" />
          </View>

          {/* RIGHT half — centered frame; Back is OUTSIDE the card */}
          <View className="relative w-full md:w-1/2 bg-white items-center justify-center py-12 md:py-24 lg:py-32">
            <TouchableOpacity
              onPress={() => router.back()}
              className="absolute left-4 top-4 md:left-8 md:top-6"
              accessibilityRole="button"
            >
              <Text className="text-gray-600">‹ Back</Text>
            </TouchableOpacity>

            {/* Small centered frame card */}
            <View className="w-[320px] md:w-[380px] lg:w-[420px]">
              <Text className="text-3xl font-extrabold text-gray-900 text-center">
                Create your account
              </Text>

              {/* Social signup */}
              <View className="mt-8 gap-3">
                <TouchableOpacity
                  activeOpacity={0.9}
                  className="h-12 flex-row items-center justify-center rounded-full bg-neutral-700 px-4"
                >
                  <Image
                    source={require("@/assets/google.png")}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <Text className="ml-3 font-medium text-white">
                    Sign up with Google
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  className="h-12 flex-row items-center justify-center rounded-full bg-neutral-700 px-4"
                >
                  <Image
                    source={require("@/assets/apple.png")}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <Text className="ml-3 font-medium text-white">
                    Sign up with Apple
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Divider */}
              <View className="my-8 flex-row items-center">
                <View className="h-px flex-1 bg-neutral-300" />
                <Text className="mx-3 text-gray-500">or Signup with Email</Text>
                <View className="h-px flex-1 bg-neutral-300" />
              </View>

              {/* Email */}
              <Text className="text-sm font-semibold text-gray-800">Email</Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                className="mt-2 h-12 rounded-full border border-neutral-300 px-4 text-gray-900"
                style={webNoOutline}
              />

              {/* Password */}
              <Text className="mt-5 text-sm font-semibold text-gray-800">
                Password (8 or more characters)
              </Text>
              <View className="mt-2 h-12 flex-row items-center rounded-full border border-neutral-300 px-4">
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPw}
                  className="flex-1 text-gray-900"
                  style={webNoOutline}
                />
                <TouchableOpacity
                  onPress={() => setShowPw((s) => !s)}
                  accessibilityRole="button"
                  accessibilityLabel={showPw ? "Hide password" : "Show password"}
                  activeOpacity={0.8}
                >
                  <Image
                    source={require("@/assets/basil_eye-closed-solid.png")}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: "#9CA3AF",
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              {/* Account type */}
              <Text className="mt-5 text-sm font-semibold text-gray-800">
                Account type
              </Text>
              <View className="mt-2 h-12 w-full flex-row items-center rounded-full border border-neutral-300 p-1">
                <Segment
                  label="Candidate"
                  selected={accountType === "candidate"}
                  onPress={() => setAccountType("candidate")}
                />
                <Segment
                  label="Employer"
                  selected={accountType === "employer"}
                  onPress={() => setAccountType("employer")}
                />
              </View>

              {/* CTA */}
              <TouchableOpacity
                onPress={() => router.replace("/(tabs)")}
                activeOpacity={0.9}
                className="mt-8 h-12 items-center justify-center rounded-full bg-neutral-800"
              >
                <Text className="font-semibold text-white">Join now</Text>
              </TouchableOpacity>

              {/* Switch to Login */}
              <View className="mt-5 flex-row justify-center">
                <Text className="text-gray-600">Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/(tabs)/login")}>
                  <Text className="font-semibold text-gray-900">Login here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

/* ---------- tiny helper for the segmented buttons ---------- */
function Segment({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 h-full items-center justify-center rounded-full ${
        selected ? "bg-neutral-800" : "bg-transparent"
      }`}
      activeOpacity={0.9}
    >
      <Text className={`${selected ? "text-white" : "text-gray-800"} font-medium`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
