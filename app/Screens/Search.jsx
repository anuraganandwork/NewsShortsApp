import {
  Button,
  FlatList,
  Keyboard,
  LogBox,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FlipCard from "react-native-flip-card";
import CardForSearch, { NewsCardItem } from "../Components/FrontCardSearch";
import Backcard from "../Components/Backcard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Savednewsblock from "../Components/Savednewsblock";
const Search = () => {
  const [searched, setSearched] = useState("");
  const [NewsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisiblle, setIsModalVisible] = useState(false);
  const [titleFromDatabase, setTitleFromDatabase] = useState({});

  const fetchSearchedNews = async (searchedTopic) => {
    const response = await axios({
      method: "GET",
      url: `https://newsapi.org/v2/everything?q=${searchedTopic}&apiKey=c4d0e1a6021549cc927dfdd126384be5
      `,
    });
    //console.log(response.data);
    return response.data.articles;
  };

  const setData = async (searchTopic) => {
    const result = await fetchSearchedNews(searchTopic);
    console.log("from stData", result[0]);
    //setNewsData([]);
    setNewsData(result);
    console.log("Newsdata is ", NewsData);
    if (result.length > 1) {
      setIsLoading(false);
    }
  };
  let tempNews = [];

  const getData = async () => {
    try {
      const _savedNews = await AsyncStorage.getItem("SAVEDNEWSFORSEARCH");
      setTitleFromDatabase(JSON.parse(_savedNews));
      tempNews = JSON.parse(_savedNews);
      console.log("XXXX" + JSON.parse(_savedNews));
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
      "SAVEDNEWSFORSEARCH",
      JSON.stringify(newData)
    ).then(getData());
  };

  //toRead

  const read_news = (url) => {
    Linking.openURL(url);
  };

  useEffect(() => {
    console.log(`NewsDta ${NewsData}`);
    setNewsData([]);
    return () => {
      console.log(`NewsDtaaaa ${NewsData[0]}`);
      //setNewsData([]);
      // setNewsData('');
    };
    //setSearched('');
  }, []);

  const _renderItem = ({ item }) => {
    return (
      <FlipCard flipHorizontal={true} flipVertical={false}>
        <View>
          <CardForSearch data={item} />
        </View>
        <View>
          <Backcard data={item} />
        </View>
      </FlipCard>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{}}>
        <TextInput
          style={styles.input}
          placeholder={"Search topic"}
          onChangeText={setSearched}
          value={searched}
          multiline={false}
          onSubmitEditing={() => {
            setIsLoading(true);
            Keyboard.dismiss;
            console.log(searched);
            //fetchSearchedNews(searched);
            setData(searched);
            console.log(`Hello ${NewsData[0]}`);

            setSearched("");
          }}
          // onEndEditing={fetchSearchedNews}
        />
      </View>
      {/* <Button
        title="ClickHere"
        onPress={() => {
          setIsLoading(true);

          console.log(searched);
          //fetchSearchedNews(searched);
          setData(searched);
          console.log(`Hello ${NewsData[0]}`);

          setSearched('');
        }}
      /> */}
      {NewsData.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList data={NewsData} renderItem={_renderItem} />
          <View>
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
          </View>
        </View>
      ) : (
        <View></View>
      )}

      {isLoading ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : (
        <View></View>
      )}
      <View>
        <Pressable
          onPress={() => {
            setIsModalVisible(true);
            getData();
          }}
          style={{ position: "absolute", top: 405, right: 20 }}
        >
          <View style={styles.savedButtonView}>
            <View style={styles.savedButton}>
              <Text>Saved News</Text>
            </View>
          </View>
        </Pressable>
      </View>
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
                <View>
                  <Savednewsblock
                    title={item.title}
                    url={item.url}
                    onDelete={() => delete_news(item.title)}
                    onRead={() => read_news(item.url)}
                    urlToImage={item.urlToImage}
                  />
                </View>
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
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 8,
    margin: 10,
    marginTop: 25,
    padding: 10,
  },
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
    bottom: 10,
    right: 20,
  },
});