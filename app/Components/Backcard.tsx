import {
  Button,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from "../Constants/AppTheme";

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
  const colorScheme = useColorScheme();
  console.log("Mode is ", colorScheme);
  const theme = colorScheme === "dark" ? color.light : color.dark;
  return (
    <View style={{ padding: 10 }}>
      <View style={[styles.cardStyle, { backgroundColor: theme.SeconDaryBG }]}>
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={{ fontSize: 18, color: "black" }}>{description}</Text>
          <Text style={{ fontSize: 15, color: "black", paddingTop: 25 }}>
            Source : {source.name}
          </Text>
        </View>
        <View style={{ padding: 25 }}></View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(url);
          }}
        >
          <View
            style={[styles.DetailButton, { backgroundColor: theme.accent }]}
          >
            <Text>Read in detail</Text>
          </View>
        </TouchableOpacity>
        {/* <Button
          title="Clear it "
          onPress={() => {
            clearAll();
          }}
        /> */}
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
    borderRadius: 15,
    shadowOpacity: 0.3,
  },
  DetailButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
});
