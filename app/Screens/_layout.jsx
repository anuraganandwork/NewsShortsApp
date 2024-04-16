import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
import { Tabs, router } from "expo-router";
import Myicon from "../Components/MyIcon"; // Assuming MyIcon is in the same directory
import { Ionicons } from "@expo/vector-icons";
import MyModal from "../Components/MyBottomSheet";
import "react-native-gesture-handler";
import app from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Rootlayout = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const auth = getAuth(app);
  const setUsersState = async () => {
    try {
      await AsyncStorage.setItem("USERDATA", null);
    } catch (e) {
      console.log("Error in setting user state ", e);
    }
  };
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          headerTitle: "Home",
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Myicon
              focused={focused}
              color={color}
              size={size}
              HighlightedName="home"
              Normalname="home-outline"
            />
          ),

          headerRight: () => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(true);
                }}
              >
                <Ionicons name="cart" size={34} color={"black"} />
              </TouchableOpacity>
              <Modal visible={isModalVisible} animationType="slide">
                <View>
                  <View>
                    <Text>Hello {auth.currentUser?.displayName}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setIsModalVisible(false);
                      }}
                    >
                      <Text>Go back!</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        signOut(auth)
                          .then(() => {
                            AsyncStorage.removeItem("USERDATA")
                              //setUsersState()
                              .then(() => {
                                console.log("Signed out");
                                router.replace("../AuthScreens/SignUpScreen");
                              })
                              .catch((error) => {
                                console.error(
                                  "Error removing user data:",
                                  error
                                );
                              });
                          })
                          .catch((error) => {
                            console.error("Error signing out:", error);
                          });
                      }}
                    >
                      <Text>Sign out!</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Myicon
              focused={focused}
              color={color}
              size={size}
              HighlightedName="search"
              Normalname="search-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Health"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Myicon
              focused={focused}
              color={color}
              size={size}
              HighlightedName="search"
              Normalname="search"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Tech"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Myicon
              focused={focused}
              color={color}
              size={size}
              HighlightedName="search"
              Normalname="search"
            />
          ),
        }}
      />
      ,
      <Tabs.Screen
        name="Business"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Myicon
              focused={focused}
              color={color}
              size={size}
              HighlightedName="search"
              Normalname="search"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Rootlayout;

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    minHeight: 300, // adjust the height as needed
    maxHeight: "80%", // maximum height for the modal
  },
});
