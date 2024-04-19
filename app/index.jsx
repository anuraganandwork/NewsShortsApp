import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import Splashscreen from "./SplashScreen/Splashscreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  //return <Redirect href="/Screens/Home" />;
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [userFromDb, setUserToDb] = useState(null);

  //fetch data
  const fetchUser = async () => {
    try {
      const fetchedData = await AsyncStorage.getItem("USERDATA");
      if (fetchedData) {
        try {
          const x = JSON.parse(fetchedData);
          setUserToDb(x);
        } catch (e) {
          console.log("Error in fetching from your data ", e);
        }
        console.log("Fetched data ", fetchedData);
        console.log("JSONN ,", JSON.parse(fetchedData));
      }
    } catch (e) {
      console.log("Error in fetching user ", e.message());
    }
  };
  useEffect(() => {
    fetchUser().then(() => {
      console.log("Fetching", JSON.stringify(userFromDb)); // Stringify the object
    });
    setTimeout(() => {
      setSplashVisible(false);
    }, 5000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isSplashVisible ? (
        <Splashscreen />
      ) : (
        <View>
          {userFromDb !== null && userFromDb !== undefined ? (
            <Redirect href={"../Screens/Home"} />
          ) : (
            <Redirect href="./AuthScreens/SignUpScreen" />
          )}
        </View>
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
