import { Snackbar } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MySnackbar = ({ visible }) => {
  return (
    <Snackbar visible={visible} duration={2000}>
      News saved!
    </Snackbar>
  );
};

export default MySnackbar;

const styles = StyleSheet.create({});
