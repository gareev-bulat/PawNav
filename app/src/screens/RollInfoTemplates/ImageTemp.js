import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as Constants from "../../utilities/constants";
import { launchImageLibrary } from "react-native-image-picker";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { auth, db } from "../../../config/firebase";
import { getDownloadURL, ref, getStorage, uploadBytes } from "firebase/storage";

const QuizTemp = ({ navigation, route }) => {
  const [] = useFonts({
    CustomFont: require("../../../assets/fonts/Roboto_Condensed-Bold.ttf"),
  });

  const { shelterDocId } = route.params;
  const [picked, setPicked] = useState(false);
  const [fileName, setFileName] = useState("");

  //Image picker async function
  async function pickImage() {
    try {
      const result = await launchImageLibrary();
      console.log(result);
      let uri_var = result["assets"][0]["uri"];
      let fileName_var = result["assets"][0]["fileName"];
      setPicked(true);
      updateData(uri_var, fileName_var);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  const updateData = async (uri_var, filename_var) => {
    if (filename_var != "" && uri_var != null) {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("Not signed in");
        console.log("fileName", filename_var);
        console.log("uri", uri_var);
        setFileName(filename_var);

        const response = await fetch(uri_var);
        const blob = await response.blob();

        const storageRef = ref(
          getStorage(),
          `images/${shelterDocId}/ShelterBanner`
        );

        await uploadBytes(storageRef, blob);
        console.log("✅ Image Upload succeeded");
        Alert.alert("✅ Image Upload succeeded");
        const downloadURL = await getDownloadURL(storageRef);
      } catch (error) {
        console.error("Upload Failed:", error);
      }
    } else {
      Alert.alert("Please pick an image");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.question}>Upload Shelter Banner</Text>
      <TouchableOpacity style={styles.upload} onPress={pickImage}>
        {picked ? (
          <MaterialCommunityIcons
            name="file"
            size={35}
            color={Constants.DEFAULT_ORANGE}
          />
        ) : (
          <MaterialIcons
            name="file-upload"
            size={35}
            color={Constants.DEFAULT_ORANGE}
          />
        )}
        <Text style={styles.text}>{picked ? fileName : "Upload image"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSubmit}
        onPress={() => navigation.navigate("UploadTemp", { shelterDocId })}
      >
        <AntDesign size="45" name="arrowright" color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
    alignItems: "center",
  },

  button_list: {
    marginTop: 180,
  },

  button_text: {
    fontFamily: "CustomFont",
    fontSize: 20,
  },

  button: {
    borderWidth: 2,
    height: 50,
    width: 250,
    borderRadius: 30,
    marginBottom: 10,
    borderColor: Constants.DEFAULT_ORANGE,
    justifyContent: "center",
    alignItems: "center",
  },

  question: {
    fontFamily: "CustomFont",
    fontSize: 30,
    top: "10%",
  },

  buttonSubmit: {
    width: 100,
    height: 70,
    borderRadius: 30,
    top: "80%",
    position: "absolute",
    backgroundColor: Constants.DEFAULT_ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },

  upload: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 100,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default QuizTemp;
