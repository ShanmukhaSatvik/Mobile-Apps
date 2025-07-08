import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "../constants/images";
const { width, height } = Dimensions.get("window");
export const TrendingCard = ({ movie, index }) => {
  const navigation = useNavigation();
  const id = movie.id;
  const poster_path = movie.poster_path;
  const handlePress = () => {
    navigation.navigate("Movie Details", { id });
  };
  return (
    <TouchableOpacity onPress={handlePress} className="w-32 relative pl-5 mr-5">
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://placehold.co/600x400/1a1a1a/ffffff.png",
        }}
        className="w-32 h-48 rounded-lg"
        resizeMode="cover"
      />
      <View className="absolute bottom-7 left-1 rounded-full">
        <MaskedView
          maskElement={
            <Text className="text-6xl font-bold text-white">{index + 1}</Text>
          }
        >
          <Image
            source={images.rankingGradient}
            className="size-14"
            resizeMode="cover"
          />
        </MaskedView>
      </View>
      <Text
        className="text-sm text-light-200 font-bold mt-1 ml-1"
        numberOfLines={1}
      >
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
};
export const UpcomingCard = ({ movie }) => {
  const navigation = useNavigation();
  const id = movie.id;
  const poster_path = movie.poster_path;
  const handlePress = () => {
    navigation.navigate("Movie Details", { id });
  };
  return (
    <TouchableOpacity onPress={handlePress} className="w-32 relative pl-5 mr-5">
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://placehold.co/80x100/1a1a1a/ffffff.png",
        }}
        className="w-32 h-48 rounded-lg"
        resizeMode="cover"
      />
      <View className="absolute bottom-7 left-1 rounded-full"></View>
      <Text
        className="text-sm text-light-200 font-bold mt-1 ml-1"
        numberOfLines={1}
      >
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
};
export const SimilarCard = ({ movie }) => {
  const navigation = useNavigation();
  const id = movie.id;
  const poster_path = movie.poster_path;
  const handlePress = () => {
    navigation.push("Movie Details", { id });
  };
  return (
    <TouchableOpacity onPress={handlePress} className="w-32 relative pl-5 mr-5">
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://placehold.co/80x100/1a1a1a/ffffff.png",
        }}
        className="w-32 h-48 rounded-lg"
        resizeMode="cover"
      />
      <View className="absolute bottom-7 left-1 rounded-full"></View>
      <Text
        className="text-sm text-light-200 font-bold mt-1 ml-1"
        numberOfLines={1}
      >
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
};
export const MovieCard = ({ movie }) => {
  const navigation = useNavigation();
  const id = movie.id;
  const poster_path = movie.poster_path;
  const handlePress = () => {
    navigation.navigate("Movie Details", { id });
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://placehold.co/600x400/1a1a1a/ffffff.png",
        }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
        resizeMode="cover"
      />
      <Text
        className="text-lg text-light-200 font-bold text-center mt-2"
        numberOfLines={1}
      >
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
};
export const CastCard = ({ cast, onRemove }) => {
  return (
    <View className="bg-gray-900 rounded-2xl p-3 w-44 mr-4 shadow-md">
      <TouchableOpacity
        className="absolute top-2 right-1 z-10 bg-white rounded-full w-6 h-6 items-center justify-center"
        onPress={() => onRemove?.(cast?.id)}
      >
        <Text className="text-black text-sm font-bold leading-[16px]">✕</Text>
      </TouchableOpacity>
      <Image
        source={{
          uri: cast?.profile_path
            ? `https://image.tmdb.org/t/p/w300${cast?.profile_path}`
            : "https://placehold.co/80x100/1a1a1a/ffffff.png",
        }}
        className="w-36 h-36 rounded-full mx-auto mb-3"
        resizeMode="cover"
      />
      <Text
        className="text-white text-sm font-semibold text-center mb-1"
        numberOfLines={1}
      >
        {cast?.name}
      </Text>
    </View>
  );
};
export const FilmCard = ({ movie, onRemove }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie?.poster_path}`;
  const shortOverview =
    movie?.overview?.length > 150
      ? movie.overview.slice(0, 150).trim() + "..."
      : movie.overview;
  return (
    <View className="bg-gray-900 rounded-2xl flex-row items-start p-3 mb-4 shadow-md">
      <TouchableOpacity
        className="absolute top-2 right-2 z-10 bg-white rounded-full w-7 h-7 items-center justify-center shadow-md"
        onPress={() => onRemove?.(movie?.id)}
      >
        <Text className="text-black text-base font-bold">✕</Text>
      </TouchableOpacity>
      <Image
        source={{ uri: imageUrl }}
        className="w-28 h-40 rounded-2xl mr-4"
        resizeMode="cover"
      />
      <View className="flex-1 justify-between">
        <Text className="text-white text-lg font-semibold mb-1">
          {movie?.title}
        </Text>
        <Text
          className="text-gray-300 text-sm leading-snug mb-1"
          numberOfLines={3}
        >
          {shortOverview}
        </Text>
        <View>
          <Text className="text-gray-400 text-xs mb-1">
            Language: {movie?.original_language?.toUpperCase()}
          </Text>
          <Text className="text-gray-400 text-xs">
            Release: {movie?.release_date}
          </Text>
        </View>
      </View>
    </View>
  );
};
export const SavedCastCard = ({ cast }) => {
  const navigation = useNavigation();
  const { id, profile_path, name } = cast;
  const handlePress = () => {
    navigation.navigate("Cast Details Screen", { id });
  };
  return (
    <TouchableOpacity onPress={handlePress} className="w-32 relative pl-5 mr-5">
      <Image
        source={{
          uri: profile_path
            ? `https://image.tmdb.org/t/p/w500${profile_path}`
            : "https://placehold.co/80x100/1a1a1a/ffffff.png",
        }}
        className="w-32 h-48 rounded-lg"
        resizeMode="cover"
      />
      <View className="absolute bottom-7 left-1 rounded-full"></View>
      <Text
        className="text-sm text-light-200 font-bold mt-1 ml-1"
        numberOfLines={1}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};
