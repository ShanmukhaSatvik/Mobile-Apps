import { View, Image, FlatList, ActivityIndicator, Text } from "react-native";
import { images } from "../constants/images";
import { icons } from "../constants/icons";
import MovieCard from "../components/MovieCard";
import useFetch from "../services/useFetch";
import { fetchMovies } from "../services/api";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="flex flex-row items-center justify-center mt-16">
              <Image
                source={icons.logo}
                resizeMode="contain"
                className="w-[115px] h-[35px]"
              />
              <Text className="text-2xl text-white font-bold relative right-7">
                CineSphere
              </Text>
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies ..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
                onClear={() => setSearchQuery("")}
                showClearButton={true}
              />
            </View>
            {loading && (
              <ActivityIndicator size="large" color="#00f" className="my-3" />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}
            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl text-white font-bold">
                Search Results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Image
                source={images.movieTime}
                className="h-64 w-64 rounded-3xl"
                resizeMode="cover"
                style={{ margin: "auto" }}
              />
              <Text className="text-lg text-center text-light-300 mt-2">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
export default SearchScreen;
