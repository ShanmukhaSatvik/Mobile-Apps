import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { icons } from "../constants/icons";
function SearchBar({
  onPress,
  placeholder,
  value,
  onChangeText,
  onClear,
  showClearButton = true,
}) {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#ab8bff"}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={"#a8b5db"}
        className="flex-1 ml-2 text-white"
      />
      {showClearButton && value?.length > 0 && (
        <TouchableOpacity
          onPress={onClear}
          style={{ position: "absolute", right: 20 }}
        >
          <Ionicons name="close-circle" size={34} color="#a8b5db" />
        </TouchableOpacity>
      )}
    </View>
  );
}
export default SearchBar;
