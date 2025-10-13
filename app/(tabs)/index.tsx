// app/(tabs)/index.tsx
import React, { useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  LayoutChangeEvent,
  Image,
  ImageBackground,
} from "react-native";
import { router } from "expo-router";


export default function LandingPage() {
  const scrollRef = useRef<ScrollView>(null);
  const [anchors, setAnchors] = useState({ pricing: 0, footer: 0 });

  const scrollTo = (y: number) => scrollRef.current?.scrollTo({ y, animated: true });

  const onPricingLayout = (e: LayoutChangeEvent) =>
    setAnchors((a) => ({ ...a, pricing: e.nativeEvent.layout.y }));
  const onFooterLayout = (e: LayoutChangeEvent) =>
    setAnchors((a) => ({ ...a, footer: e.nativeEvent.layout.y }));

  return (
    <ScrollView
      ref={scrollRef}
      className="flex-1 bg-neutral-50"
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Top bar (full-width) */}
      <View className="bg-white">
        <View className="w-full flex-row items-center justify-between px-12 py-4">
          <TouchableOpacity
            onPress={() => scrollTo(0)}
            accessibilityRole="imagebutton"
            accessibilityLabel="Go to top"
            className="flex-row items-center"
            activeOpacity={0.8}
          >
            {/* Fixed-size wrapper to control logo size */}
            <View className="h-8 w-8 overflow-hidden">
              <Image
                source={require("@/assets/logo.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <View className="flex-row gap-6">
            <TouchableOpacity onPress={() => scrollTo(0)}>
              <Text className="text-gray-700">Home</Text>
            </TouchableOpacity>

            {/* About left inert for now */}
            <View>
              <Text className="text-gray-700">About</Text>
            </View>

            <TouchableOpacity onPress={() => scrollTo(anchors.pricing)}>
              <Text className="text-gray-700">Pricing</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => scrollTo(anchors.footer)}>
              <Text className="text-gray-700">Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

        {/* Hero with background image (full width) */}
        <View className="bg-gray-200">
        <ImageBackground
            source={require("@/assets/empty.jpg")}
            resizeMode="cover"
            // the ImageBackground stretches to the width of the screen;
            // height will be driven by the inner container
            style={{ width: "100%" }}
            // keep the image subtle so text stays readable
            imageStyle={{ opacity: 0.18 }}
        >
            {/* Left-centered content (vertically centered, left aligned) */}
            <View className="w-full px-12 py-24 md:py-32 min-h-[710px] items-start justify-center">
            <View className="w-full md:w-3/5 lg:w-1/2">
                <Text className="text-5xl md:text-5xl font-extrabold text-gray-900">
                Swipe Right for Your Dream Job!
                </Text>

                <Text className="mt-4 text-gray-700 md:max-w-lg">
                Discover the perfect job match with our innovative app that combines
                swiping fun with professional networking. Sign up today to start your
                journey towards career success!
                </Text>

                <View className="mt-6 flex-row gap-3">
                <TouchableOpacity
                    onPress={() => router.push("/(tabs)/signup")}
                    className="bg-black px-4 py-2"
                >
                    <Text className="text-white font-semibold">Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/(tabs)/login")}
                    className="border border-gray-300 px-4 py-2"
                >
                    <Text className="text-gray-900 font-semibold">Log In</Text>
                </TouchableOpacity>
                </View>
            </View>
            </View>
        </ImageBackground>
        </View>


        {/* “How it works” — image + copy, NOT cards; full-width with even columns */}
        {/* <View className="w-full px-10 pt-16 md:pt-24 pb-16 md:pb-20 mt-20 md:mt-24"> */}
        <View className="w-full px-12 pt-15 pb-16 mt-20 mb-24">
            {/* Limit the headline + paragraph to half the width on desktop */}
            <View className="w-full md:w-1/2">
                <Text className="text-2xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                Discover Your Ideal Job or Candidate
                </Text>

                <Text className="mt-3 text-base md:text-lg text-gray-700">
                Getting started is easy! Follow these simple steps to find your perfect job match
                or connect with top candidates.
                </Text>
            </View>

            {/* Three even columns with generous spacing like the mock */}
            <View className="mt-12 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
                <FeatureItem
                image={require("@/assets/join.png")}
                title="Create Your Profile in Minutes"
                desc="Sign up and set up your professional profile."
                />
                <FeatureItem
                image={require("@/assets/swipe.png")}
                title="Swipe to Discover Opportunities"
                desc="Browse through job listings or candidates with ease."
                />
                <FeatureItem
                image={require("@/assets/communication.png")}
                title="Connect and Communicate"
                desc="Engage with matches through our messaging feature."
                />
            </View>
        </View>


      {/* Cards (empty placeholders) — full-width */}
      <View className="w-full px-5 pb-12">
        <View className="flex flex-col md:flex-row gap-6">
          <BigPlaceholderCard heading="Swipe" />
          <BigPlaceholderCard heading="Match" />
          <BigPlaceholderCard heading="Connect" />
        </View>
      </View>

      {/* ===== PRICING (scroll target) — full-width */}
      <View className="w-full px-5 py-16" onLayout={onPricingLayout}>
        <Text className="text-red-600 font-semibold tracking-wide uppercase">
          For recruiters only
        </Text>
        <Text className="mt-2 text-3xl font-extrabold text-gray-900 text-center">
          Pricing
        </Text>

        <View className="mt-10 flex flex-col md:flex-row gap-6">
          <PricingPlaceholder name="Basic" />
          <PricingPlaceholder name="Plus" />
          <PricingPlaceholder name="Premium" />
        </View>
      </View>

        {/* ===== TESTIMONIALS — full-width like mock ===== */}
        <View className="w-full px-12 py-20">
            <Text className="text-4xl md:text-5xl font-extrabold text-gray-900">
                User Success Stories
            </Text>
            <Text className="mt-4 text-lg text-gray-700">
                I found my dream job through this amazing app!
            </Text>

            <View className="mt-16 flex flex-col md:flex-row md:gap-20 gap-16">
                <TestimonialCard
                rating={5}
                quote="This app transformed my job search experience. I connected with amazing opportunities quickly!"
                name="John Doe"
                subtitle="Software Engineer, TechCorp"
                logoText="Webflow"
                />
                <TestimonialCard
                rating={5}
                quote="As an employer, I found the perfect candidate fast. The swipe feature made it so easy!"
                name="Jane Smith"
                subtitle="HR Manager, BizInc"
                logoText="Webflow"
                />
            </View>
        </View>


      {/* ===== FOOTER (scroll target) — full-width */}
      <FooterBlock onLayout={onFooterLayout} />
    </ScrollView>
  );
}

/* -------------------------- Components -------------------------- */
function FeatureItem({title,desc,image,}: {title: string; desc: string; image: any; }) {
  return (
    <View className="flex-1 min-w-[260px] md:max-w-none">
      {/* Icon/image top-left like the design */}
      <Image
        source={image}
        resizeMode="contain"
        // Fixed visual size to match the mock; tweak if your pngs need it
        style={{ width: 44, height: 44 }}
      />

      {/* Big bold heading that can wrap to two lines */}
      <Text className="mt-4 text-2xl md:text-3xl font-extrabold leading-tight text-gray-900">
        {title}
      </Text>

      {/* Supporting copy with relaxed line height */}
      <Text className="mt-2 text-gray-700 leading-relaxed">
        {desc}
      </Text>
    </View>
  );
}

function BigPlaceholderCard({ heading }: { heading: string }) {
  return (
    <View className="flex-1 min-w-[240px]">
      <Text className="text-xl font-bold text-gray-900 text-center pt-5 pb-5">
        {heading}
      </Text>
      <View className="mt-4 h-[500px] w-full rounded-2xl bg-gray-200" />
    </View>
  );
}

function PricingPlaceholder({ name }: { name: string }) {
  return (
    <View className="flex-1 min-w-[260px]">
      <Text className="text-center text-xl font-semibold text-gray-900 pt-5 pb-5">{name}</Text>
      <View className="mt-4 h-[500px] w-full rounded-2xl bg-gray-200" />
    </View>
  );
}

function TestimonialCard({
  rating,
  quote,
  name,
  subtitle,
  logoText = "Webflow",
}: {
  rating: number;
  quote: string;
  name: string;
  subtitle: string;
  logoText?: string;
}) {
  return (
    // Edge-to-edge block (no border/shadow) to match the mock
    <View className="flex-1 min-w-[320px]">
      {/* Stars row */}
      <Text className="text-2xl md:text-3xl text-gray-900 tracking-wide">
        {Array.from({ length: rating })
          .map(() => "★")
          .join(" ")}
      </Text>

      {/* Big bold quote */}
      <Text className="mt-6 text-xl md:text-2xl font-semibold leading-relaxed text-gray-900">
        “{quote}”
      </Text>

      {/* Author row with divider and logo on the right */}
      <View className="mt-8 flex-row items-center">
        <View className="h-14 w-14 rounded-full bg-gray-200" />
        <View className="ml-4">
          <Text className="font-semibold text-gray-900">{name}</Text>
          <Text className="text-gray-600">{subtitle}</Text>
        </View>

        {/* vertical divider */}
        <View className="mx-8 h-10 w-px bg-gray-300" />

        <Text className="text-xl font-semibold text-gray-800">{logoText}</Text>
        {/* If you later add a real logo image, swap the Text above for:
            <Image source={require("@/assets/webflow.png")} className="h-6 w-auto" resizeMode="contain" />
        */}
      </View>
    </View>
  );
}


function FooterBlock({ onLayout }: { onLayout?: (e: LayoutChangeEvent) => void }) {
  return (
    <View className="mt-16 border-t border-gray-200 bg-white" onLayout={onLayout}>
      <View className="w-full px-10 py-10">
        <View className="flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Left brand & contact */}
          <View className="md:w-1/2">
            <Text className="text-2xl font-extrabold">Logo</Text>

            <Text className="mt-6 text-gray-900 font-semibold">Address:</Text>
            <Text className="text-gray-700">Level 1, 12 Sample St, Sydney NSW 2000</Text>

            <Text className="mt-4 text-gray-900 font-semibold">Contact:</Text>
            <Text className="text-gray-700">1800 123 4567</Text>
            <Text className="text-gray-700">info@relume.com</Text>

            <View className="mt-4 flex-row gap-4">
              <Text className="text-gray-500">⭑</Text>
              <Text className="text-gray-500">⭑</Text>
              <Text className="text-gray-500">⭑</Text>
              <Text className="text-gray-500">⭑</Text>
            </View>
          </View>

          {/* Right links */}
          <View className="md:w-1/2 flex-row gap-12">
            <FooterColumn
              title="About Us"
              links={["Careers", "Blog", "Support Center", "FAQs"]}
            />
            <FooterColumn
              title="Contact Us"
              links={["Community Guidelines", "User Agreement", "Feedback", "Help Center"]}
            />
          </View>
        </View>

        <View className="mt-8 flex-col md:flex-row md:items-center md:justify-between">
          <Text className="text-gray-500">© 2025 SquareResults. All rights reserved.</Text>
          <View className="mt-3 md:mt-0 flex-row gap-6">
            <Text className="text-gray-600">Privacy Policy</Text>
            <Text className="text-gray-600">Terms of Service</Text>
            <Text className="text-gray-600">Cookies Settings</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <View className="flex-1">
      <Text className="font-semibold text-gray-900">{title}</Text>
      {links.map((l, i) => (
        <Text key={i} className="mt-3 text-gray-700">
          {l}
        </Text>
      ))}
    </View>
  );
}
