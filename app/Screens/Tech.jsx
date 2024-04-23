import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import FlipCard from "react-native-flip-card";
import Backcard from "../Components/Backcard";
import "react-native-gesture-handler";
import FetchNewtech from "../Data/ForTech";
import MyBottomSheet from "../Components/MyBottomSheet";
import Savednewsblock from "../Components/Savednewsblock";
import CardForTech from "../Components/FrontCardTech";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from "../Constants/AppTheme";
import SavedModal from "../Components/SavedModal";

const Tech = () => {
  const [newsdataH, setnewsdataH] = useState([]);
  const [isModalVisiblle, setIsModalVisible] = useState(false);
  const [titleFromDatabase, setTitleFromDatabase] = useState({});
  const colorScheme = useColorScheme();
  console.log("Mode'Health is ", colorScheme);
  const theme = colorScheme === "dark" ? color.light : color.dark;
  let tempNews = [];

  const getData = async () => {
    try {
      const _savedNews = await AsyncStorage.getItem("SAVEDNEWSFORTECH");
      setTitleFromDatabase(JSON.parse(_savedNews));
      tempNews = JSON.parse(_savedNews);
      // console.log(JSON.parse(_savedNews));
      //console.log(tempNews);
    } catch (e) {
      console.log(`${e}:saved news is null`);
    }
  };

  //To delete the news

  const delete_news = async (titleToDel) => {
    const tempData = titleFromDatabase;
    const newData = tempData.filter((item) => {
      return item.title !== titleToDel;
    });
    console.log("deleted ", titleToDel);
    //setTitleFromDatabase(newData);
    await AsyncStorage.setItem(
      "SAVEDNEWSFORTECH",
      JSON.stringify(newData)
    ).then(getData());
  };

  //toRead

  const read_news = (url) => {
    Linking.openURL(url);
  };

  const handleVoice = (tosay) => {
    Tts.speak(tosay);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchNewtech();
      setnewsdataH(data);
    };
    fetchData();
  }, []);

  return (
    <View style={{ backgroundColor: theme.primary }}>
      {/* <Button
        title="On"
        onPress={() => {
          FetchNew();
        }}
      /> */}
      {/* <ScrollView>
        {newsdataH.map(datas => (
          <Card data={datas} />
        ))}
      </ScrollView> */}
      {/* <TouchableHighlight
        style={{padding: 20}}
        onPress={() => handleVoice('HEllo Hello Hello')}>
        <Text>Hello</Text>
      </TouchableHighlight> */}

      <FlatList
        data={newsdataH}
        //item hmne random diya hai
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
              <CardForTech data={item} />
            </View>
            <View>
              <Backcard data={item} />
            </View>
          </FlipCard>
        )}
        keyExtractor={({ item }) => item?.title || Math.random().toString()}
      />
      <Pressable
        onPress={() => {
          setIsModalVisible(true);
          getData();
        }}
        style={{ position: "absolute", bottom: "13%", right: "5%" }}
      >
        <View
          style={[
            styles.savedButtonView,
            { backgroundColor: theme.secondary, borderColor: theme.accent },
          ]}
        >
          <Text>Saved News</Text>
        </View>
      </Pressable>

      <SavedModal
        Visibility={[isModalVisiblle, setIsModalVisible]}
        myObject={titleFromDatabase}
      />
    </View>
  );
};

export default Tech;

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
