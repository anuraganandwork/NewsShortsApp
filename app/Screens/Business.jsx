import {
  Button,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Linking,
  useColorScheme,
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
import { color } from "../Constants/AppTheme";

const Business = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [newsdataH, setnewsdataH] = useState([]);

  const [isModalVisiblle, setIsModalVisible] = useState(false);

  const [titleFromDatabase, setTitleFromDatabase] = useState({});
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? color.light : color.dark;
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
    <View style={{ backgroundColor: theme.primary }}>
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
              backgroundColor: theme.primary,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: "3%",
              }}
            >
              <Text
                style={{
                  marginTop: "5%",
                  fontSize: 25,
                  fontWeight: 500,
                  marginBottom: "2%",
                  marginLeft: "2%",
                }}
              >
                Saved news
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                }}
              >
                <View
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 12,
                    backgroundColor: theme.primary,
                    borderColor: theme.accent,
                    borderWidth: 1,
                    elevation: 10,
                    borderRadius: 50,
                    marginTop: "5%",
                  }}
                >
                  <Text>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
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
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "50%",
    right: "10%",
    borderWidth: 2,
  },
  savedButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
