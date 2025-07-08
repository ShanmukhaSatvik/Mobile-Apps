import { Image, ImageBackground, StatusBar, Text } from "react-native";
import LandingScreen from "./app/LandingScreen";
import SavedScreen from "./app/SavedScreen";
import SearchScreen from "./app/SearchScreen";
import ProfileScreen from "./app/ProfileScreen";
import MovieDetailsScreen from "./app/MovieDetailsScreen";
import GetStartedScreen from "./app/GetStartedScreen";
import LoginScreen from "./app/LoginScreen";
import SignupScreen from "./app/SignupScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { icons } from "./constants/icons";
import { images } from "./constants/images";
import MovieGridScreen from "./app/MovieGridScreen";
import CastDetailsScreen from "./app/CastDetailsScreen";
import Toast from "react-native-toast-message";
import PeopleGridScreen from "./app/PeopleGridScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, focused }) => {
          let iconSource;
          if (route.name === "Home") {
            iconSource = icons.home;
          } else if (route.name === "Saved") {
            iconSource = icons.save;
          } else if (route.name === "Search") {
            iconSource = icons.search;
          } else if (route.name === "Profile") {
            iconSource = icons.person;
          }
          const iconElement = (
            <Image
              source={iconSource}
              style={{
                width: size,
                height: size,
                tintColor: focused ? "#151312" : "#A8B5DB",
                marginTop: focused ? 0 : 10,
              }}
              resizeMode="contain"
            />
          );
          return focused ? (
            <ImageBackground
              source={images.highlight}
              className="flex flex-row w-full flex-1 min-w-[105px] min-h-14 p-4 rounded-full items-center justify-center overflow-hidden mt-3"
            >
              {iconElement}
              <Text className="text-secondary text-base font-semibold ml-2">
                {route.name}
              </Text>
            </ImageBackground>
          ) : (
            iconElement
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          height: 55,
          width: "100%",
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0D23",
        },
      })}
    >
      <Tab.Screen name="Home" component={LandingScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Get Started">
          <Stack.Screen
            name="Get Started"
            component={GetStartedScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Movie Details"
            component={MovieDetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Movie Grid Screen"
            component={MovieGridScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="People Grid Screen"
            component={PeopleGridScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cast Details Screen"
            component={CastDetailsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
      <StatusBar hidden={true} />
    </>
  );
}
export default App;
