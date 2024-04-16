import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CardForHome, { NewsCardItem } from "../Components/FrontCardHome";
import FlipCard from "react-native-flip-card";
import Backcard from "../Components/Backcard";
import FetchNewHome from "../Data/ForHome";
import Savednewsblock from "../Components/Savednewsblock";

const Home = () => {
  const [newsdata, setnewsdata] = useState([]);
  const [isModalVisiblle, setIsModalVisible] = useState(false);
  const [titleFromDatabase, setTitleFromDatabase] = useState({});

  let tempNews = [];

  const getData = async () => {
    try {
      const _savedNews = await AsyncStorage.getItem("SAVEDNEWSFORHOME");
      setTitleFromDatabase(JSON.parse(_savedNews));
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
  }, []);
  return (
    <View>
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
        {/* <View
          style={{
            height: 200,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "blue",
              justifyContent: "flex-end",
            }}
          >
            <Text>Hello people!</Text>
            <Button
              onPress={() => {
                setIsModalVisible(false);
              }}
              title="Close"
            />
          </View>
        </View> */}

        <View style={{ justifyContent: "flex-end", flex: 1 }}>
          <Text>Hello people!</Text>

          <FlatList
            data={titleFromDatabase}
            renderItem={({ item }) => {
              return (
                <Savednewsblock
                  title={item.title}
                  url={item.url}
                  onDelete={() => delete_news(item.title)}
                  onRead={() => read_news(item.url)}
                  urlToImage={item.urlToImage}
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
      </Modal>
      {/* </View>
        <View>
          <Text>Helloss</Text>
        </View>
      </FlipCard> */}

      {/* <ScrollView>
        {newsdata.map(datas => (
          <Card data={datas} />
        ))}
      </ScrollView> */}
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