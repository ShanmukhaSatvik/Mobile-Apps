import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import useFetch from "../services/useFetch";
import { fetchMovieDetails } from "../services/api";
import { icons } from "../constants/icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Cast } from "../components/Supports";
import { SimilarCarousel } from "../components/Carousel";
const { width, height } = Dimensions.get("window");
import { AntDesign } from "@expo/vector-icons";
import { toggleSave, isSaved } from "../services/databaseCalls";
import { useEffect, useState, useCallback } from "react";
import Toast from "react-native-toast-message";
import { addWatchedMovie } from "../services/databaseCalls";
function MovieDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const fetchMovieById = useCallback(() => {
    return fetchMovieDetails({ id });
  }, [id]);
  const { data: movie, loading, error } = useFetch(fetchMovieById);
  const [isBookmarked, setIsBookmarked] = useState(false);
  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const saved = await isSaved("movie", id);
        setIsBookmarked(saved);
      } catch (err) {
        console.error("Failed to check bookmark status:", err.message);
      }
    };
    checkBookmark();
  }, [id]);
  useEffect(() => {
    if (!loading && !error && movie?.id) {
      addWatchedMovie(movie.id).catch((err) =>
        console.error("Failed to mark movie as watched:", err.message)
      );
    }
  }, [loading, error, movie?.id]);
  const handleBookmarkToggle = async () => {
    try {
      const newStatus = await toggleSave("movie", id);
      setIsBookmarked(newStatus);
      Toast.show({
        type: newStatus ? "success" : "info",
        text1: newStatus ? "Added to bookmarks" : "Removed from bookmarks",
        text2: movie?.title || "Movie updated",
        position: "bottom",
      });
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      Toast.show({
        type: "error",
        text1: "Bookmark failed",
        text2: error.message,
        position: "bottom",
      });
    }
  };
  return (
    <View className="flex-1 bg-neutral-900">
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#00f"
          className="flex-1 self-center"
        />
      ) : error ? (
        <Text className="text-base text-white font-bold">
          Error: {error?.message}
        </Text>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          className="flex-1 bg-neutral-900"
        >
          <View className="w-full">
            <View>
              <Image
                source={{
                  uri: movie?.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                    : "https://placehold.co/600x400/1a1a1a/ffffff.png",
                }}
                resizeMode="stretch"
                style={{ width, height: height * 0.55 }}
              />
              <TouchableOpacity
                className="absolute top-12 right-6 p-3 rounded-full border border-white/30"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                }}
                onPress={handleBookmarkToggle}
              >
                <AntDesign
                  name="heart"
                  size={28}
                  color={isBookmarked ? "#ff2d55" : "#fff"}
                />
              </TouchableOpacity>
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.8)",
                  "rgba(23,23,23,1)",
                ]}
                style={{ width, height: height * 0.4 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>
          </View>
          <View className="space-y-3" style={{ marginTop: -(height * 0.09) }}>
            <Text className="text-3xl font-bold text-white text-center tracking-wider">
              {movie?.title}
            </Text>
            <Text className="text-base font-semibold text-neutral-500 text-center mt-1">
              {movie?.release_date
                ? (() => {
                    const [year, month, day] = movie.release_date.split("-");
                    return `Released On · ${day}-${month}-${year} · ${movie?.runtime} min`;
                  })()
                : "N/A"}
            </Text>
            <View className="flex-row justify-center mx-4 space-x-2">
              <Text className="text-base font-semibold text-neutral-500 text-center mt-1">
                {movie?.genres.map((genre) => genre.name).join(" · ") || "N/A"}
              </Text>
            </View>
            <View className="flex-row items-center justify-center px-2 py-1 rounded-md gap-x-1 mt-1 ml-4">
              <Image source={icons.star} className="size-4" />
              <Text className="text-sm text-white font-bold">
                {Math.round(movie?.vote_average ?? 0)}/10
              </Text>
              <Text className="text-sm text-neutral-400 ml-1">
                ({movie?.vote_count} votes)
              </Text>
            </View>
            <Text className="text-neutral-500 mx-4 tracking-wide mt-2">
              {movie?.overview}
            </Text>
          </View>
          <View className="mx-5 mt-2 mb-2 flex-row justify-between">
            <View className="flex-1">
              <Text className="text-neutral-300 font-semibold mb-1">
                Budget
              </Text>
              <Text className="text-neutral-500">
                {movie?.budget
                  ? `$${(movie.budget / 1_000_000).toFixed(1)} million`
                  : "N/A"}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-neutral-300 font-semibold mb-1">
                Box-Office Collection
              </Text>
              <Text className="text-neutral-500">
                {movie?.revenue
                  ? `$${(movie.revenue / 1_000_000).toFixed(1)} million`
                  : "N/A"}
              </Text>
            </View>
          </View>
          <Cast cast={movie?.cast.slice(0, 8)} />
          <SimilarCarousel id={id} />
          <TouchableOpacity
            className="flex flex-row items-center justify-center mx-5 bg-accent rounded-lg py-3.5 mt-4"
            onPress={() => navigation.goBack()}
          >
            <Image
              source={icons.arrow}
              className="size-5 mr-1 mt-0.5 rotate-180"
              tintColor="#fff"
            />
            <Text className="text-base text-white font-semibold">Go Back</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}
export default MovieDetailsScreen;
