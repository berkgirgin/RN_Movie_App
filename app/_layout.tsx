import { Stack } from "expo-router";
import { colors } from "@/constants/colors";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ReactNode } from "react";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar
        style={"light"} // text/icons color
        backgroundColor="transparent" // background for Android
        translucent
      />
      <Stack
        screenOptions={{
          headerShown: false,
          // contentStyle: { backgroundColor: colors.blackBackground },
        }}
      >
        <Stack.Screen name="(tabs)" options={{}} />

        <Stack.Screen name="movie/[id]" />
      </Stack>
    </SafeAreaProvider>
  );
}
