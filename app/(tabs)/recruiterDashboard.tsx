// app/(recruiter)/recruiterDashboard.tsx
import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { router, usePathname } from "expo-router";

/* ============================ Sidebar (reusable) ============================ */
type NavKey = "dashboard" | "jobs" | "candidates" | "calendar" | "messages" | "settings";
type NavItem = { key: NavKey; label: string; href: string; icon: any };

const ICONS = {
  dashboard:  require("@/assets/dashboard.png"),
  jobs:       require("@/assets/briefcase.png"),
  candidates: require("@/assets/candidates.png"),
  calendar:   require("@/assets/calendar.png"),
  messages:   require("@/assets/message.png"),
  settings:   require("@/assets/settings.png"),
  search: require("@/assets/search-normal.png"),
} as const;

const NAV: NavItem[] = [
  { key: "dashboard",  label: "Dashboard",  href: "/recruiterDashboard", icon: ICONS.dashboard },
  { key: "jobs",       label: "Jobs",       href: "/jobs",                icon: ICONS.jobs },
  { key: "candidates", label: "Candidates", href: "/waitingCandidate",    icon: ICONS.candidates },
  { key: "calendar",   label: "Calendar",   href: "/calendar",            icon: ICONS.calendar },
  { key: "messages",   label: "Messages",   href: "/messages",            icon: ICONS.messages },
  { key: "settings",   label: "Settings",   href: "/settings",            icon: ICONS.settings },
];

export function RecruiterSidebar() {
  const pathname = usePathname();
  return (
    <View className="h-full w-[220px] bg-slate-800 border-r border-slate-700">
      {/* logo centered */}
      <View className="py-6 items-center">
        <Image source={require("@/assets/Logo-white.png")} style={{ width: 36, height: 36 }} />
      </View>

      <View className="mt-2">
        {NAV.map((it) => {
          const active = pathname?.startsWith(it.href);
          return (
            <TouchableOpacity
              key={it.href}
              onPress={() => router.push(it.href as any)}
              className={`mx-3 mb-1 flex-row items-center gap-3 rounded-md px-3 py-3 ${
                active ? "bg-slate-700" : "bg-transparent"
              }`}
              activeOpacity={0.9}
              accessibilityRole="button"
              accessibilityLabel={it.label}
            >
              <Image
                source={it.icon}
                style={{ width: 18, height: 18, tintColor: active ? "#fff" : "#cbd5e1" }}
                resizeMode="contain"
              />
              <Text className={active ? "text-white font-semibold" : "text-slate-200"}>
                {it.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

/* ============================ Helpers (calendar) ============================ */
function getDaysInMonth(year: number, monthZero: number) {
  return new Date(year, monthZero + 1, 0).getDate();
}
function getWeekdayMondayFirst(year: number, monthZero: number, day = 1) {
  const js = new Date(year, monthZero, day).getDay(); // 0..6 (Sun..Sat)
  return (js + 6) % 7; // 0..6 (Mon..Sun)
}

/* ============================== Page content =============================== */
export default function RecruiterDashboard() {
  // Calendar state for Feb 2021 like mock
  const [year, setYear] = useState(2021);
  const [month, setMonth] = useState(1); // 0=Jan, 1=Feb
  const [selectedDay, setSelectedDay] = useState<number | null>(23);

  const daysHeader = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const monthDays = useMemo(() => getDaysInMonth(year, month), [year, month]);
  const offset = useMemo(() => getWeekdayMondayFirst(year, month, 1), [year, month]);

  const grid = useMemo(() => {
    const arr: Array<number | null> = [];
    for (let i = 0; i < offset; i++) arr.push(null);
    for (let d = 1; d <= monthDays; d++) arr.push(d);
    while (arr.length < 42) arr.push(null); // stable 6x7 grid
    return arr;
  }, [offset, monthDays]);

  const monthLabel = useMemo(
    () => new Date(year, month, 1).toLocaleString("en-US", { month: "long", year: "numeric" }),
    [year, month]
  );

  const gotoPrevMonth = () => {
    const m = month - 1;
    if (m < 0) { setMonth(11); setYear(y => y - 1); } else { setMonth(m); }
    setSelectedDay(null);
  };
  const gotoNextMonth = () => {
    const m = month + 1;
    if (m > 11) { setMonth(0); setYear(y => y + 1); } else { setMonth(m); }
    setSelectedDay(null);
  };

  return (
    <View className="flex-1 bg-slate-900">
      <View className="h-full flex-row">
        <RecruiterSidebar />

        {/* Main content area (includes right rail) */}
        <View className="flex-1">
          {/* Header row */}
          <View className="px-8 pt-6 bg-slate-900">
            <View className="flex-row items-center justify-between">
              <Text className="text-3xl font-extrabold text-white">Dashboard</Text>

              {/* Right: actions (icons stay right; button sits just above KPIs, still in header) */}
              <View className="flex-row items-center gap-8">
                <TouchableOpacity
                  className="h-10 px-4 items-center justify-center rounded bg-slate-600/60 border border-slate-500"
                  activeOpacity={0.8}
                >
                  <Text className="text-white font-semibold">Post a New Job</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => console.log("Open search")}
                  accessibilityRole="button"
                  accessibilityLabel="Open search"
                  hitSlop={8}
                >
                  <Image
                    source={ICONS.search}
                    style={{ width: 18, height: 18, tintColor: "#e2e8f0" }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text className="text-slate-200 text-lg">🔔</Text>
                <View className="h-8 w-8 rounded-full bg-slate-600" />
                <Text className="text-slate-200 text-lg">▾</Text>
              </View>
            </View>
          </View>

          {/* FULL-WIDTH divider placed OUTSIDE the main/rail grid so the calendar sits below it */}
          <View className="px-8">
            <View className="mt-5 h-px w-full bg-slate-700" />
          </View>

          {/* Everything (KPIs + calendar) now renders below the rule */}
          <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }}>
            <View className="w-full flex-row gap-6">
              {/* ================= MAIN ================= */}
              <View className="flex-1">
                {/* KPI tiles */}
                <View className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <KpiTile value="24" label={"WAITING\nCANDIDATES"} onPress={() => router.push("/waitingCandidate")} />
                  <KpiTile value="155" label={"TOTAL\nAPPLIED"} onPress={() => router.push("/waitingCandidate")}/>
                </View>
                <View className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <KpiTile value="46" label={"MATCHED\nCANDIDATES"} onPress={() => router.push("/waitingCandidate")}/>
                  <KpiTile value="85" label={"LIKED\nCANDIDATES"} onPress={() => router.push("/waitingCandidate")} />
                  <KpiTile value="92" label={"SAVED\nCANDIDATES"} onPress={() => router.push("/waitingCandidate")} />
                </View>

                {/* Active jobs with aligned numeric columns */}
                <View className="mt-5 rounded-xl bg-slate-800 p-5 border border-slate-700">
                  <View className="flex-row items-center">
                    <View className="flex-1 pr-3">
                      <Text className="text-white font-semibold">Active Jobs</Text>
                    </View>
                    <View className="w-24 items-center">
                      <Text className="text-slate-300 font-semibold">Interested</Text>
                    </View>
                    <View className="w-24 items-center">
                      <Text className="text-slate-300 font-semibold">Matched</Text>
                    </View>
                    <View className="w-28 items-center">
                      <Text className="text-slate-300 font-semibold">Notifications</Text>
                    </View>
                  </View>

                  {[
                    ["System Development Engineer I", "5", "2", "6"],
                    ["Systems Engineer I", "12", "1", "2"],
                    ["Assistant Human Resources", "23", "3", "17"],
                    ["Program Manager", "7", "0", "8"],
                  ].map(([role, interested, matched, notif], idx) => (
                    <View key={idx} className="mt-4 flex-row items-center border-t border-slate-700 pt-4">
                      <View className="flex-1 pr-3">
                        <Text className="text-slate-100">{role}</Text>
                        <Text className="text-slate-400 text-xs">Posted Jun 5, 2025</Text>
                      </View>
                      <View className="w-24 items-center"><Pill value={interested} /></View>
                      <View className="w-24 items-center"><Pill value={matched} /></View>
                      <View className="w-28 items-center"><Pill value={notif} tone="success" /></View>
                    </View>
                  ))}
                </View>

                {/* Charts row */}
                <View className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card title="Activity">
                    <View className="mt-3 h-48 rounded-md bg-slate-700" />
                  </Card>
                  <Card title="Candidate Demographics">
                    <View className="mt-4 flex-row items-center gap-6">
                      <View className="h-36 w-36 rounded-full bg-slate-700" />
                      <View className="flex-1 gap-2">
                        <Legend label="Asian" value="1,132.50" />
                        <Legend label="Black" value="1,090.70" />
                        <Legend label="Hispanic" value="2,202.00" />
                        <Legend label="White" value="2,007.30" />
                      </View>
                    </View>
                  </Card>
                </View>
              </View>

              {/* ================= RIGHT RAIL (inline) ================= */}
              <View className="w-[340px]">
                <View className="rounded-xl bg-slate-800 p-5 border border-slate-700">
                  {/* calendar header */}
                  <View className="flex-row items-center justify-between">
                    <Text className="text-slate-200 font-semibold">{monthLabel}</Text>
                    <View className="flex-row gap-3">
                      <TouchableOpacity onPress={gotoPrevMonth} hitSlop={8}>
                        <Text className="text-slate-300 text-lg">‹</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={gotoNextMonth} hitSlop={8}>
                        <Text className="text-slate-300 text-lg">›</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* selectable calendar grid */}
                  <View className="mt-3">
                    <View className="flex-row justify-between">
                      {daysHeader.map((d) => (
                        <Text key={d} className="w-8 text-center text-xs text-slate-400">
                          {d}
                        </Text>
                      ))}
                    </View>
                    <View className="mt-2 flex-row flex-wrap">
                      {grid.map((n, i) => {
                        const selected = n != null && n === selectedDay;
                        const isMuted = n == null;
                        return (
                          <TouchableOpacity
                            key={i}
                            disabled={isMuted}
                            onPress={() => n != null && setSelectedDay(n)}
                            className="w-8 h-8 items-center justify-center"
                            activeOpacity={0.8}
                          >
                            <View
                              className={`h-7 w-7 items-center justify-center rounded-full ${
                                selected ? "bg-slate-300" : ""
                              }`}
                            >
                              <Text
                                className={`text-xs ${
                                  isMuted
                                    ? "text-transparent"
                                    : selected
                                    ? "text-slate-900 font-semibold"
                                    : "text-slate-100"
                                }`}
                              >
                                {n ?? ""}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </View>

                {/* Upcoming Events */}
                <Text className="mt-6 text-slate-200 font-semibold">Upcoming Events</Text>

                <View className="mt-2 flex-row gap-3 flex-wrap">
                  <Tag label="1st Interview" />
                  <Tag label="2st Interview" />
                  <Tag label="3rd Interview" />
                  <Tag label="Onboarding" />
                </View>

                <SectionHeader label="Tomorrow · 2/24/21" />
                <EventRow name="Olivia M." time="8:30 – 9:00 am" leftColor="#d1a770" />
                <EventRow name="Mark H."  time="8:30 – 9:00 am" leftColor="#e58bb3" />

                <SectionHeader label="Thursday · 2/25/21" />
                <EventRow name="Steve J." time="9:30 – 10:00 am" leftColor="#9cc2ff" />
                <EventRow name="Katy H."  time="8:30 – 9:00 am" leftColor="#e58bb3" />
                <EventRow name="Mark H."  time="8:30 – 9:00 am" leftColor="#9cc2ff" />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

/* =============================== UI atoms =============================== */
function KpiTile({
  value,
  label,
  onPress,
}: {
  value: string;
  label: string;
  onPress?: () => void;
}) {
  const content = (
    <View className="rounded-md bg-slate-800 p-5 border border-slate-700">
      <View className="flex-row items-end gap-3">
        <Text className="text-4xl font-extrabold text-white">{value}</Text>
        <Text className="text-slate-300 uppercase tracking-wide text-xs whitespace-pre-line">
          {label}
        </Text>
      </View>
    </View>
  );
  if (!onPress) return content;
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      {content}
    </TouchableOpacity>
  );
}


function Pill({ value, tone = "default" }: { value: string; tone?: "default" | "success" }) {
  const styles =
    tone === "success"
      ? "text-emerald-400 bg-emerald-900/30 border-emerald-700"
      : "text-slate-200 bg-slate-700/40 border-slate-600";
  return (
    <Text className={`rounded-full border px-3 py-1 text-xs font-medium ${styles}`}>{value}</Text>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="rounded-xl bg-slate-800 p-5 border border-slate-700">
      <Text className="text-slate-100 font-semibold">{title}</Text>
      {children}
    </View>
  );
}

function Legend({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-slate-200">{label}</Text>
      <Text className="text-white font-medium">{value}</Text>
    </View>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <View className="rounded-full border border-slate-600 bg-slate-700/40 px-2 py-1">
      <Text className="text-[10px] text-slate-200">{label}</Text>
    </View>
  );
}

function SectionHeader({ label }: { label: string }) {
  return <Text className="mt-4 mb-2 text-slate-400 text-xs">{label}</Text>;
}

function EventRow({
  name,
  time,
  leftColor,
}: {
  name: string;
  time: string;
  leftColor: string;
}) {
  return (
    <View className="mb-2 flex-row items-center rounded-lg bg-slate-700/40 border border-slate-600">
      <View style={{ width: 4, alignSelf: "stretch", backgroundColor: leftColor, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />
      <View className="flex-1 flex-row items-center gap-3 p-3">
        <View className="h-9 w-9 rounded-full bg-slate-500" />
        <View className="flex-1">
          <Text className="text-slate-100 text-sm">{time}</Text>
          <Text className="text-slate-300 text-xs">{name}</Text>
        </View>
        <Text className="text-slate-400 pr-1">•••</Text>
      </View>
    </View>
  );
}
