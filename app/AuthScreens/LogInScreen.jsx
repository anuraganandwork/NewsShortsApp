import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  useColorScheme,
  ScrollView,
} from "react-native";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import React, { useEffect, useState } from "react";
import { Link, Redirect, router } from "expo-router";
import app from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from "../Constants/AppTheme";
import LottieView from "lottie-react-native";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(true);

  const [user, setUser] = useState();
  const auth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [checkPasswordValid, setPassWordValid] = useState(false);
  const colorScheme = useColorScheme();
  console.log("Mode is ", colorScheme);
  const theme = colorScheme === "dark" ? color.light : color.dark;
  // setUser State

  const setUsersState = async (user) => {
    try {
      await AsyncStorage.setItem("USERDATA", JSON.stringify(user));
    } catch (e) {
      console.log("Error in setting user state ", e);
    }
  };

  //fetchuser

  //Useeffect

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const handleLogIn = (aAuth, eEmail, pPass) => {
    setIsLoading(true);
    signInWithEmailAndPassword(aAuth, eEmail, pPass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUsersState(user);
        console.log("Logged in" + user.email);
        router.replace("../Screens/Home");
        setIsLoading(false);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  if (isLoading === true) {
    return (
      <View
        style={{
          backgroundColor: theme.SeconDaryBG,
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <LottieView
          autoPlay={true}
          style={{
            width: "100%",
            height: "40%",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../../assets/searchAnimation.json")}
        />
      </View>
    );
  }

  const handleEmailChecker = (text) => {
    const regularExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setEmail(text);
    if (regularExp.test(text)) {
      setCheckValidEmail(false);
    } else setCheckValidEmail(true);
  };

  const handlePasswordChecker = (text) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    setPassword(text);
    if (passwordRegex.test(text)) {
      setPassWordValid(false);
    } else {
      setPassWordValid(true);
    }
  };
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            marginBottom: "1%",
            justifyContent: "center",
            marginHorizontal: "10%",
            marginTop: "15%",
          }}
        >
          Welcome
        </Text>
        <Text
          style={{
            fontSize: 30,
            marginBottom: "1%",
            justifyContent: "center",
            marginHorizontal: "10%",
            marginTop: "1%",
          }}
        >
          to
        </Text>
        <Text
          style={{
            fontSize: 30,
            marginBottom: "10%",
            justifyContent: "center",
            marginHorizontal: "10%",
            marginTop: "1%",
          }}
        >
          News Shorts
        </Text>
        <Text
          style={{ fontSize: 15, marginBottom: "20%", color: theme.accent }}
        >
          Consume more in less time.
        </Text>
        <TextInput
          style={[
            styles.generalTextfieldStyle,
            { borderColor: theme.tertiary },
          ]}
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => handleEmailChecker(text)}
        />
        {checkValidEmail ? (
          <Text style={styles.cautionStyle}>Not an valid email!</Text>
        ) : (
          <Text></Text>
        )}
        <View
          style={[
            {
              flexDirection: "row",
              alignContent: "space-between",
              width: "100%",
            },
          ]}
        >
          <TextInput
            style={[
              styles.generalTextfieldStyle,
              { borderColor: theme.tertiary },
            ]}
            placeholder="Enter password"
            secureTextEntry={seePassword}
            value={password}
            onChangeText={(text) => handlePasswordChecker(text)}
          />
          {seePassword ? (
            <TouchableOpacity
              onPress={() => {
                setSeePassword(!seePassword);
              }}
            >
              <Image
                source={require("../../assets/invisible.png")}
                style={[styles.iconEye, { borderColor: theme.tertiary }]}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setSeePassword(!seePassword);
              }}
            >
              <Image
                source={require("../../assets/visible.png")}
                style={[styles.iconEye, { color: theme.tertiary }]}
              />
            </TouchableOpacity>
          )}
        </View>
        {checkPasswordValid ? (
          <Text style={styles.cautionStyle}>
            Password should contain atleast one uppercase letter, one lowercase
            letter, and one number
          </Text>
        ) : (
          <Text></Text>
        )}

        <TouchableOpacity
          onPress={() => {
            if (password.length > 1 && email.length > 1) {
              handleLogIn(auth, email, password);
            } else {
              alert("Not a valid entry!");
            }
          }}
        >
          <View style={[styles.buttonStyle, { backgroundColor: theme.accent }]}>
            <Text style={{ color: "white" }}>Log in</Text>
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text>Already a user? </Text>
          <TouchableOpacity
            onPress={() => {
              router.navigate("./SignUpScreen");
            }}
          >
            <Text style={{ color: theme.accent }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    padding: "5%",
  },
  generalTextfieldStyle: {
    width: "100%",
    borderBottomWidth: 1,
    paddingBottom: "8%",
  },
  iconEye: {
    position: "absolute",
    top: "30%",
    right: "5%",
    height: 25,
    width: 25,
    opacity: 0.5,
  },
  buttonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: "10%",
    marginBottom: "5%",
  },
  cautionStyle: {
    color: "red",
    fontSize: 12,
  },
});
