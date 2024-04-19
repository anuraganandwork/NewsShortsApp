import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { color } from "../Constants/AppTheme";

const Splashscreen = () => {
  const [userFromDb, setUserToDb] = useState();
  const colorScheme = useColorScheme();
  console.log("Mode is ", colorScheme);
  const theme = colorScheme === "dark" ? color.light : color.dark;
  //fetch data
  const fetchUser = async () => {
    try {
      const fetchedData = AsyncStorage.getItem("USERDATA");
      if (fetchedData) {
        setUserToDb(JSON.parse(fetchedData));
      }
    } catch (e) {
      console.log("Error in fetching user ", e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay={true}
        style={{
          width: 300,
          height: 300,
          backgroundColor: "#ffffff",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("./second.json")}
      />
      <Text style={{ fontWeight: "bold", fontSize: 22, color: theme.accent }}>
        News Shorts
      </Text>
    </View>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
