import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
  useColorScheme,
} from "react-native";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import React, { useEffect, useState } from "react";
import { Link, Redirect, router } from "expo-router";
import app from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from "../Constants/AppTheme";

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
      <View style={{ backgroundColor: "white" }}>
        <ActivityIndicator size="large" color="black" />
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
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <Text style={{ fontSize: 30, marginBottom: "10%" }}>
        Welcome to NewsShorts
      </Text>
      <Text style={{ fontSize: 15, marginBottom: "20%", color: theme.accent }}>
        Consume more in less time.
      </Text>
      <TextInput
        style={[styles.generalTextfieldStyle, { borderColor: theme.tertiary }]}
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
          handleLogIn(auth, email, password);
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
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
