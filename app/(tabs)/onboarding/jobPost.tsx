// app/(tabs)/onboarding/job_post.tsx
import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { router } from "expo-router";

/* =========================================================
   Job Post (Step 3) — Employer Onboarding
   ========================================================= */
export default function EmployerJobPost() {
  return (
    <View className="flex-1 bg-white">
      {/* Top-left logo */}
      <View className="px-6 py-5">
        <Image source={require("@/assets/logo.png")} style={{ width: 36, height: 36 }} />
      </View>

      {/* Progress (step 3 of 3) */}
      <View className="px-6 mt-2">
        <ProgressBar current={3} total={3} />
      </View>

      {/* Page content */}
      <ScrollView
        className="w-full px-6 mt-8"
        contentContainerStyle={{ alignItems: "center", paddingBottom: 48 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full max-w-3xl">
          <Text className="text-3xl md:text-4xl font-extrabold text-center text-gray-900">
            Post your job
          </Text>

          {/* --- Fields ----------------------------------------------------- */}
          <Label className="mt-8">Job Title:*</Label>
          <TextInput
            placeholder="Enter job title"
            placeholderTextColor="#9CA3AF"
            className="mt-2 h-12 rounded-full border border-neutral-300 px-4 text-gray-900"
          />

          <Label className="mt-5">Employment Type:*</Label>
          <SelectFake placeholder="Full time" />

          <Label className="mt-5">Workplace Type:*</Label>
          <SelectFake placeholder="On-site" />

          <Label className="mt-5">Location:*</Label>
          <TextInput
            placeholder="Enter ZIP or city, state"
            placeholderTextColor="#9CA3AF"
            className="mt-2 h-12 rounded-full border border-neutral-300 px-4 text-gray-900"
          />

          <Label className="mt-5">Street Address:</Label>
          <TextInput
            placeholder="123 Main Street"
            placeholderTextColor="#9CA3AF"
            className="mt-2 h-12 rounded-full border border-neutral-300 px-4 text-gray-900"
          />

          {/* Job Description with rich toolbar */}
          <Label className="mt-6">Job Description:</Label>
          <View className="mt-2 rounded-2xl border border-neutral-300">
            <RichToolbar />
            <View className="h-[1px] bg-neutral-300" />
            <TextInput
              multiline
              placeholder="Enter job description"
              placeholderTextColor="#9CA3AF"
              textAlignVertical="top"
              className="p-4 h-48 text-gray-900"
            />
          </View>

          {/* Preferred Skills */}
          <Label className="mt-6">Preferred Skills</Label>
          <TextInput
            placeholder="Add skills"
            placeholderTextColor="#9CA3AF"
            className="mt-2 h-12 rounded-full border border-neutral-300 px-4 text-gray-900"
          />

          {/* Benefits (simple checklist look) */}
          <Label className="mt-6">Benefits:*</Label>
          <View className="mt-2 gap-2">
            {[
              "Dental Insurance",
              "Life Insurance",
              "Medical Insurance",
              "Paid Time off",
              "Retirement",
              "Vision Insurance",
              "None of These",
            ].map((b, idx) => (
              <CheckRow key={idx} label={b} />
            ))}
          </View>

          {/* Pay section */}
          <View className="mt-6 md:flex-row md:items-center md:gap-4">
            <View className="mt-5 md:mt-0 md:flex-1">
              <Label>Pay type</Label>
              <SelectFake placeholder="Pay Range" />
            </View>

            <View className="mt-5 md:mt-0 md:flex-1">
              <Label>Minimum Pay</Label>
              <TextInput
                placeholder="$ Min"
                placeholderTextColor="#9CA3AF"
                className="mt-2 h-12 rounded-full border border-neutral-300 px-4 text-gray-900"
              />
            </View>

            <View className="mt-5 md:mt-0 md:flex-1">
              <Label>Maximum</Label>
              <TextInput
                placeholder="$ Max"
                placeholderTextColor="#9CA3AF"
                className="mt-2 h-12 rounded-full border border-neutral-300 px-4 text-gray-900"
              />
            </View>
          </View>

          {/* Currency + Frequency */}
          <View className="mt-6 md:flex-row md:items-center md:gap-4">
            <View className="mt-5 md:mt-0 md:flex-1">
              <Label>Currency</Label>
              <SelectFake placeholder="Pay Range" />
            </View>

            <View className="mt-5 md:mt-0 md:flex-1">
              <Label>Frequency</Label>
              <SelectFake placeholder="Pay Range" />
            </View>
          </View>

          {/* Footer actions */}
          <View className="mt-8 flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-gray-600">‹ Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.replace("/(tabs)")}
              className="h-10 px-6 items-center justify-center rounded-full bg-neutral-700"
              activeOpacity={0.9}
            >
              <Text className="text-white font-medium">Save &amp; continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/* =========================================================
   Helpers — labels, select fakes, checks, toolbar, progress
   ========================================================= */

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <Text className={`text-sm font-semibold text-gray-800 ${className}`}>{children}</Text>;
}

/** A simple “select” look without behavior for now */
function SelectFake({ placeholder }: { placeholder: string }) {
  return (
    <TouchableOpacity className="mt-2 h-12 flex-row items-center justify-between rounded-full border border-neutral-300 px-4">
      <Text className="text-gray-400">{placeholder}</Text>
      <Text className="text-gray-400">▾</Text>
    </TouchableOpacity>
  );
}

function CheckRow({ label }: { label: string }) {
  return (
    <View className="flex-row items-center gap-2">
      <View className="h-4 w-4 rounded border border-neutral-400" />
      <Text className="text-gray-800">{label}</Text>
    </View>
  );
}

/* ---------- Rich toolbar (matches the screenshot) ---------- */
const ToolButton = ({ children }: { children: React.ReactNode }) => (
  <View className="h-10 w-10 items-center justify-center rounded-md">{children}</View>
);

const Bars = ({ widths }: { widths: number[] }) => (
  <View className="gap-0.5">
    {widths.map((w, i) => (
      <View
        key={i}
        style={{ width: w, height: 2, borderRadius: 2, backgroundColor: "#111827" }}
      />
    ))}
  </View>
);

function RichToolbar() {
  return (
    <View className="h-12 flex-row items-center px-3 gap-1">
      {/* B I U */}
      <ToolButton>
        <Text className="text-gray-900 font-extrabold">B</Text>
      </ToolButton>
      <ToolButton>
        <Text style={{ fontStyle: "italic" }} className="text-gray-900">
          I
        </Text>
      </ToolButton>
      <ToolButton>
        <Text className="text-gray-900">U</Text>
      </ToolButton>

      {/* Align left / center / right / justify */}
      <ToolButton>
        <Bars widths={[18, 14, 18, 10]} />
      </ToolButton>
      <ToolButton>
        <Bars widths={[10, 18, 10, 18]} />
      </ToolButton>
      <ToolButton>
        <Bars widths={[18, 10, 18, 14]} />
      </ToolButton>
      <ToolButton>
        <Bars widths={[18, 18, 18, 18]} />
      </ToolButton>

      {/* Bullet list */}
      <ToolButton>
        <View className="flex-row items-center gap-2">
          <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: "#111827" }} />
          <Bars widths={[16]} />
        </View>
      </ToolButton>

      {/* Numbered list */}
      <ToolButton>
        <View className="flex-row items-center gap-1">
          <Text className="text-gray-900">1.</Text>
          <Bars widths={[16]} />
        </View>
      </ToolButton>

      {/* Ink drop / clear formatting */}
      <ToolButton>
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "#111827",
            transform: [{ rotate: "20deg" }],
          }}
        />
      </ToolButton>

      {/* aT font control */}
      <ToolButton>
        <Text className="text-gray-900">aT</Text>
      </ToolButton>
    </View>
  );
}

/* ---------- Progress bar (line with end caps touching) ---------- */
function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);
  const pct = total > 1 ? ((current - 1) / (total - 1)) * 100 : 0;

  return (
    <View className="mx-auto w-full max-w-3xl">
      <View className="relative w-full items-center justify-between" style={{ height: 32 }}>
        {/* track */}
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            marginTop: -2,
            height: 4,
            backgroundColor: "#E5E7EB", // light gray
            borderRadius: 999,
          }}
        />
        {/* filled part up to current step */}
        <View
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            marginTop: -2,
            height: 4,
            width: `${pct}%`,
            backgroundColor: "#4B5563", // dark gray
            borderRadius: 999,
          }}
        />
        {/* step rings touching the line ends */}
        <View className="w-full flex-row items-center justify-between">
          {steps.map((n) => {
            const active = n <= current;
            return (
              <View
                key={n}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  borderWidth: 3,
                  borderColor: active ? "#4B5563" : "#D1D5DB",
                  backgroundColor: "#FFFFFF",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
