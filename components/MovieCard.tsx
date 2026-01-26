import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import { colors } from "@/constants/colors";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  const router = useRouter();

  async function onClick() {
    const data = await fetchMovieDetails(id);
    console.log("movie details from the clicked movie");
    console.log(data);
  }

  return (
    <Pressable
      style={styles.container}
      onPress={async () => {
        //route to specific movie page
        router.push(`/movie/${id}`);
        await onClick();
      }}
    >
      <Image
        style={styles.image}
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
        }}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.ratingContainer}>
          <Image style={styles.ratingIcon} source={icons.star} />
          <Text style={styles.rating}>{Math.round(vote_average / 2)}</Text>
        </View>

        <View style={styles.releaseDateContainer}>
          <Text style={styles.releaseDate}> {release_date?.split("-")[0]}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    width: "30%",
  },
  image: {
    height: 210,
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
  ratingContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  rating: {
    color: colors.whiteText,
  },
  ratingIcon: {
    width: 16,
    height: 16,
  },
  releaseDateContainer: {},
  releaseDate: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: 500,
    color: colors.lightgreyDetailsText,
  },
});
