import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const Authenticated = () => {
  return <Redirect href="../Screens/Home" />;
  //return <Text>Auth</Text>;
};

export default Authenticated;

const styles = StyleSheet.create({});
