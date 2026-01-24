import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import { colors } from "@/constants/colors";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={icons.person}
          style={styles.icon}
          tintColor={colors.whiteText}
        />
        <Text style={styles.text}>Profile</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackBackground,
    paddingHorizontal: 40, // px-10
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 40, // size-10
    height: 40,
    marginBottom: 20, // gap-5
  },
  text: {
    fontSize: 16, // text-base
    color: colors.darkgreyDetailsText,
  },
});
