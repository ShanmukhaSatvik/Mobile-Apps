import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../constants/icons";
import { genres } from "../constants/genres";
function MovieCard({ id, poster_path, title, vote_average, genre_ids }) {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Movie Details", { id });
  };
  const genre = genre_ids
    ?.map((id) => genres[id])
    .filter(Boolean)
    .slice(0, 2)
    .join(", ");
  return (
    <TouchableOpacity className="w-[30%]" onPress={handlePress}>
      <Image
        source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://placehold.co/80x100/1a1a1a/ffffff.png",
        }}
        className="w-full h-52 rounded-lg"
        resizeMode="cover"
      />
      <Text className="text-sm text-white font-bold mt-2" numberOfLines={1}>
        {title}
      </Text>
      <View className="flex-row items-center justify-start gap-x-1">
        <Image source={icons.star} className="size-4" />
        <Text className="text-xs text-white font-bold uppercase">
          {vote_average?.toFixed(2)}
        </Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text
          className="text-xs text-light-300 font-medium mt-1"
          numberOfLines={1}
        >
          {genre}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export default MovieCard;
