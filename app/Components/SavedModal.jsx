import {
  StyleSheet,
  Text,
  View,
  Modal,
  useColorScheme,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { color } from "../Constants/AppTheme";
import Savednewsblock from "./Savednewsblock";

const SavedModal = ({ Visibility, myObject, delete_news, read_news }) => {
  const [visible, setVisible] = Visibility;
  const colorScheme = useColorScheme();
  console.log("Mode'Health is ", colorScheme);
  const theme = colorScheme === "dark" ? color.light : color.dark;
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        // setIsModalVisible(false);
        setVisible(false);
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

      <View
        style={{
          justifyContent: "flex-end",
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
              //setIsModalVisible(false);
              setVisible(false);
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
          data={myObject}
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
      </View>
    </Modal>
  );
};

export default SavedModal;

const styles = StyleSheet.create({});
