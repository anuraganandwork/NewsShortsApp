import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import React, { useEffect, useState } from "react";
import { Link, Redirect, router } from "expo-router";
import app from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(true);

  const [user, setUser] = useState();
  const auth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [checkPasswordValid, setPassWordValid] = useState(false);
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
    <View>
      <Text>Welcome to NewsShorts</Text>
      <Text>Consume more in less time</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Enter email"
        value={email}
        onChangeText={(text) => handleEmailChecker(text)}
      />
      {checkValidEmail ? <Text>Not an valid email!</Text> : <Text></Text>}

      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
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
            style={{ height: 25, width: 25 }}
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
            style={{ height: 25, width: 25 }}
          />
        </TouchableOpacity>
      )}
      {checkPasswordValid ? (
        <Text>
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
        <View style={{ backgroundColor: "black", padding: 10 }}>
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
          <Text style={{ color: "blue" }}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({});
