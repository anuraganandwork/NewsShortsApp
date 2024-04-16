import { Button, Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface backSide {
  description: string;
  url: string;
  source: {
    id: string;
    name: string;
  };
}

interface backSideDataCombined {
  data: backSide;
}
const clearAll = async () => {
  try {
    await AsyncStorage.removeItem("SAVEDNEWS");
    await AsyncStorage.removeItem("SAVEDNEWSFORTECH");
  } catch (e) {
    console.log("Error in is " + e);
  }
  console.log("Done and cleared");
};
const Backcard: React.FC<backSideDataCombined> = (props) => {
  const { description, url, source } = props.data;

  return (
    <View style={{ padding: 10 }}>
      <View style={styles.cardStyle}>
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={{ fontSize: 18, color: "black" }}>{description}</Text>
          <Text style={{ fontSize: 15, color: "black", paddingTop: 25 }}>
            Source : {source.name}
          </Text>
        </View>
        <View style={{ padding: 25 }}></View>
        <Button
          title="Read in detail"
          onPress={() => {
            Linking.openURL(url);
          }}
        />
        <Button
          title="Clear it "
          onPress={() => {
            clearAll();
          }}
        />
      </View>
    </View>
  );
};

export default Backcard;

const styles = StyleSheet.create({
  cardStyle: {
    // elevation: 5,
    width: "100%",
    flex: 1,
    paddingHorizontal: 10,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    height: 550,
    elevation: 25,
    backgroundColor: "#C4F0B9",
    borderRadius: 15,
    shadowOpacity: 0.3,
  },
});
