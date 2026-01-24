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
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";

import { fetchMovies } from "@/services/api";
import { useFetch } from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import TrendingMovieCard from "@/components/TrendingMovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import Loading from "@/components/Loading";
import { images } from "@/constants/images";

async function buttonOnClick() {
  const data = await fetchMovies({ query: "" });
  console.log("all movies fetched");
  console.log(data);

  const trendingData = await getTrendingMovies();
  console.log("trending movies fetched(if there is)");
  console.log(trendingData);
}

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(getTrendingMovies);

  // if still loading
  if (moviesLoading || trendingMoviesLoading) {
    return (
      <SafeAreaView edges={["top"]} style={styles.container}>
        <SearchBar placeholder="Press to be redirected to Search" />
        <Loading />
      </SafeAreaView>
    );
  }

  // if there is an error
  if (moviesError || trendingMoviesError) {
    return (
      <>
        <View>
          <Text>
            Error: {moviesError?.message || trendingMoviesError?.message}
          </Text>
        </View>
      </>
    );
  }

  function TrendingMoviesFlatlistComponent() {
    return (
      <View style={styles.trendingSectionContainer}>
        <Text style={styles.trendingSectionTitle}>
          Trending Movies{" "}
          <Text style={styles.trendingSectionTitleNote}>
            (tracks your searches actively)
          </Text>
        </Text>

        <FlatList
          horizontal
          data={trendingMovies}
          showsHorizontalScrollIndicator={false}
          style={styles.trendingFlatlist}
          renderItem={({ item, index }) => {
            return <TrendingMovieCard {...item} trendingRank={index + 1} />;
          }}
          keyExtractor={(item) => item.$id.toString()}
          ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          // contentContainerStyle={{
          //   paddingBottom: 100, // bottom of Flatlist is above TabBar
          // }}
          // ListEmptyComponent={() => (
          //   <>
          //     <View style={styles.emptyContainer}>
          //       <Image style={styles.emptyImage} source={images.noResultFound} />
          //       <Text style={styles.emptyText}>NO RESULT FOUND</Text>
          //     </View>
          //   </>
          // )}
        />
      </View>
    );
  }

  function MoviesFlatlistComponent() {
    return (
      <FlatList
        scrollEnabled={false}
        data={movies}
        // style={styles.trendingFlatlist}
        renderItem={({ item }) => {
          return <MovieCard {...item} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={() => (
          <Text style={styles.flatlistHeaderText}>Latest Movies</Text>
        )}
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

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <SearchBar
        placeholder="Redirect(on Mobile) to Search Page..."
        onPress={() => {
          router.push("/search");
        }}
      />
      {/* <Button
        title="click to fetch"
        onPress={() => {
          buttonOnClick();
        }}
      /> */}

      <ScrollView>
        {/* only render if trendingMovies exists*/}
        {trendingMovies && <TrendingMoviesFlatlistComponent />}

        <MoviesFlatlistComponent />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackBackground,
    paddingHorizontal: 10,
  },
  trendingSectionContainer: {
    // marginTop: 40,
    marginBottom: 20,
  },
  trendingSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.brightWhiteText,
    marginBottom: 12,
  },
  trendingSectionTitleNote: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.lightgreyDetailsText,
  },

  trendingFlatlist: {
    // gap: 26,
    // marginTop: 12,
    // marginBottom: 16,
    // backgroundColor: "grey",
  },

  flatlistHeaderText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.brightWhiteText,
    marginBottom: 8,
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
