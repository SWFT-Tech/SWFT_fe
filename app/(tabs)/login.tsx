// app/(tabs)/login.tsx
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

export default function LoginScreen() {
  const [remember, setRemember] = useState(false);

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        className="flex-1"
      >
        <View className="flex-1 flex-col md:flex-row">
          {/* LEFT half — placeholder area for future image/art */}
          <View className="w-full md:w-1/2 bg-neutral-100 p-6 md:p-8">
            <TouchableOpacity
              onPress={() => router.push("/(tabs)")}
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

          {/* RIGHT half — centered frame card (Back OUTSIDE the card) */}
          <View className="relative w-full md:w-1/2 bg-white items-center justify-center py-12 md:py-24 lg:py-32">
            {/* Back link OUTSIDE the card */}
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
                Login now
              </Text>
              <Text className="mt-2 text-center text-gray-500">
                Start searching today!
              </Text>

              {/* Social buttons */}
              <View className="mt-7 gap-3">
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
                    Login with Google
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
                    Login with Apple
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Divider */}
              <View className="my-7 flex-row items-center">
                <View className="h-px flex-1 bg-neutral-300" />
                <Text className="mx-3 text-gray-500">or Login with Email</Text>
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
                Password
              </Text>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                className="mt-2 h-12 rounded-full border border-neutral-300 px-4 text-gray-900"
                style={webNoOutline}
              />

              {/* Remember + Forgot */}
              <View className="mt-3 flex-row items-center justify-between">
                <TouchableOpacity
                  onPress={() => setRemember(!remember)}
                  activeOpacity={0.8}
                  className="flex-row items-center"
                >
                  <View
                    className={`h-4 w-4 rounded border ${
                      remember ? "bg-black border-black" : "border-neutral-400"
                    }`}
                  />
                  <Text className="ml-2 text-gray-700">Remember Me</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8}>
                  <Text className="text-gray-600">Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Login button */}
              <TouchableOpacity
                onPress={() => router.replace("/(tabs)")}
                activeOpacity={0.9}
                className="mt-6 h-12 items-center justify-center rounded-full bg-neutral-800"
              >
                <Text className="font-semibold text-white">Login</Text>
              </TouchableOpacity>

              {/* Sign up link */}
              <View className="mt-5 flex-row justify-center">
                <Text className="text-gray-600">Don&apos;t have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/(tabs)/signup")}>
                  <Text className="font-semibold text-gray-900">Sign up here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
