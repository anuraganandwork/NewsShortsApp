import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Splashscreen = () => {
  const [userFromDb, setUserToDb] = useState();

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
      <View style={styles.Smallcontainer}>
        <ActivityIndicator size="large" color="white" />

        <Text style={{ color: "white" }}>Splashscreen</Text>
      </View>
    </View>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  Smallcontainer: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
