import { ScrollView, View, Image, Text, TouchableOpacity } from "react-native";
import { images } from "../constants/images";
import { icons } from "../constants/icons";
import {
  SavedMoviesCarousel,
  SavedPeopleCarousel,
} from "../components/Carousel";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  fetchSavedMovieDetails,
  fetchSavedPeopleDetails,
} from "../services/databaseCalls";
import { useState, useCallback } from "react";
import Toast from "react-native-toast-message";
function SavedScreen() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState(null);
  const [profiles, setProfiles] = useState(null);
  useFocusEffect(
    useCallback(() => {
      const fetchSavedContent = async () => {
        try {
          const [savedMovies, savedProfiles] = await Promise.all([
            fetchSavedMovieDetails(),
            fetchSavedPeopleDetails(),
          ]);
          setMovies(savedMovies);
          setProfiles(savedProfiles);
        } catch (err) {
          Toast.show({
            type: "error",
            text1: "Failed to load saved content",
            text2: err.message || "Failed to fetch saved data",
          });
          setMovies([]);
          setProfiles([]);
        }
      };
      fetchSavedContent();
      return () => {};
    }, [])
  );
  const hasMovies = movies && movies.length > 0;
  const hasProfiles = profiles && profiles.length > 0;
  const hasBookmarks = hasMovies || hasProfiles;
  return (
    <View className="flex-1">
      <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0" />
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ minHeight: "100%", paddingBottom: 120 }}
        >
          <View className="flex flex-row items-center justify-center mt-24">
            <Image
              source={icons.logo}
              resizeMode="contain"
              className="w-[115px] h-[35px]"
            />
            <Text className="text-2xl text-white font-bold relative right-7">
              CineSphere
            </Text>
          </View>
          {hasBookmarks ? (
            <>
              {hasMovies && <SavedMoviesCarousel movies={movies} />}
              {hasProfiles && <SavedPeopleCarousel profiles={profiles} />}
            </>
          ) : (
            <View>
              <View className="mt-6 px-5 items-center">
                <Image
                  source={images.empty}
                  className="h-64 w-64 rounded-3xl"
                  resizeMode="cover"
                  style={{ margin: "auto" }}
                />
                <Text className="text-sm text-center text-light-300 absolute mt-52">
                  No bookmarks found
                </Text>
                <Text className="text-lg text-center text-white absolute mt-60">
                  No bookmarks found for this profile
                </Text>
              </View>
              <TouchableOpacity
                className="flex flex-row items-center justify-center mx-5 bg-accent rounded-lg py-3.5 mt-8"
                onPress={() => navigation.navigate("Home")}
              >
                <Text className="text-base text-white font-semibold">
                  Back to Explore
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
export default SavedScreen;
