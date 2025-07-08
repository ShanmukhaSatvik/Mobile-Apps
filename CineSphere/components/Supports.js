import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
export const Cast = ({ cast }) => {
  const navigation = useNavigation();
  return (
    <View className="my-2">
      <Text className="text-lg font-bold text-white mx-4 mb-3">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="mr-4 items-center"
                onPress={() =>
                  navigation.navigate("Cast Details Screen", { id: person.id })
                }
              >
                <View className="overflow-hidden rounded-full h-25 w-25 items-center border border-neutral-500">
                  <Image
                    className="rounded-2xl h-24 w-20"
                    source={{
                      uri: person?.profile_path
                        ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                        : "https://placehold.co/80x100/1a1a1a/ffffff.png",
                    }}
                  />
                </View>
                <Text className="text-xs text-white mt-1">
                  {person?.name.length > 10
                    ? person.name.slice(0, 10) + "..."
                    : person.name}
                </Text>
                <Text className="text-xs text-neutral-500 mt-1">
                  {person?.character.length > 10
                    ? person.character.slice(0, 10) + "..."
                    : person.character}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};
