import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { fetchMovies } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import { useEffect, useState } from "react";
import { updateSearchCount } from "@/services/appwrite";
import { colors } from "@/constants/colors";
import { images } from "@/constants/images";
import Loading from "@/components/Loading";

export default function Search() {
  const [searchQuery, setsearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  function handleSearchTextChange(text: string) {
    setsearchQuery(text);
  }

  const {
    data: movies = [],
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);
  // } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      reset();
      setIsTyping(false);
      return;
    }

    setIsTyping(true);

    const timeoutId = setTimeout(async () => {
      const movies_currentState = await loadMovies();

      setIsTyping(false);

      // Call updateSearchCount only if there are results!
      if (!movies_currentState || movies_currentState.length === 0) return;

      const firstMovieResult = movies_currentState[0];
      // console.log("logging movies");
      // console.log(movies_currentState);

      await updateSearchCount(searchQuery, firstMovieResult);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  // ✅ CONDITIONAL UI GOES AFTER ALL HOOKS

  function NoSearchQueryComponent() {
    return (
      <View style={styles.emptyContainer}>
        <Image style={styles.emptyImage} source={images.startSearching} />
        <Text style={styles.emptyText}>START SEARCHING...</Text>
      </View>
    );
  }

  function FlatListComponent() {
    return (
      <FlatList
        data={movies}
        style={styles.flatlist}
        renderItem={({ item }) => {
          return <MovieCard {...item} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={() => {
          if (searchQuery) {
            return (
              <Text style={styles.resultsHeader} numberOfLines={1}>
                Search Results for:{" "}
                <Text style={styles.resultsQuery}>"{searchQuery}"</Text>
              </Text>
            );
          }
        }}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          paddingLeft: 5,
          marginBottom: 10,
        }}
        contentContainerStyle={{
          paddingBottom: 100, // bottom of Flatlist is above TabBar
        }}
        ListEmptyComponent={() => (
          <>
            <View style={styles.emptyContainer}>
              <Image style={styles.emptyImage} source={images.noResultFound} />
              <Text style={styles.emptyText}>NO RESULT FOUND</Text>
            </View>
          </>
        )}
      />
    );
  }

  if (moviesLoading) {
    return (
      <SafeAreaView edges={["top"]} style={styles.container}>
        <SearchBar
          placeholder="Search a movie.."
          value={searchQuery}
          onChangeText={handleSearchTextChange}
        />
        <Loading />
      </SafeAreaView>
    );
  }

  if (!moviesLoading && moviesError) {
    return (
      <SafeAreaView edges={["top"]} style={styles.container}>
        <View>
          <Text>There is an error: {moviesError.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Channel content
  let content;
  if (!searchQuery.trim()) {
    content = <NoSearchQueryComponent />;
  } else if (isTyping) {
    content = <Loading message="TYPING..." />;
  } else {
    content = <FlatListComponent />;
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <SearchBar
        placeholder="Search a movie.."
        value={searchQuery}
        onChangeText={handleSearchTextChange}
      />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackBackground,
    paddingHorizontal: 10,
  },
  // text: {},
  flatlist: {
    // borderWidth: 4,
    // borderColor: "black",
  },

  resultsHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.brightWhiteText,
    marginBottom: 8,
  },
  resultsQuery: {
    color: colors.zattooOrange,
    fontStyle: "italic",
  },
  emptyContainer: {
    marginTop: 40,
    paddingHorizontal: 20,

    justifyContent: "center",
    alignItems: "center",
  },
  emptyImage: {
    height: 200,
    width: 200,
    marginBottom: 25, // may remove
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.lightgreyDetailsText,
  },
});
