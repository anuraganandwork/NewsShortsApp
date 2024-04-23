import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  useColorScheme,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CardForHome, { NewsCardItem } from "../Components/FrontCardHome";
import FlipCard from "react-native-flip-card";
import Backcard from "../Components/Backcard";
import FetchNewHome from "../Data/ForHome";
import Savednewsblock from "../Components/Savednewsblock";
import { color } from "../Constants/AppTheme";
import SavedModal from "../Components/SavedModal";

const Home = () => {
  const [newsdata, setnewsdata] = useState([]);
  const [isModalVisiblle, setIsModalVisible] = useState(false);
  const [titleFromDatabase, setTitleFromDatabase] = useState({});
  const colorScheme = useColorScheme();
  console.log("Mode'Health is ", colorScheme);
  const theme = colorScheme === "dark" ? color.light : color.dark;
  let tempNews = [];

  const getData = async () => {
    try {
      const _savedNews = await AsyncStorage.getItem("SAVEDNEWSFORHOME");
      await setTitleFromDatabase(JSON.parse(_savedNews));
      tempNews = JSON.parse(_savedNews);
      // console.log(JSON.parse(_savedNews));
      //console.log(tempNews);
    } catch (e) {
      console.log(`${e}:saved news is null`);
    }
  };

  const delete_news = async (titleToDel) => {
    const tempData = titleFromDatabase;
    const newData = tempData.filter((item) => {
      return item.title !== titleToDel;
    });
    console.log("deleted ", titleToDel);
    //setTitleFromDatabase(newData);
    await AsyncStorage.setItem(
      "SAVEDNEWSFORHOME",
      JSON.stringify(newData)
    ).then(getData());
  };
  const read_news = (url) => {
    Linking.openURL(url);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchNewHome();
      setnewsdata(data);
    };
    fetchData();
    //getData();
  }, []);
  return (
    <View style={{ backgroundColor: theme.primary }}>
      {/* <Button
        title="On"
        onPress={() => {
          FetchNew();
        }}
      /> */}
      {/* <FlipCard>
        <View> */}

      <FlatList
        data={newsdata}
        //item hmne random diya hai
        //horizontal
        //pagingEnabled
        keyExtractor={({ item }) => item?.title || Math.random().toString()}
        renderItem={({ item }) => (
          <FlipCard flipHorizontal={true} flipVertical={false}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <CardForHome data={item} />
            </View>
            <View>
              <Backcard data={item} />
            </View>
          </FlipCard>
        )}
      />
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(true);
          getData();
        }}
        style={{ position: "absolute", bottom: "13%", right: "5%", zIndex: 1 }}
      >
        <View
          style={[
            styles.savedButtonView,
            { backgroundColor: theme.secondary, borderColor: theme.accent },
          ]}
        >
          <Text>Saved News</Text>
        </View>
      </TouchableOpacity>

      <SavedModal
        Visibility={[isModalVisiblle, setIsModalVisible]}
        myObject={titleFromDatabase}
        delete_news={delete_news}
        read_news={read_news}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  savedButtonView: {
    height: 75,
    width: 75,
    borderRadius: 50,
    elevation: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "20%",
    right: "10%",
    borderWidth: 2,
  },
});
