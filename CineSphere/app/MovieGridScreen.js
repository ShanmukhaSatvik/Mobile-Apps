import {
  View,
  ActivityIndicator,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { images } from "../constants/images";
import { icons } from "../constants/icons";
import MovieCard from "../components/MovieCard";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import useFetch from "../services/useFetch";
import {
  fetchMoviesByGenre,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../services/api";
import { fetchSavedMovieDetails } from "../services/databaseCalls";
import { useCallback } from "react";
const MovieGridScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { title, fetchKey, genreId } = route.params;
  const fetchFnMap = {
    trending: () => fetchTrendingMovies({}),
    upcoming: () => fetchUpcomingMovies({}),
    genre: () => fetchMoviesByGenre({ id: genreId }),
    topRated: () => fetchTopRatedMovies({}),
    savedMovies: () => fetchSavedMovieDetails(),
  };
  const fetchFn = fetchFnMap[fetchKey];
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
  } = useFetch(fetchFn);
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
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
        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#00f"
            className="flex-1 self-center"
          />
        ) : moviesError ? (
          <Text className="text-base text-white font-bold">
            Error: {moviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              {title}
            </Text>
            <FlatList
              data={movies?.results || movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              contentContainerStyle={{ gap: 10 }}
              scrollEnabled={false}
            />
            <TouchableOpacity
              className="flex flex-row items-center justify-center absolute bottom-5 left-0 right-0 w-full bg-accent rounded-lg py-3.5 mb-7 z-50"
              onPress={() => navigation.goBack()}
            >
              <Image
                source={icons.arrow}
                className="size-5 mr-1 mt-0.5 rotate-180"
                tintColor="#fff"
              />
              <Text className="text-base text-white font-semibold">
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
export default MovieGridScreen;
