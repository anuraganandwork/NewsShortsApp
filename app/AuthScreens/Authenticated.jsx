import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const Authenticated = () => {
  return <Redirect href="../Screens/Home" />;
  //return <Text>Auth</Text>;
};

export default Authenticated;

const styles = StyleSheet.create({});


{/* <Modal
        visible={isModalVisiblle}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        animationType="slide"
      >
        

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
                  onDelete={() => delete_news(item.title)}
                  onRead={() => read_news(item.url)}
                  urlToImage={item.urlToImage}
                />
              );
            }}
          />
        </View>
      </Modal> */}