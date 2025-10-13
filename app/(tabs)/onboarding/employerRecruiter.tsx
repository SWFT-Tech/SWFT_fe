// app/(tabs)/onboarding/employer_recruiter.tsx
import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

export default function EmployerRecruiter() {
  return (
    <View className="flex-1 bg-white">
      {/* top-left logo */}
      <View className="px-6 py-5">
        <Image source={require("@/assets/logo.png")} style={{ width: 36, height: 36 }} />
      </View>

      {/* progress — same width as the form */}
      <View className="px-6 mt-2">
        <View className="mx-auto w-full max-w-3xl">
          <ProgressBar current={2} total={3} />
        </View>
      </View>

      {/* centered form */}
      <View className="w-full px-6 mt-10">
        <View className="mx-auto w-full max-w-3xl">
          <Text className="text-4xl md:text-5xl font-extrabold text-center text-gray-900">
            Tell us about you
          </Text>

          <View className="mt-10">
            <FieldLabel>Full Name</FieldLabel>
            <TextInput
              placeholder="John Doe"
              placeholderTextColor="#9CA3AF"
              className="mt-2 h-12 rounded-full border border-neutral-300 px-4 text-gray-900"
            />

            <FieldLabel className="mt-6">Job Title / Role</FieldLabel>
            <TouchableOpacity className="mt-2 h-12 flex-row items-center justify-between rounded-full border border-neutral-300 px-4">
              <Text className="text-gray-400">Select</Text>
              <Text className="text-gray-400">▾</Text>
            </TouchableOpacity>

            <FieldLabel className="mt-6">Phone Number</FieldLabel>
            <TextInput
              placeholder="000-00-0000"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              className="mt-2 h-12 rounded-full border border-neutral-300 px-4 text-gray-900"
            />

            <View className="mt-8 flex-row items-center justify-between">
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-gray-600">‹ Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/onboarding/jobPost")}
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

/* --------- tiny helpers --------- */
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

/**
 * Progress bar:
 * - Light base track
 * - Dark overlay track from left to current step
 * - Three hollow circles; completed + current rings dark, future ring light
 * - Width capped with max-w-3xl by parent wrapper
 */
function ProgressBar({ current, total }: { current: number; total: number }) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);

  // ratio for dark overlay length (0..1) across the track between first and last dot
  const pct =
    total > 1 ? ((current - 1) / (total - 1)) * 100 : 0;

  // colors to match the mock
  const baseTrack = "#E5E7EB"; // neutral-200
  const completeTrack = "#6B7280"; // neutral-500 (darker)
  const futureRing = "#D1D5DB"; // neutral-300
  const currentRing = "#4B5563"; // neutral-600 / 700-ish
  const dotSize = 24;

  return (
    <View style={{ position: "relative", height: 28 }}>
      {/* base track */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          marginTop: -2,
          height: 4,
          borderRadius: 999,
          backgroundColor: baseTrack,
        }}
      />
      {/* completed (dark) overlay from left -> current */}
      <View
        style={{
          position: "absolute",
          left: 0,
          width: `${pct}%`,
          top: "50%",
          marginTop: -2,
          height: 4,
          borderRadius: 999,
          backgroundColor: completeTrack,
        }}
      />

      {/* circles */}
      <View
        className="flex-row items-center justify-between"
        style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
      >
        {steps.map((n) => {
          const isFuture = n > current;
          const ring =
            isFuture ? futureRing : currentRing; // completed + current are dark
          return (
            <View
              key={n}
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: 999,
                borderWidth: 3,
                borderColor: ring,
                backgroundColor: "#FFFFFF", // hollow center
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
