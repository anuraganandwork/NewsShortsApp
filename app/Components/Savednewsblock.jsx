import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Savednewsblock = ({ title, url, onDelete, onRead, urlToImage }) => {
  return (
    <View style={styles.cardStyle}>
      <View style={{ justifyContent: "flex-end" }}>
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
          <Pressable
            onPress={() => {
              onRead();
            }}
            style={styles.buttonStyle}
          >
            <Text style={{ color: "white" }}>Read</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              onDelete();
            }}
            style={styles.buttonStyleSecondary}
          >
            <Text>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Savednewsblock;

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: "#C0C0C0",
    //paddingHorizontal: 15,
    //paddingTop: 15,
    //paddingBottom: 10,
    margin: 10,
    borderRadius: 10,
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
