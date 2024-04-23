import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { color } from "../Constants/AppTheme";

const Savednewsblock = ({ title, url, onDelete, onRead, urlToImage }) => {
  const colorScheme = useColorScheme();
  console.log("Mode is ", colorScheme);
  const theme = colorScheme === "dark" ? color.light : color.dark;
  // setUser State
  return (
    <View style={[styles.cardStyle]}>
      <View
        style={{
          justifyContent: "flex-end",
          backgroundColor: theme.SeconDaryBG,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: 120,
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 1,
          }}
        >
          <View style={{ height: 100, justifyContent: "center" }}>
            <Image
              style={{
                height: "100%",
                width: 100,
                borderRadius: 10,
                // paddingLeft: 10,
                marginLeft: 10,
                //marginVertical: 25,
                resizeMode: "cover",
              }}
              source={{ uri: urlToImage }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 15,
              flexShrink: 1,
            }}
          >
            <Text numberOfLines={3}>{title}</Text>
          </View>
        </View>
        <View style={styles.buttonrow}>
          <TouchableOpacity
            onPress={() => {
              onRead();
            }}
            style={[styles.buttonStyle, { backgroundColor: theme.accent }]}
          >
            <Text style={{ color: "white" }}>Read</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onDelete();
            }}
            style={[styles.buttonStyleSecondary, { borderColor: theme.accent }]}
          >
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Savednewsblock;

const styles = StyleSheet.create({
  cardStyle: {
    //paddingHorizontal: 15,
    //paddingTop: 15,
    //paddingBottom: 10,
    margin: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 12,
  },
  buttonrow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
    marginRight: 10,
  },

  buttonStyle: {
    backgroundColor: "black",
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  buttonStyleSecondary: {
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 5,
  },
});
