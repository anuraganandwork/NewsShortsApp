import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const MyElevatedButton = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={{ position: "absolute", bottom: 20, right: 20 }}
    >
      <View style={styles.savedButtonView}>
        <View style={styles.savedButton}>
          <Text>Saved News</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default MyElevatedButton;

const styles = StyleSheet.create({
  savedButtonView: {
    height: 75,
    width: 75,
    borderRadius: 50,
    elevation: 20,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  savedButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
