import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "@/constants/colors";

const Loading = ({ message = "LOADING..." }: { message?: string }) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={"large"} color={colors.zattooOrange} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 16,
    color: colors.lightgreyDetailsText,
  },
});
