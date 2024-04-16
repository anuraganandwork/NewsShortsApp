import { StyleSheet, Text, View, Animated, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";

const MyBottomSheet = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const slideIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 300,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slideOut();
  }, []);

  const closeModal = () => {
    slideOut();
    setStatus(false);
  };
  return (
    <View>
      <Pressable
        onPress={closeModal}
        style={[
          styles.bottomsheetBackground,
          //{ transform: [{ translateY: fadeAnim }] },
        ]}
      >
        <Animated.View style={styles.bottomsheetForeground}>
          <Text>Hello welcome</Text>
          <Text>to</Text>
          <Text>animated bottom sheet</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default MyBottomSheet;

const styles = StyleSheet.create({
  bottomsheetBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
  },
  bottomsheetForeground: {
    backgroundColor: "white",
    height: "40%",
    width: "100%",
  },
});
