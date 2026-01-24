import { View, StyleSheet, Platform, Text } from "react-native";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const WebWrapper = ({ children }: Props) => {
  const isWeb = Platform.OS === "web";

  // If not web, just return children directly
  if (!isWeb) return <>{children}</>;

  return (
    <View style={styles.outer}>
      {/* Web-only title above the app */}
      <Text style={styles.titleText}>Web View</Text>

      <View style={styles.inner}>{children}</View>
    </View>
  );
};

export default WebWrapper;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: "#1C1A2B", // page background outside the phone
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
  },

  titleText: {
    color: "#A8B5DB",
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 16,
  },

  inner: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    borderWidth: 1,
    borderColor: "#2A2838",
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#0F0D23",
    // subtle shadow to mimic phone
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
});
