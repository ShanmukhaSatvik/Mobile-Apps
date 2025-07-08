import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import useFetch from "../services/useFetch";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  fetchSimilarMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../services/api";
import {
  CastCard,
  FilmCard,
  MovieCard,
  SavedCastCard,
  SimilarCard,
  TrendingCard,
  UpcomingCard,
} from "./Cards";
import { genres } from "../constants/genres";
import Carousel from "react-native-snap-carousel";
const { width } = Dimensions.get("window");
import {
  removeWatchedMovie,
  removeWatchedCast,
} from "../services/databaseCalls";
export const TrendingMoviesCarousel = () => {
  const navigation = useNavigation();
  const {
    data: movie,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchTrendingMovies());
  return (
    <View>
      {moviesLoading ? (
        <ActivityIndicator
          size="large"
          color="#00f"
          className="mt-10 self-center"
        />
      ) : moviesError ? (
        <Text className="text-base text-white font-bold mt-4">
          Error: {moviesError?.message}
        </Text>
      ) : (
        <>
          <View className="flex flex-row justify-between mt-10 px-2">
            <Text className="text-lg text-white font-bold">Trending</Text>
            <Text
              onPress={() =>
                navigation.navigate("Movie Grid Screen", {
                  title: "Today's Trending Movies",
                  fetchKey: "trending",
                })
              }
              className="text-lg text-accent mr-2"
            >
              See All
            </Text>
          </View>
          <Carousel
            data={movie?.results.slice(0, 5)}
            renderItem={({ item, index }) => (
              <MovieCard movie={item} index={index} />
            )}
            firstItem={2}
            inactiveSlideOpacity={0.6}
            sliderWidth={width}
            itemWidth={width * 0.62}
            slideStyle={{
              display: "flex",
              alignItems: "center",
              marginTop: 20,
            }}
          />
        </>
      )}
    </View>
  );
};
export const GenreCarousel = () => {
  const navigation = useNavigation();
  const genreList = Object.entries(genres)
    .slice(0, 10)
    .map(([id, name]) => ({ id, name }));
  return (
    <View>
      <View className="flex flex-row justify-between mt-4 px-2">
        <Text className="text-lg text-white font-bold">Genres</Text>
      </View>
      <FlatList
        data={genreList}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        className="mt-3"
        ItemSeparatorComponent={() => <View className="w-3" />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Movie Grid Screen", {
                title: `${item.name}`,
                fetchKey: "genre",
                genreId: item.id,
              })
            }
            className="bg-gray-800 px-4 py-2 rounded-2xl"
          >
            <Text className="text-white">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export const UpcomingCarousel = () => {
  const navigation = useNavigation();
  const {
    data: movie,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchUpcomingMovies());
  return (
    <View>
      {moviesLoading ? (
        <ActivityIndicator
          size="large"
          color="#00f"
          className="mt-10 self-center"
        />
      ) : moviesError ? (
        <Text className="text-base text-white font-bold">
          Error: {moviesError?.message}
        </Text>
      ) : (
        <>
          <View className="flex flex-row justify-between mt-4 px-2">
            <Text className="text-lg text-white font-bold">Upcoming</Text>
            <Text
              onPress={() =>
                navigation.navigate("Movie Grid Screen", {
                  title: "Upcoming Movies",
                  fetchKey: "upcoming",
                })
              }
              className="text-lg text-accent mr-2"
            >
              See All
            </Text>
          </View>
          <FlatList
            data={movie?.results.slice(0, 8)}
            renderItem={({ item }) => {
              return <UpcomingCard movie={item} />;
            }}
            className="mb-4 mt-3"
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-4" />}
          />
        </>
      )}
    </View>
  );
};
export const TopRatedCarousel = () => {
  const navigation = useNavigation();
  const {
    data: movie,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchTopRatedMovies());
  return (
    <View>
      {moviesLoading ? (
        <ActivityIndicator
          size="large"
          color="#00f"
          className="mt-10 self-center"
        />
      ) : moviesError ? (
        <Text className="text-base text-white font-bold">
          Error: {moviesError?.message}
        </Text>
      ) : (
        <>
          <View className="flex flex-row justify-between mt-6 px-2">
            <Text className="text-lg text-white font-bold">Top Rated</Text>
            <Text
              onPress={() =>
                navigation.navigate("Movie Grid Screen", {
                  title: "Top Rated Movies",
                  fetchKey: "topRated",
                })
              }
              className="text-lg text-accent mr-2"
            >
              See All
            </Text>
          </View>
          <FlatList
            data={movie?.results.slice(0, 5)}
            renderItem={({ item, index }) => {
              return <TrendingCard movie={item} index={index} />;
            }}
            className="mb-4 mt-3"
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-4" />}
          />
        </>
      )}
    </View>
  );
};
export const SimilarCarousel = () => {
  const route = useRoute();
  const { id } = route.params;
  const { data: movie } = useFetch(() => id && fetchSimilarMovies({ id }));
  return (
    <View>
      <View className="flex flex-row justify-between mt-2 mx-2 px-2">
        <Text className="text-lg text-white font-bold">Similar Movies</Text>
      </View>
      <FlatList
        data={movie?.slice(0, 8)}
        renderItem={({ item }) => {
          return <SimilarCard movie={item} />;
        }}
        className="mb-4 mt-3"
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-4" />}
      />
    </View>
  );
};
export const MoviesCarousel = ({ movies }) => {
  return (
    <View>
      <View className="flex flex-row justify-between mt-2 mx-2 px-2">
        <Text className="text-lg text-white font-bold">Movies</Text>
      </View>
      <FlatList
        data={movies}
        renderItem={({ item }) => {
          return <SimilarCard movie={item} />;
        }}
        className="mb-4 mt-3"
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-4" />}
      />
    </View>
  );
};
export const SavedMoviesCarousel = ({ movies }) => {
  const navigation = useNavigation();
  if (!movies) {
    return (
      <ActivityIndicator
        size="large"
        color="#00f"
        className="mt-10 self-center"
      />
    );
  }
  return (
    <View>
      <View className="flex flex-row justify-between mt-10 px-2">
        <Text className="text-lg text-white font-bold">Saved Movies</Text>
        <Text
          onPress={() =>
            navigation.navigate("Movie Grid Screen", {
              title: "Saved Movies",
              fetchKey: "savedMovies",
            })
          }
          className="text-lg text-accent mr-2"
        >
          See All
        </Text>
      </View>
      <Carousel
        data={movies?.slice(0, 5)}
        renderItem={({ item, index }) => (
          <MovieCard movie={item} index={index} />
        )}
        firstItem={2}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{
          display: "flex",
          alignItems: "center",
          marginTop: 20,
        }}
      />
    </View>
  );
};
export const SavedPeopleCarousel = ({ profiles }) => {
  const navigation = useNavigation();
  if (!profiles) {
    return (
      <ActivityIndicator
        size="large"
        color="#00f"
        className="mt-10 self-center"
      />
    );
  }
  return (
    <View>
      <View className="flex flex-row justify-between mt-4 px-2">
        <Text className="text-lg text-white font-bold">Saved Cast</Text>
        <Text
          onPress={() =>
            navigation.navigate("People Grid Screen", {
              title: "Saved Cast",
            })
          }
          className="text-lg text-accent mr-2"
        >
          See All
        </Text>
      </View>
      <FlatList
        data={profiles.slice(0, 8)}
        renderItem={({ item }) => {
          return <SavedCastCard cast={item} />;
        }}
        className="mb-4 mt-3"
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-4" />}
      />
    </View>
  );
};
export const HistoryCarousel = ({
  watchedMovies = [],
  watchedPeople = [],
  onRefresh,
}) => {
  const navigation = useNavigation();
  const handleMoviePress = (id) => navigation.push("Movie Details", { id });
  const handlePersonPress = (id) =>
    navigation.push("Cast Details Screen", { id });
  const handleRemoveMovie = async (id) => {
    try {
      await removeWatchedMovie(id);
      onRefresh?.();
    } catch (err) {
      Toast.show({ type: "error", text1: "Remove failed", text2: err.message });
    }
  };
  const handleRemovePerson = async (id) => {
    try {
      await removeWatchedCast(id);
      onRefresh?.();
    } catch (err) {
      Toast.show({ type: "error", text1: "Remove failed", text2: err.message });
    }
  };
  return (
    <View className="mt-8">
      <Text className="text-lg text-white font-bold px-2 mb-4">
        Watch History
      </Text>
      {watchedPeople.length > 0 && (
        <View className="flex flex-wrap flex-row justify-evenly mb-6">
          {watchedPeople.map((person) => (
            <TouchableOpacity
              key={person.id}
              onPress={() => handlePersonPress(person.id)}
              className="mb-4"
            >
              <CastCard cast={person} onRemove={handleRemovePerson} />
            </TouchableOpacity>
          ))}
        </View>
      )}
      {watchedMovies.length > 0 && (
        <View className="space-y-4">
          {watchedMovies.map((movie) => (
            <TouchableOpacity
              key={movie.id}
              onPress={() => handleMoviePress(movie.id)}
            >
              <FilmCard movie={movie} onRemove={handleRemoveMovie} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
