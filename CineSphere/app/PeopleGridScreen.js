import {
  View,
  ActivityIndicator,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { images } from "../constants/images";
import { icons } from "../constants/icons";
import useFetch from "../services/useFetch";
import { fetchSavedPeopleDetails } from "../services/databaseCalls";
import { useCallback } from "react";
const PeopleGridScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title } = route.params;
  const {
    data: profiles,
    loading,
    error,
    refetch,
  } = useFetch(fetchSavedPeopleDetails);
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
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#00f"
            className="flex-1 self-center"
          />
        ) : error ? (
          <Text className="text-base text-white font-bold">
            Error: {error.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              {title}
            </Text>
            <FlatList
              data={profiles}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="w-[30%] m-2"
                  onPress={() =>
                    navigation.navigate("Cast Details Screen", { id: item.id })
                  }
                >
                  <Image
                    source={{
                      uri: item.profile_path
                        ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                        : "https://placehold.co/100x140/1a1a1a/ffffff?text=?",
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                  />
                  <Text
                    className="text-sm text-white font-bold mt-2"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              scrollEnabled={false}
              contentContainerStyle={{ gap: 10, paddingBottom: 100 }}
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
export default PeopleGridScreen;
