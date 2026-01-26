import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants/icons";
import { colors } from "@/constants/colors";

type Props = {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
};

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
  return (
    <Pressable style={styles.container}>
      <Image
        style={styles.image}
        source={icons.search}
        tintColor={colors.zattooOrange}
      />
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.darkgreyDetailsText}
        onPress={onPress}
      />
    </Pressable>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.blackBorderColor,
    borderWidth: 1,
    backgroundColor: colors.blackHighlightBackground,

    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 1000,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 18,

    marginTop: 18,
  },
  image: {
    width: 20,
    height: 20,
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 700,
    color: colors.brightWhiteText,
  },
});
