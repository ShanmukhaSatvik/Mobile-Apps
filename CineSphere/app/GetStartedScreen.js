import { Image, Text, View, TouchableOpacity } from "react-native";
import { images } from "../constants/images";
import { useNavigation } from "@react-navigation/native";
function GetStartedScreen() {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Signup");
  };
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.introPic}
        className="w-full h-[500px]"
        resizeMode="stretch"
      />
      <View className="flex-col items-center justify-center mt-8 px-5">
        <Text className="text-2xl text-white font-bold">
          Welcome to{" "}
          <Text className="text-2xl text-accent font-bold">CineSphere</Text>
        </Text>
        <Text className="text-2xl text-white font-bold">
          Your Ultimate Movie Companion
        </Text>
      </View>
      <View className="flex-col items-start justify-center mt-5 ml-4">
        <Text className="text-base text-light-100 font-bold mt-2">
          Explore what’s trending, uncover hidden gems, and find your next
          favorite film. Dive into the lives of the stars behind the screen, and
          save the stories that matter to you — all in one seamless experience
        </Text>
      </View>
      <TouchableOpacity
        className="flex flex-row items-center justify-center absolute bottom-24 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 mb-7 z-50"
        onPress={handlePress}
      >
        <Text className="text-base text-white font-semibold">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
export default GetStartedScreen;
