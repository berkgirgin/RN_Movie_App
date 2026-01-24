import { fetchMovieDetails } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import { colors } from "@/constants/colors";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View style={movieInfoStyles.container}>
    <Text style={movieInfoStyles.label}>{label}</Text>
    <Text style={movieInfoStyles.value}>{value || "N/A"}</Text>
  </View>
);

const movieInfoStyles = StyleSheet.create({
  container: {
    // marginTop: 20,
    alignItems: "flex-start",
  },
  label: {
    // color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "400",
  },
  value: {
    // color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "700",
    // marginTop: 8,
  },
});

export default function MovieDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const movieIdNumber = Number(id);

  if (isNaN(movieIdNumber)) throw new Error("fetched movie ID is not a number");

  const { data: movie, loading } = useFetch(async () => {
    return await fetchMovieDetails(movieIdNumber);
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.posterContainer}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            resizeMode="stretch"
            style={styles.posterImage}
          />

          {/* Play Button not added */}
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{movie?.title}</Text>

          {/* Release + Runtime */}
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text style={styles.metaText}>{movie?.runtime}m</Text>
          </View>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Image source={icons.star} style={styles.starIcon} />
            <Text style={styles.ratingValue}>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text style={styles.ratingCount}>({movie?.vote_count} votes)</Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          {/* Budget / Revenue */}
          <View style={styles.moneyRow}>
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000,
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>

      {/* Go Back */}
      <Pressable style={styles.backButton} onPress={router.back}>
        <Image source={icons.arrow} tintColor="black" style={styles.backIcon} />
        <Text style={styles.backText}>Go Back</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const contentPadding = 20;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "lightblue",
    justifyContent: "center",
  },
  posterContainer: {
    backgroundColor: "brown",
  },
  posterImage: {
    height: 550,
    width: "100%",
  },

  scrollView: {},

  playButton: {},
  playIcon: {},
  contentContainer: {
    // alignItems: "flex-start",
    marginTop: 20,
    paddingHorizontal: contentPadding,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  metaRow: {
    flexDirection: "row",
    backgroundColor: "brown",
    alignItems: "center",
  },
  metaText: {
    fontSize: 14,
  },

  //raiting
  // ***
  ratingContainer: {
    flexDirection: "row",
    backgroundColor: "brown",
    alignItems: "center",

    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  starIcon: {
    width: 16,
    height: 16,
  },
  ratingValue: {},
  ratingCount: {},
  // ***

  moneyRow: {
    width: "50%",
    backgroundColor: "brown",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // backButton: {},
  // backIcon: {},
  // backText: {},
  backButton: {
    position: "absolute",
    bottom: 20,
    left: contentPadding,
    right: contentPadding,
    backgroundColor: colors.zattooOrange,
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  backIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
    transform: [{ rotate: "180deg" }],
  },
  backText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
