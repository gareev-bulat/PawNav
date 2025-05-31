import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as Constants from "../../utilities/constants";
import { auth, db } from "../../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

const BioInputPage = ({ navigation, route }) => {
  const [bio, setBio] = useState("");

  const [fontsLoaded] = useFonts({
    CustomFont: require("../../../assets/fonts/Roboto_Condensed-Bold.ttf"),
  });
  if (!fontsLoaded) return null;

  const { shelterDocId } = route.params;

  const onChangeBio = (text) => {
    const noNewlines = text.replace(/[\r\n]+/g, " ");
    const words = noNewlines.trim().split(/\s+/);
    if (words.length <= 20) {
      setBio(noNewlines);
    } else {
      setBio(words.slice(0, 20).join(" "));
    }
  };

  const submitBio = async () => {
    Keyboard.dismiss();
    if (!bio.trim()) {
      Alert.alert("Please enter a description for your shelter.");
      return;
    }
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not signed in");
      const docRef = doc(
        db,
        "users",
        user.uid,
        "Shelter Information",
        shelterDocId
      );
      await updateDoc(docRef, {
        shelterBio: bio.trim(),
      });
      navigation.navigate("ImageTemp", { shelterDocId });
    } catch (err) {
      Alert.alert(
        "Error",
        "Could not save your shelter description. Please try again."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.question}>Tell us about your shelter 📝</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textArea}
                multiline
                placeholder="Enter a description..."
                value={bio}
                onChangeText={onChangeBio}
                textAlignVertical="top"
              />
              <Text style={styles.counter}>
                {bio.trim().split(/\s+/)[0] === "" ? 0 : bio.trim().split(/\s+/).length}/20
              </Text>
            </View>
            <TouchableOpacity style={styles.buttonSubmit} onPress={submitBio}>
              <AntDesign size={45} name="arrowright" color="white" />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
  },
  inner: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  question: {
    fontFamily: "CustomFont",
    fontSize: 26,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 60,
    width: "90%",
    flex: 1,
    marginBottom: 20,
    position: "relative",
  },
  textArea: {
    flex: 1,
    borderWidth: 2,
    borderColor: Constants.DEFAULT_ORANGE,
    borderRadius: 20,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  counter: {
    position: "absolute",
    right: 20,
    bottom: 20,
    fontSize: 14,
    color: "#666",
  },
  buttonSubmit: {
    width: 100,
    height: 70,
    borderRadius: 30,
    marginBottom: 40,
    backgroundColor: Constants.DEFAULT_ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BioInputPage;
