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

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        //route to specific movie page
        router.push(`/movie/${movie_id}`);
      }}
    >
      <View style={styles.trendingRankContainer}>
        <Text style={styles.trendingRankText}>{trendingRank}</Text>
      </View>

      <Image
        style={styles.image}
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

    // borderColor: "white",
    // borderWidth: 2,
    position: "relative",
  },
  trendingRankContainer: {
    position: "absolute",
    bottom: 40,
    left: 15,
    zIndex: 40,

    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",

    borderColor: colors.gold,
    borderWidth: 2,
    borderRadius: 999,
    backgroundColor: colors.blackBackground,
  },
  trendingRankText: {
    color: colors.gold,
    fontSize: 20,
    fontWeight: 700,

    // paddingHorizontal: 10,
    // paddingVertical: 4,
  },
  image: {
    height: 250,
    width: "100%",
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
