import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { images } from "../constants/images";
import { icons } from "../constants/icons";
import { HistoryCarousel } from "../components/Carousel";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  fetchWatchedMovieDetails,
  fetchWatchedPeopleDetails,
} from "../services/databaseCalls";
import { getAuth, signOut } from "firebase/auth";
import Toast from "react-native-toast-message";
import { Feather } from "@expo/vector-icons";
import { useState, useCallback } from "react";
function ProfileScreen() {
  const navigation = useNavigation();
  const auth = getAuth();
  const [movies, setMovies] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Toast.show({
        type: "success",
        text1: "Logout Successful",
        text2: "You’ve been signed out.",
      });
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Logout failed",
        text2: error.message || "Please try again",
      });
    }
  };
  const fetchHistory = async () => {
    try {
      const [watchedMovies, watchedProfiles] = await Promise.all([
        fetchWatchedMovieDetails(),
        fetchWatchedPeopleDetails(),
      ]);
      setMovies(watchedMovies);
      setProfiles(watchedProfiles);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Failed to load history",
        text2: err.message || "Please try again later",
      });
      setMovies([]);
      setProfiles([]);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchHistory();
      return () => {};
    }, [])
  );
  const hasMovies = movies && movies.length > 0;
  const hasProfiles = profiles && profiles.length > 0;
  const hasHistory = hasMovies || hasProfiles;
  return (
    <View className="flex-1">
      <View className="flex-1 bg-primary">
        <Image source={images.bg} className="absolute w-full z-0" />
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ minHeight: "100%", paddingBottom: 120 }}
        >
          <View className="flex flex-row items-center justify-between mt-24">
            <View className="flex flex-row items-center ml-[-28px]">
              <Image
                source={icons.logo}
                resizeMode="contain"
                className="w-[115px] h-[35px]"
              />
              <Text className="text-2xl text-white font-bold ml-[-28px]">
                CineSphere
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-accent p-3 rounded-full active:opacity-70"
              accessibilityLabel="Logout"
            >
              <Text className="text-white font-medium text-sm">
                {" "}
                <Feather name="log-out" size={23} color="#fff" />{" "}
              </Text>
            </TouchableOpacity>
          </View>
          {hasHistory ? (
            <>
              {/* Recommended for you */}
              <HistoryCarousel
                watchedMovies={movies}
                watchedPeople={profiles}
                onRefresh={fetchHistory}
              />
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
                  No searches so far
                </Text>
                <Text className="text-lg text-center text-white absolute mt-60">
                  No recommendations for this profile
                </Text>
              </View>
              <TouchableOpacity
                className="flex flex-row items-center justify-center mx-5 bg-accent rounded-lg py-3.5 mt-8"
                onPress={() =>
                  navigation.navigate("Movie Grid Screen", {
                    title: "Today's Trending Movies",
                    fetchKey: "trending",
                  })
                }
              >
                <Text className="text-base text-white font-semibold">
                  Kick Off with Top Picks
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
export default ProfileScreen;
