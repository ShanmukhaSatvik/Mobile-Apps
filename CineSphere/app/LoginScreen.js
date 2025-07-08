import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../constants/icons";
import FormField from "../components/FormField";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { images } from "../constants/images";
import { login } from "../services/databaseCalls";
import Toast from "react-native-toast-message";
function LoginScreen() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigation();
  const handleSubmit = async () => {
    const trimmedForm = {
      email: (form.email || "").trim(),
      password: form.password || "",
    };
    if (!trimmedForm.email || !trimmedForm.password) {
      Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: "Please fill out both email and password",
      });
      return;
    }
    if (trimmedForm.password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Weak password",
        text2: "Password must be at least 6 characters long",
      });
      return;
    }
    try {
      const user = await login(trimmedForm);
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: "Invalid credentials",
      });
    }
  };
  const handlePress = () => {
    navigation.navigate("Signup");
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
          <View className="flex flex-row items-center justify-center">
            <Image
              source={icons.logo}
              resizeMode="contain"
              className="w-[115px] h-[35px]"
            />
            <Text className="text-2xl text-white font-bold relative right-7">
              CineSphere
            </Text>
          </View>
          <Text className="text-2xl text-white font-semibold mt-10">
            Log in to Cinesphere
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <TouchableOpacity
            className="flex flex-row w-full h-16 items-center justify-center bg-accent rounded-lg py-3.5 mt-10"
            onPress={handleSubmit}
          >
            <Text className="text-xl text-white font-semibold">Log In</Text>
          </TouchableOpacity>
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100">Don't have account?</Text>
            <Text className="text-lg text-accent" onPress={handlePress}>
              Sign Up
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default LoginScreen;
