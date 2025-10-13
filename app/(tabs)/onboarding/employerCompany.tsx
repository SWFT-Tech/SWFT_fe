// app/(tabs)/onboarding/employer_company.tsx
import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

export default function EmployerCompany() {
  return (
    <View className="flex-1 bg-white">
      {/* Top-left logo */}
      <View className="px-6 py-5">
        <Image source={require("@/assets/logo.png")} style={{ width: 36, height: 36 }} />
      </View>

      {/* Progress (matches screenshot style) */}
      <View className="px-6 mt-2">
        <View className="mx-auto w-full max-w-3xl">
          <ProgressBar current={1} total={3} />
        </View>
      </View>

      {/* Centered form */}
      <View className="w-full px-6 mt-10">
        <View className="mx-auto w-full max-w-3xl">
          <Text className="text-4xl md:text-5xl font-extrabold text-center text-gray-900">
            Tell us about your company
          </Text>

          <View className="mt-10">
            <FieldLabel>Company name</FieldLabel>
            <TextInput
              placeholder="ABC Company"
              placeholderTextColor="#9CA3AF"
              className="mt-2 h-12 rounded-full border border-neutral-300 px-4 text-gray-900"
            />

            <FieldLabel className="mt-6">Company website</FieldLabel>
            <TextInput
              placeholder="www.company.com"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              className="mt-2 h-12 rounded-full border border-neutral-300 px-4 text-gray-900"
            />

            <FieldLabel className="mt-6">Industry</FieldLabel>
            {/* Faux select for now */}
            <TouchableOpacity className="mt-2 h-12 flex-row items-center justify-between rounded-full border border-neutral-300 px-4">
              <Text className="text-gray-400">Select</Text>
              <Text className="text-gray-400">▾</Text>
            </TouchableOpacity>

            <FieldLabel className="mt-6">Zip Code</FieldLabel>
            <TextInput
              placeholder="00000"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              className="mt-2 h-12 rounded-full border border-neutral-300 px-4 text-gray-900"
            />

            <View className="mt-8 flex-row items-center justify-between">
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-gray-600">‹ Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/(tabs)/onboarding/employerRecruiter")}
                className="h-10 px-6 items-center justify-center rounded-full bg-neutral-700"
                activeOpacity={0.9}
              >
                <Text className="text-white font-medium">Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

/* ----------------- helpers ----------------- */
function FieldLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Text className={`text-sm font-semibold text-gray-800 ${className}`}>
      {children}
    </Text>
  );
}

/** Progress bar EXACTLY like the screenshot:
 * - One uniform light-gray track
 * - 3 circles evenly spaced
 * - Current step = darker ring (no filled dot)
 * - Other steps = light ring
 */
function ProgressBar({ current, total }: { current: number; total: number }) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);

  const trackColor = "#D1D5DB"; // gray-300
  const ringDark = "#6B7280";   // gray-500 (active ring)
  const ringLight = "#D1D5DB";  // gray-300 (inactive ring)

  return (
    <View className="mx-auto w-full max-w-4xl">
      <View style={{ position: "relative", height: 28 }}>
        {/* full track */}
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            marginTop: -2, // centers a 4px line
            height: 4,
            borderRadius: 999,
            backgroundColor: trackColor,
          }}
        />
        {/* circles */}
        <View
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
          className="flex-row items-center justify-between"
        >
          {steps.map((n) => {
            const isCurrent = n === current;
            return (
              <View
                key={n}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  borderWidth: 3,
                  borderColor: isCurrent ? ringDark : ringLight,
                  backgroundColor: "#FFFFFF", // hollow (no filled dot)
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
