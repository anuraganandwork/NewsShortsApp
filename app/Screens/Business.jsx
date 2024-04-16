import {
  Button,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import FlipCard from "react-native-flip-card";
import Card, { NewsCardItem } from "../Components/Frontcard";
import Backcard from "../Components/Backcard";
import "react-native-gesture-handler";

import FetchNewBusiness from "../Data/ForBusiness";
import MyBottomSheet from "../Components/MyBottomSheet";
import MyElevatedButton from "../Components/MyElevatedButton";
import MySnackbar from "../Components/MySnackbar";
import Savednewsblock from "../Components/Savednewsblock";

const Business = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [newsdataH, setnewsdataH] = useState([]);

  const [isModalVisiblle, setIsModalVisible] = useState(false);

  const [titleFromDatabase, setTitleFromDatabase] = useState({});
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const showBottomSheet = () => {
    setIsBottomSheetVisible(true);
    //console.log("Hello Anurag");
  };
  let tempNews = [];

  const getData = async () => {
    try {
      const _savedNews = await AsyncStorage.getItem("SAVEDNEWS");
      setTitleFromDatabase(JSON.parse(_savedNews));
      tempNews = JSON.parse(_savedNews);
      // console.log(JSON.parse(_savedNews));
      //console.log(tempNews);
    } catch (e) {
      console.log(`${e}:saved news is null`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchNewBusiness();
      setnewsdataH(data);
    };
    fetchData();
    console.log(`${isBottomSheetVisible}`);
  }, []);

  //To delete the news

  const delete_news = async (titleToDel) => {
    const tempData = titleFromDatabase;
    const newData = tempData.filter((item) => {
      return item.title !== titleToDel;
    });
    console.log("deleted ", titleToDel);
    //setTitleFromDatabase(newData);
    await AsyncStorage.setItem("SAVEDNEWS", JSON.stringify(newData)).then(
      getData()
    );
  };

  //toRead

  const read_news = (url) => {
    Linking.openURL(url);
  };

  return (
    <View>
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
              <Card data={item} />
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
        style={{ position: "absolute", bottom: 20, right: 20 }}
      >
        <View style={styles.savedButtonView}>
          <View style={styles.savedButton}>
            <Text>Saved News</Text>
          </View>
        </View>
      </Pressable>

      <Modal
        visible={isModalVisiblle}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        animationType="slide"
      >
        <View
          style={{
            height: "100%",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <Text>Hello people!</Text>
            <FlatList
              data={titleFromDatabase}
              renderItem={({ item }) => {
                return (
                  <Savednewsblock
                    title={item.title}
                    url={item.url}
                    urlToImage={item.urlToImage}
                    onDelete={() => delete_news(item.title)}
                    onRead={() => read_news(item.url)}
                  />
                );
              }}
            />

            <Button
              onPress={() => {
                setIsModalVisible(false);
              }}
              title="Close"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Business;

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
