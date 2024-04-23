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
  TouchableOpacity,
  Modal,
  Linking,
  useColorScheme,
} from "react-native";

import React, { useEffect, useState } from "react";
import axios from "axios";
import FlipCard from "react-native-flip-card";
import CardForSearch, { NewsCardItem } from "../Components/FrontCardSearch";
import Backcard from "../Components/Backcard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Savednewsblock from "../Components/Savednewsblock";
import { color } from "../Constants/AppTheme";
import LottieView from "lottie-react-native";
import { searchKey, searchUrl } from "../../apiKeys";
import SavedModal from "../Components/SavedModal";

const Search = () => {
  const [searched, setSearched] = useState("");
  const [NewsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisiblle, setIsModalVisible] = useState(false);
  const [titleFromDatabase, setTitleFromDatabase] = useState({});
  const colorScheme = useColorScheme();
  console.log("Mode is ", colorScheme);
  const theme = colorScheme === "dark" ? color.light : color.dark;
  const fetchSearchedNews = async (searchedTopic) => {
    const response = await axios({
      method: "GET",
      url: `${searchUrl}q=${searchedTopic}&apiKey=${searchKey}`,
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
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <View style={{}}>
        <TextInput
          style={[styles.input, { borderColor: theme.accent }]}
          placeholder={"Search topic"}
          onChangeText={setSearched}
          value={searched}
          multiline={false}
          onSubmitEditing={() => {
            setNewsData([]);
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
          {/* <View>
            <Pressable
              onPress={() => {
                setIsModalVisible(true);
                getData();
              }}
              style={{ position: "absolute", bottom: "2%", right: "5%" }}
            >
              <View
                style={[
                  styles.savedButtonView,
                  {
                    backgroundColor: theme.secondary,
                    borderColor: theme.accent,
                  },
                ]}
              >
                <Text>Saved News</Text>
              </View>
            </Pressable>
          </View> */}
        </View>
      ) : (
        <View></View>
      )}

      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieView
            autoPlay={true}
            speed={1}
            style={{
              width: "100%",
              height: "20%",
              padding: 20,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require("../../assets/loadingAnimation.json")}
          />
        </View>
      ) : (
        <View></View>
      )}
      <View style={{ position: "absolute", bottom: "13%", right: "5%" }}>
        <Pressable
          onPress={() => {
            setIsModalVisible(true);
            getData();
          }}
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
      </View>

      <SavedModal
        Visibility={[isModalVisiblle, setIsModalVisible]}
        myObject={titleFromDatabase}
        delete_news={delete_news}
        read_news={read_news}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
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
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
  },
});
