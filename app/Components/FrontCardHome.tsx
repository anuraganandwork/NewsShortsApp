import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { shareNews } from "./SharingFeature";

import AsyncStorage from "@react-native-async-storage/async-storage";
import MySnackbar from "./MySnackbar";
import { Button } from "react-native-paper";
import * as Speech from "expo-speech";
import { color } from "../Constants/AppTheme";

export interface NewsCardItem {
  title: string;
  publishedAt: string;
  description: string;
  urlToImage: string;
  content: string;
  url: string;
}
export interface cardComponent {
  data: NewsCardItem;
}

// const getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem("Title");
//     if (value !== null) {
//       console.log(`${value}`);
//     }
//   } catch (e) {
//     // error reading value
//   }
// };
let settingSaveData: any = [];

const CardForHome: React.FC<cardComponent> = (props) => {
  const [savedIcon, setSavedIcon] = useState(true);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const colorScheme = useColorScheme();
  const regex = /<[^>]*>|\[[^\]]*\]/g;
  console.log("Mode'Health is ", colorScheme);
  const theme = colorScheme === "dark" ? color.light : color.dark;
  //again opening the data from network
  const _storeData = async (title: string, url: string, urlToImage: string) => {
    let tempNews = [];
    settingSaveData = [];

    try {
      let x = await AsyncStorage.getItem("SAVEDNEWSFORHOME");
      if (x !== null) {
        tempNews = JSON.parse(x);
      }
      // if (tempNews !== null) {
      //   tempNews.map((item: any) => {
      //     settingSaveData.push(item);
      //     console.log("b4" + settingSaveData.length());
      //   });
      // }
      settingSaveData = tempNews;

      settingSaveData.push({ title: title, url: url, urlToImage: urlToImage });
      // await AsyncStorage.setItem("Title", `${title}`);
      // await AsyncStorage.setItem("Link", `${url}`);

      await AsyncStorage.setItem(
        "SAVEDNEWSFORHOME",
        JSON.stringify(settingSaveData)
      );
      //console.log(`saved ${title}`);
    } catch (error) {
      // Error saving data
    }
  };

  const { title, urlToImage, publishedAt, content, url } = props.data;
  if (!(title && urlToImage && publishedAt && content)) {
    return null;
  }

  return (
    <View style={styles.cardStyle}>
      <View
        style={[styles.imageAndText, { backgroundColor: theme.SeconDaryBG }]}
      >
        <Image style={styles.imageStyle} source={{ uri: urlToImage }} />
        <Text
          style={{
            fontSize: 18,
            color: "black",
            paddingTop: 15,
            paddingHorizontal: 10,
          }}
          numberOfLines={6}
        >
          {content.replace(regex, "")}
        </Text>

        <View style={styles.dateANDTime}>
          <Text
            style={{
              paddingStart: 10,
              paddingTop: 10,
              color: "#D3D3D3	",
              fontSize: 12,
            }}
          >
            {publishedAt.substring(11, 16)}
          </Text>
          <Text
            style={{
              paddingStart: 10,
              paddingTop: 10,
              fontSize: 12,
            }}
          >
            {publishedAt.substring(0, 10)}
          </Text>
        </View>
        <View style={[styles.saveIcon, { backgroundColor: theme.accent }]}>
          <TouchableOpacity
            onPress={() => {
              _storeData(`${title}`, `${url}`, `${urlToImage}`);
              setSavedIcon(false);
              setIsSnackbarVisible(true);
            }}
          >
            {savedIcon ? (
              <Image
                source={require("../../assets/save-instagram.png")}
                style={{ height: 25, width: 25, padding: 15 }}
              />
            ) : (
              <Image
                source={require("../../assets/bookmark.png")}
                style={{ height: 25, width: 25, padding: 15 }}
              />
            )}
          </TouchableOpacity>
          <View>
            {isSpeaking ? (
              <TouchableOpacity
                onPress={() => {
                  console.log("Volume clicked");
                  setIsSpeaking(false);

                  Speech.stop();
                }}
              >
                <Image
                  source={require("../../assets/volume.png")}
                  style={{ height: 25, width: 25, padding: 15 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setIsSpeaking(true);
                  Speech.speak(content.replace(regex, ""));
                }}
              >
                <Image
                  source={require("../../assets/mute.png")}
                  style={{ height: 25, width: 25, padding: 15 }}
                />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              shareNews(`${title}`, `${url}`);
            }}
          >
            <Image
              source={require("../../assets/share.png")}
              style={{ height: 25, width: 25, padding: 15 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingTop: 20 }}></View>
    </View>
  );
};

export default CardForHome;

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardStyle: {
    // elevation: 5,
    width: "100%",
    //flex: 1,
    height: 500,
    paddingHorizontal: 10,
    borderColor: "black",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "center",
    marginTop: "5%",
  },
  imageAndText: {
    width: "100%",
    flex: 1,
    height: "100%",
    elevation: 25,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 15,
    shadowOpacity: 0.3,
    backgroundColor: "#C4F0B9",
    borderColor: "black",
  },
  dateANDTime: {
    flexDirection: "row",
  },

  saveIcon: {
    position: "absolute",
    right: "0%",
    bottom: "0%",
    flexDirection: "row",
    padding: "8%",
    width: "45%",
    borderBottomEndRadius: 15,
    borderTopStartRadius: 15,
    alignContent: "space-between",
    justifyContent: "space-between",
  },
  pressebleStlye: {},
});
