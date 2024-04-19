import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Image,
  useColorScheme,
} from "react-native";

import React, { useEffect, useState } from "react";
import { Link, Redirect, router } from "expo-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  initializeAuth,
  updateProfile,
  //getReactNativePersistence,
} from "firebase/auth";
import app from "../../firebase";
import Home from "../Screens/Home";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import isEmailValid from "../Components/EmailChecker";
import { color } from "../Constants/AppTheme";
import("../Components/EmailChecker").TypeOfEmail;
//import { useNavigation } from "@react-navigation/native";
//rimport ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nameOfUser, setNameOfUser] = useState("");
  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [checkPasswordValid, setPassWordValid] = useState(false);
  const [isUserNameValid, setIsUsernameValid] = useState(false);
  const auth = getAuth(app);
  const navigation = useNavigation();

  //set userr
  const colorScheme = useColorScheme();
  console.log("Mode is ", colorScheme);
  const theme = colorScheme === "dark" ? color.light : color.dark;
  const setUsersState = async (user) => {
    try {
      await AsyncStorage.setItem("USERDATA", JSON.stringify(user));
    } catch (e) {
      console.log("Error in setting user state ", e);
    }
  };

  useEffect(() => {}, []);

  const handleSignIn = async (aAuth, eEmail, pPass, userName) => {
    setIsLoading(true);
    const userCredential = await createUserWithEmailAndPassword(
      aAuth,
      eEmail,
      pPass
    );
    // Signed up
    const user = userCredential.user;

    await updateProfile(user, { displayName: userName });

    await setUsersState(user);
    console.log(user.email);
    // ...

    //router.navigate("./Authenticated");
    router.replace("../Screens/Home");
    //return <Redirect href={"/Screens/Home"} />;
    setIsLoading(false);
  };
  if (isLoading) {
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

  const handleUserName = (text) => {
    const regex = /^[a-zA-Z0-9_]+$/;
    setNameOfUser(text);
    if (regex.test(text)) {
      setIsUsernameValid(false);
    } else {
      setIsUsernameValid(true);
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <Text style={{ fontSize: 30, marginBottom: "10%" }}>
        Welcome to NewsShorts
      </Text>
      <Text style={{ fontSize: 15, marginBottom: "10%", color: theme.accent }}>
        Consume more in less time.
      </Text>

      <TextInput
        style={[styles.generalTextfieldStyle, { borderColor: theme.tertiary }]}
        placeholder="Enter your name"
        value={nameOfUser}
        onChangeText={(text) => handleUserName(text)}
      />
      {isUserNameValid ? (
        <Text style={styles.cautionStyle}>Not a valid user name!</Text>
      ) : (
        <Text></Text>
      )}
      <TextInput
        style={[styles.generalTextfieldStyle, { borderColor: theme.tertiary }]}
        placeholder="Enter email"
        value={email}
        onChangeText={(text) => {
          // setEmail(text);
          handleEmailChecker(text);
        }}
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
              style={styles.iconEye}
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
              style={styles.iconEye}
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
          handleSignIn(auth, email, password, nameOfUser);
        }}
      >
        <View style={[styles.buttonStyle, { backgroundColor: theme.accent }]}>
          <Text style={{ color: "white" }}>Sign up</Text>
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", padding: 10 }}>
        <Text>Already a user? </Text>
        <TouchableOpacity
          onPress={() => {
            router.navigate("./LogInScreen");
          }}
        >
          <Text style={{ color: theme.accent }}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
    top: "40   %",
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
