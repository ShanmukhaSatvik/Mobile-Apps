import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../constants/icons";
import FormField from "../components/FormField";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { images } from "../constants/images";
import { signUp } from "../services/databaseCalls";
import Toast from "react-native-toast-message";
function SignupScreen() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigation = useNavigation();
  const handleSubmit = async () => {
    const trimmedForm = {
      username: (form.username || "").trim(),
      email: (form.email || "").trim(),
      password: form.password || "",
    };
    if (!trimmedForm.username || !trimmedForm.email || !trimmedForm.password) {
      Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: "Please fill out all fields",
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
      const user = await signUp(trimmedForm);
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      }
    } catch (error) {
      let message = error.message;
      if (error.code === "auth/email-already-in-use") {
        message = "User already exists.";
      }
      Toast.show({
        type: "error",
        text1: "Signup failed",
        text2: message,
      });
    }
  };
  const handlePress = () => {
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView>
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
            Sign up to Cinesphere
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="default"
          />
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
            secureTextEntry={true}
          />
          <TouchableOpacity
            className="flex flex-row w-full h-16 items-center justify-center bg-accent rounded-lg py-3.5 mt-10"
            onPress={handleSubmit}
          >
            <Text className="text-xl text-white font-semibold">Sign Up</Text>
          </TouchableOpacity>
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100">
              Have an account already?
            </Text>
            <Text className="text-lg text-accent" onPress={handlePress}>
              Log In
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default SignupScreen;
