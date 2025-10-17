// app/(recruiter)/waitingCandidate.tsx
import React, { useMemo, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { router, usePathname } from "expo-router";

/* ============================ Sidebar (reusable here) ============================ */
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
  download: require("@/assets/download.png"),  
} as const;


const NAV: NavItem[] = [
  { key: "dashboard",  label: "Dashboard",  href: "/recruiterDashboard", icon: ICONS.dashboard },
  { key: "jobs",       label: "Jobs",       href: "/jobs",                icon: ICONS.jobs },
  // <-- route to this page
  { key: "candidates", label: "Candidates", href: "/waitingCandidate",    icon: ICONS.candidates },
  { key: "calendar",   label: "Calendar",   href: "/calendar",            icon: ICONS.calendar },
  { key: "messages",   label: "Messages",   href: "/messages",            icon: ICONS.messages },
  { key: "settings",   label: "Settings",   href: "/settings",            icon: ICONS.settings },
];

function RecruiterSidebar() {
  const pathname = usePathname();
  return (
    <View className="h-full w-[220px] bg-slate-800 border-r border-slate-700">
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

/* ============================ Calendar helpers ============================ */
function getDaysInMonth(year: number, monthZero: number) {
  return new Date(year, monthZero + 1, 0).getDate();
}
function getWeekdayMondayFirst(year: number, monthZero: number, day = 1) {
  const js = new Date(year, monthZero, day).getDay(); // 0..6 (Sun..Sat)
  return (js + 6) % 7; // 0..6 (Mon..Sun)
}

/* ================================== Page ================================== */
export default function WaitingCandidate() {
  // Calendar state (same style as dashboard)
  const [year, setYear] = useState(2021);
  const [month, setMonth] = useState(1); // Feb
  const [selectedDay, setSelectedDay] = useState<number | null>(23);

  const daysHeader = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const monthDays = useMemo(() => getDaysInMonth(year, month), [year, month]);
  const offset = useMemo(() => getWeekdayMondayFirst(year, month, 1), [year, month]);

  const grid = useMemo(() => {
    const arr: Array<number | null> = [];
    for (let i = 0; i < offset; i++) arr.push(null);
    for (let d = 1; d <= monthDays; d++) arr.push(d);
    while (arr.length < 42) arr.push(null);
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

  // Mock list
  const people = [
    { score: 97, name: "Steve Johnson",   role: "Software Engineer" },
    { score: 95, name: "Alexis Vang",     role: "Assistant Human resources" },
    { score: 91, name: "Jackson Santana", role: "Program Manager" },
    { score: 88, name: "Sherri Coffey",   role: "Software Engineer II" },
    { score: 84, name: "Christopher Hayes", role: "Program Manager" },
    { score: 79, name: "Francis Jordan",  role: "Program Manager" },
    { score: 75, name: "Mollie Calhoun",  role: "Systems Engineer" },
    { score: 68, name: "Brett Norman",    role: "Software Engineer I" },
    { score: 52, name: "Edwin Ayala",     role: "Software Engineer" },
  ];

  return (
    <View className="flex-1 bg-slate-900">
      <View className="h-full flex-row">
        <RecruiterSidebar />

        <View className="flex-1">
          {/* Header */}
          <View className="px-8 pt-6 bg-slate-900">
            <View className="flex-row items-center justify-between">
              <Text className="text-3xl font-extrabold text-white">Candidates</Text>

              <View className="flex-row items-center gap-8">
                {/* keep icons right */}
                <TouchableOpacity
                  onPress={() => console.log("Open search")}
                  accessibilityRole="button"
                  accessibilityLabel="Open search"
                  hitSlop={8}
                >
                  <Image
                    source={ICONS.search}
                    style={{ width: 18, height: 18, tintColor: "#e2e8f0" }} // slate-200 tint
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text className="text-slate-200 text-lg">🔔</Text>
                <View className="h-8 w-8 rounded-full bg-slate-600" />
                <Text className="text-slate-200 text-lg">▾</Text>
              </View>
            </View>
          </View>

          {/* full-width divider above both columns */}
          <View className="px-8">
            <View className="mt-5 h-px w-full bg-slate-700" />
          </View>

          <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }}>
            <View className="w-full flex-row gap-6">
              {/* ================= MAIN ================= */}
              <View className="flex-1">
                {/* Filters row */}
                <View className="mb-4 flex-row items-center justify-between">
                  <View className="flex-row gap-3">
                    <Chip text="Waiting Candidates ▼" />
                    <Chip text="Filters ▼" />
                  </View>
                  <TouchableOpacity className="rounded-md border border-slate-600 bg-slate-700/40 px-3 py-2">
                    <Text className="text-slate-200 text-sm">★ Favorites</Text>
                  </TouchableOpacity>
                </View>

                {/* Table header */}
                <View className="px-4 py-2 flex-row gap-5">
                  <Text className="w-24 text-slate-300">Match Score</Text>
                  <Text className="flex-1 text-slate-300">Candidate</Text>
                </View>

                {/* List */}
                {people.map((p, idx) => (
                  <View
                    key={idx}
                    className="mt-3 flex-row items-center rounded-lg bg-slate-700/40 border border-slate-600 px-4 py-4"
                  >
                    {/* score */}
                    <View className="w-24">
                      <View className="h-10 w-16 items-center justify-center rounded-md bg-slate-800 border border-slate-500">
                        <Text className="text-white font-bold">{p.score}%</Text>
                      </View>
                    </View>

                    {/* avatar + name + role */}
                    <View className="flex-1 flex-row items-center gap-3">
                      <View className="h-10 w-10 rounded-full bg-slate-500" />
                      <View className="flex-1">
                        <View className="flex-row items-center gap-2">
                          <Text className="text-slate-100 font-medium">{p.name}</Text>
                          <Text className="text-slate-300">☆</Text>
                        </View>
                        <Text className="text-slate-400 text-xs">{p.role}</Text>
                      </View>
                    </View>

                    {/* Resume button */}
                    <TouchableOpacity className="w-24 items-end">
                      <View className="rounded-md border border-slate-600 bg-slate-700/40 px-3 py-2">
                        <TouchableOpacity
                          className="w-24 items-end"
                          onPress={() => handleDownload(p.name)}
                          accessibilityRole="button"
                          accessibilityLabel={`Download resume for ${p.name}`}
                          hitSlop={8}
                        >
                          <View className="flex-row items-center gap-2 rounded-md border border-slate-600 bg-slate-700/40 px-3 py-2">
                            <Image
                              source={ICONS.download}
                              style={{ width: 16, height: 16, tintColor: "#e2e8f0" }}
                              resizeMode="contain"
                            />
                            <Text className="text-slate-200 text-sm">Resume</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              {/* ================= RIGHT RAIL ================= */}
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

                  {/* calendar grid */}
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
                  <SmallTag label="1st Interview" />
                  <SmallTag label="2st Interview" />
                  <SmallTag label="3rd Interview" />
                  <SmallTag label="Onboarding" />
                </View>

                <RightSection label="Tomorrow · 2/24/21" />
                <EventRow name="Olivia M." time="8:30 – 9:00 am" leftColor="#d1a770" />
                <EventRow name="Mark H."  time="8:30 – 9:00 am" leftColor="#e58bb3" />

                <RightSection label="Thursday · 2/25/21" />
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

/* =============================== tiny atoms =============================== */
function Chip({ text }: { text: string }) {
  return (
    <View className="rounded-md border border-slate-600 bg-slate-700/40 px-3 py-2">
      <Text className="text-slate-200 text-sm">{text}</Text>
    </View>
  );
}
function SmallTag({ label }: { label: string }) {
  return (
    <View className="rounded-full border border-slate-600 bg-slate-700/40 px-2 py-1">
      <Text className="text-[10px] text-slate-200">{label}</Text>
    </View>
  );
}
function RightSection({ label }: { label: string }) {
  return <Text className="mt-4 mb-2 text-slate-400 text-xs">{label}</Text>;
}
function EventRow({
  name, time, leftColor,
}: { name: string; time: string; leftColor: string }) {
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
function handleDownload(name: string) {
  // TODO: wire up a real download; for now just a placeholder
  console.log(`Download resume clicked for: ${name}`);
}
