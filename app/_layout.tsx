import { Stack } from "expo-router";
import { colors } from "@/constants/colors";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform } from "react-native";
import { ReactNode } from "react";
import WebWrapper from "@/components/WebWrapper";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar
        style={"light"} // text/icons color
        backgroundColor="transparent" // background for Android
        translucent
      />
      <WebWrapper>
        <Stack
          screenOptions={{
            headerShown: false,
            // contentStyle: { maxWidth: Platform.OS === "web" ? 500 : null },
          }}
        >
          <Stack.Screen name="(tabs)" options={{}} />

          <Stack.Screen name="movie/[id]" />
        </Stack>
      </WebWrapper>
    </SafeAreaProvider>
  );
}
