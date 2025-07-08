import { ScrollView, View, Image, Text } from "react-native";
import { images } from "../constants/images";
import { icons } from "../constants/icons";
import {
  GenreCarousel,
  TopRatedCarousel,
  TrendingMoviesCarousel,
  UpcomingCarousel,
} from "../components/Carousel";
function LandingScreen() {
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 120 }}
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
        <TrendingMoviesCarousel />
        <GenreCarousel />
        <TopRatedCarousel />
        <UpcomingCarousel />
      </ScrollView>
    </View>
  );
}
export default LandingScreen;
