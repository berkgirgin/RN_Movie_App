import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import { colors } from "@/constants/colors";

const TrendingMovieCard = ({
  movie_id,
  poster_url,
  title,
  trendingRank,
}: TrendingMovie) => {
  const router = useRouter();

  // calculate SCALE_DOWN_FINAL_COFACTOR
  const index = trendingRank - 1;
  const SCALE_COFACTOR = 0.02;
  const SCALE_DOWN_FINAL_COFACTOR = 1 - SCALE_COFACTOR * index;

  return (
    <Pressable
      style={[styles.container]}
      onPress={() => {
        //route to specific movie page
        router.push(`/movie/${movie_id}`);
      }}
    >
      <View
        style={[
          styles.trendingRankContainer,
          {
            height: 50 * SCALE_DOWN_FINAL_COFACTOR,
            width: 50 * SCALE_DOWN_FINAL_COFACTOR,
          },
        ]}
      >
        <Text
          style={[
            styles.trendingRankText,
            {
              fontSize: 20 * SCALE_DOWN_FINAL_COFACTOR,
            },
          ]}
        >
          {trendingRank}
        </Text>
      </View>

      <Image
        style={[
          styles.image,
          {
            height: 250 * SCALE_DOWN_FINAL_COFACTOR,
            width: `${100 * SCALE_DOWN_FINAL_COFACTOR}%`,
          },
        ]}
        source={{
          uri: poster_url
            ? poster_url
            : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
        }}
        resizeMode="cover"
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export default TrendingMovieCard;

const styles = StyleSheet.create({
  container: {
    width: 128,
    position: "relative",
    justifyContent: "flex-end",
  },
  trendingRankContainer: {
    position: "absolute",
    bottom: 40,
    left: 15,
    zIndex: 40,

    // moved to inline for scale() calculations
    // height: 50,
    // width: 50,
    justifyContent: "center",
    alignItems: "center",

    borderColor: colors.blackBackground,
    borderWidth: 4,
    borderRadius: 999,
    backgroundColor: colors.zattooOrange,
  },
  trendingRankText: {
    color: colors.blackBackground,
    // moved to inline for scale() calculations
    // fontSize: 20,
    fontWeight: 700,
  },
  image: {
    // moved to inline for scale() calculations
    // height: 250,
    // width: "100%",
    borderRadius: 8,
  },
  detailsContainer: {
    marginLeft: 4,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "700",
    color: colors.brightWhiteText,
  },
});
