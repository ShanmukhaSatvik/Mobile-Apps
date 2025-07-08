import {
  Dimensions,
  ScrollView,
  Image,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { fetchPersonProfile } from "../services/api";
import useFetch from "../services/useFetch";
import { MoviesCarousel } from "../components/Carousel";
import { icons } from "../constants/icons";
const { width, height } = Dimensions.get("window");
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import Toast from "react-native-toast-message";
import { toggleSave, isSaved } from "../services/databaseCalls";
import { addWatchedCast } from "../services/databaseCalls";
function CastDetailsScreen({}) {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const fetchPersonById = useCallback(() => {
    return fetchPersonProfile({ id });
  }, [id]);
  const { data: person, loading, error } = useFetch(fetchPersonById);
  const [isBookmarked, setIsBookmarked] = useState(false);
  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const saved = await isSaved("person", id);
        setIsBookmarked(saved);
      } catch (err) {
        console.error("Failed to check bookmark status:", err.message);
      }
    };
    checkBookmark();
  }, [id]);
  useEffect(() => {
    if (!loading && !error && person?.id) {
      addWatchedCast(person.id).catch((err) =>
        console.error("Failed to mark cast as watched:", err.message)
      );
    }
  }, [loading, error, person?.id]);
  const handleBookmarkToggle = async () => {
    try {
      const newStatus = await toggleSave("person", id);
      setIsBookmarked(newStatus);
      Toast.show({
        type: newStatus ? "success" : "info",
        text1: newStatus ? "Added to bookmarks" : "Removed from bookmarks",
        text2: person?.name || "Person updated",
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
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
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
      {loading ? (
        <View
          style={{
            flex: 1,
            height: height,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#00f" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center mt-10">
          <Text className="text-base text-white font-bold">
            Error: {error?.message}
          </Text>
        </View>
      ) : (
        person && (
          <View>
            <View className="flex-row justify-center mt-10">
              <View className="items-center rounded-full overflow-hidden h-81 w-72 border-2 border-neutral-500">
                <Image
                  source={{
                    uri: person.profile_path
                      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                      : "https://placehold.co/600x400/1a1a1a/ffffff.png",
                  }}
                  resizeMode="contain"
                  style={{ width: width * 0.74, height: height * 0.43 }}
                />
              </View>
            </View>
            <View className="mt-4">
              <Text className="text-3xl font-bold text-white text-center">
                {person.name}
              </Text>
              <Text className="text-base text-neutral-500 text-center">
                {person.place_of_birth || "Unknown"}
              </Text>
            </View>
            <View className="mx-3 p-4 mt-4 flex-row justify-between items-center bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="font-semibold text-white">Gender</Text>
                <Text className="text-sm text-neutral-400">
                  {person.gender === 1
                    ? "Female"
                    : person.gender === 2
                    ? "Male"
                    : "Other"}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-4 items-center">
                <Text className="font-semibold text-white">Birthday</Text>
                <Text className="text-sm text-neutral-400">
                  {person.birthday || "N/A"}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="font-semibold text-white">Known for</Text>
                <Text className="text-sm text-neutral-400">
                  {person.known_for_department || "N/A"}
                </Text>
              </View>
              <View className="px-2 items-center">
                <Text className="font-semibold text-white">Popularity</Text>
                <Text className="text-sm text-neutral-400">
                  {person.popularity?.toFixed(1) || "N/A"}
                </Text>
              </View>
            </View>
            <View className="my-4 mx-4 space-y-2">
              <Text className="text-lg font-semibold text-white">
                Biography
              </Text>
              <Text className="text-neutral-500 tracking-wide">
                {person.biography || "Biography not available."}
              </Text>
            </View>
            <MoviesCarousel movies={person.movieCredits || []} />
            <TouchableOpacity
              className="flex flex-row items-center justify-center mx-5 bg-accent rounded-lg py-3.5 mt-4"
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
        )
      )}
    </ScrollView>
  );
}
export default CastDetailsScreen;
