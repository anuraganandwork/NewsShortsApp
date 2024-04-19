import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
  useColorScheme,
  Image,
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
import { color } from "../Constants/AppTheme";
import { BlurView } from "expo-blur";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Rootlayout = () => {
  const colorScheme = useColorScheme();
  console.log("Mode'Health is ", colorScheme);
  const theme = colorScheme === "dark" ? color.light : color.dark;
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
          tabBarStyle: {
            height: "8%",
            backgroundColor: theme.accent,
            position: "absolute",
            borderRadius: 50,
            marginBottom: 10,
            marginHorizontal: 5,
            elevation: 5,
          },
          tabBarActiveTintColor: "#111827",
          tabBarInactiveTintColor: theme.tertiary,
          headerStyle: {
            backgroundColor: theme.SeconDaryBG,
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 7,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Myicon
              focused={focused}
              color={color}
              size={size}
              HighlightedName="home"
              Normalname="home-outline"
            />
          ),
          // tabBarBackground: () => (
          //   // <BlurView
          //   //   style={{ backgroundColor: theme.primary }}
          //   //   tint="#228B22"
          //   //   intensity={1000}
          //   // />
          // ),

          headerRight: () => (
            <View style={{}}>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(true);
                }}
              >
                <Image
                  source={require("../../assets/logout.png")}
                  style={{
                    height: 30,
                    width: 30,
                    marginRight: "5%",
                    marginBottom: "2%",
                  }}
                />
              </TouchableOpacity>
              <Modal visible={isModalVisible} animationType="slide">
                <View
                  style={[
                    styles.modalContainer,
                    { backgroundColor: theme.primary, padding: 15 },
                  ]}
                >
                  <View>
                    <View style={{ position: "absolute" }}>
                      <Text style={{ fontSize: 24 }}>
                        Hello {auth.currentUser?.displayName}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: "100%",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <Text>Do you want to log out?</Text>
                      </View>
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
                        style={{
                          padding: 12,
                          backgroundColor: theme.accent,
                          borderRadius: 40,
                          marginTop: "3%",
                        }}
                      >
                        <Text>Log out!</Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        position: "absolute",
                        bottom: "10%",
                        right: "37%",
                        borderRadius: 40,
                        borderColor: theme.accent,
                        //backgroundColor: theme.SeconDaryBG,
                        borderWidth: 1.5,
                        padding: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setIsModalVisible(false);
                        }}
                      >
                        <Text>Go back!</Text>
                      </TouchableOpacity>
                    </View>
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
          headerStyle: {
            backgroundColor: theme.primary,
            height: 70,
          },
          headerTitleContainerStyle: {
            borderBottomRightRadius: 20,
          },
          headerTitleStyle: {
            whiteSpace: "nowrap",
          },
          tabBarStyle: {
            height: "8%",
            backgroundColor: theme.accent,
            position: "absolute",
            borderRadius: 50,
            marginBottom: 10,
            marginHorizontal: 5,
          },
          // tabBarBackground: () => (
          //   <BlurView
          //     style={{ backgroundColor: theme.primary }}
          //     tint="light"
          //     intensity={500}
          //   />
          // ),
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: theme.tertiary,
          tabBarIconStyle: {
            marginTop: 7, // Adjust the icon's position within the tab
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 7,
          },
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
        name="Health"
        options={{
          headerStyle: {
            backgroundColor: theme.SeconDaryBG,
            height: 70,
          },
          headerTitleContainerStyle: {
            borderBottomRightRadius: 20,
          },
          headerTitleStyle: {
            whiteSpace: "nowrap",
          },
          tabBarStyle: {
            height: "8%",
            backgroundColor: theme.accent,
            position: "absolute",
            borderRadius: 50,
            marginBottom: 10,
            marginHorizontal: 5,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: theme.tertiary,
          tabBarIconStyle: {
            marginTop: 7, // Adjust the icon's position within the tab
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 7,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Myicon
              focused={focused}
              color={color}
              size={size}
              HighlightedName="pulse"
              Normalname="pulse-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Tech"
        options={{
          headerStyle: {
            backgroundColor: theme.SeconDaryBG,
            height: 70,
          },
          headerTitleContainerStyle: {
            borderBottomRightRadius: 20,
          },
          headerTitleStyle: {
            whiteSpace: "nowrap",
          },
          tabBarStyle: {
            height: "8%",
            backgroundColor: theme.accent,
            position: "absolute",
            borderRadius: 50,
            marginBottom: 10,
            marginHorizontal: 5,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: theme.tertiary,

          tabBarIconStyle: {
            marginTop: 7, // Adjust the icon's position within the tab
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 7,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Myicon
              focused={focused}
              color={color}
              size={size}
              HighlightedName="code"
              Normalname="code-outline"
            />
          ),
        }}
      />
      ,
      <Tabs.Screen
        name="Business"
        options={{
          headerStyle: {
            backgroundColor: theme.SeconDaryBG,
            height: 70,
          },
          headerTitleContainerStyle: {
            borderBottomRightRadius: 20,
          },
          headerTitleStyle: {
            whiteSpace: "nowrap",
          },
          tabBarStyle: {
            height: "8%",
            backgroundColor: theme.accent,
            position: "absolute",
            borderRadius: 50,
            marginBottom: 10,
            marginHorizontal: 5,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: theme.SeconDaryBG,

          tabBarIconStyle: {
            marginTop: 7, // Adjust the icon's position within the tab
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 7,
          },
          // tabBarOptions: {
          //   tabBarActiveTintColor: "#111827",
          // },

          tabBarIcon: ({ focused, color, size }) => (
            <Myicon
              focused={focused}
              color={color}
              size={size}
              HighlightedName="business"
              Normalname="business-outline"
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
    flex: 1,
    height: "100%",
    width: "100%",
    paddingTop: "10%",
    // semi-transparent background
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
