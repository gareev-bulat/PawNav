import React, { useState } from "react";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { auth, db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';


const RollInfoPages = ({ navigation }) => {
  const [] = useFonts({
    CustomFont: require("../../assets/fonts/Roboto_Condensed-Bold.ttf"),
  });
  const back_image = require("../../assets/images/landing_page.png");

  const ShelterSignUp = async () => {
    
    
    try {
      const uid = auth.currentUser.uid;
      await setDoc(
        doc(db, "users", uid),
        {
          registrationStatus: "Finish registration"

        },
        { merge: true }
      );
      navigation.navigate("QuizTemp")
    } catch (error) {
      Alert.alert("Error. Please try again.");
    }
  };

  return (
    <View style={styles.main_container}>
      <ImageBackground source={back_image} style={styles.background_image}>
        <Text style={styles.main_text}>Let's get started</Text>

        <TouchableOpacity style={styles.button} onPress={ShelterSignUp}>
          <AntDesign size="45" name="arrowright" color="white" />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    width: "100%",
  },

  button: {
    width: 100,
    height: 70,
    borderRadius: 30,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },

  main_text: {
    fontFamily: "CustomFont",
    fontSize: 36,
    marginBottom: "80%",
    color: "rgb(255, 255, 255)",
  },

  background_image: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RollInfoPages;
