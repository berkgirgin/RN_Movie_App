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
    color: colors.lightgreyDetailsText,
    fontSize: 14,
    fontWeight: "400",
  },
  value: {
    color: colors.whiteText,
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
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
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
            <Text style={styles.metaReleaseDate}>
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text style={styles.metaRuntime}>{movie?.runtime}m</Text>
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
        <Image
          source={icons.arrow}
          tintColor={colors.blackHighlightBackground}
          style={styles.backIcon}
        />
        <Text style={styles.backText}>Go Back</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const CONTENT_PADDING = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackBackground,
    justifyContent: "center",
  },
  posterContainer: {
    // backgroundColor: "brown",
  },
  posterImage: {
    height: 550,
    width: "100%",
  },

  scrollView: {
    // paddingBottom needs contentContainerStyle
    // it is is outside the scrollable content so direct styling doesn't work
    paddingBottom: 80,

    // backgroundColor: "pink",
    // borderWidth: 5,
    // borderColor: "orange",
  },

  contentContainer: {
    alignItems: "flex-start",
    marginTop: 20,
    paddingHorizontal: CONTENT_PADDING,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.whiteText,
  },
  metaRow: {
    flexDirection: "row",
    // backgroundColor: "brown",
    alignItems: "center",
  },
  metaReleaseDate: {
    color: colors.whiteText,
    fontSize: 14,
  },
  metaRuntime: {
    color: colors.whiteText,
    fontSize: 14,
    marginLeft: 8,
  },

  //raiting
  // ***
  ratingContainer: {
    flexDirection: "row",
    backgroundColor: colors.blackHighlightBackground,
    alignItems: "center",

    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  starIcon: {
    width: 16,
    height: 16,
  },
  ratingValue: {
    color: colors.whiteText,
    fontSize: 14,
  },
  ratingCount: {
    color: colors.lightgreyDetailsText,
    fontSize: 14,
    marginLeft: 4,
  },
  // ***

  moneyRow: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // backButton: {},
  // backIcon: {},
  // backText: {},
  backButton: {
    position: "absolute",
    bottom: 20,
    left: CONTENT_PADDING,
    right: CONTENT_PADDING,
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
    color: colors.blackHighlightBackground,
    fontSize: 16,
    fontWeight: "600",
  },
});
