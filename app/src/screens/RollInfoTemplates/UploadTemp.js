import React, { useState } from "react";
import {
  StyleSheet,
  Text, Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { storage, auth } from "../../../config/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import * as Constants from "../../utilities/constants";


export default function UploadTemp({ navigation }) {
  const [fileName, setFileName] = useState("");
  const [picked, setPicked] = useState(false);

  async function pickDocument() {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      return;
    }
    const { uri, name } = result.assets[0];

    const response = await fetch(uri);
    const blob = await response.blob();

    const user = auth.currentUser;

    if (!user) throw new Error("Must be signed in to upload");

    console.log(result);

    const storageRef = ref(storage, `users/${user.uid}/pdfs/${name}`);
    await uploadBytes(storageRef, blob);
    console.log('✅ UploadBytes succeeded');
    Alert.alert('✅ Upload succeeded');
    setPicked(true);
    setFileName(result["assets"][0]["name"]);

    const downloadURL = await getDownloadURL(storageRef);
    console.log('🔗 download URL:', downloadURL);

  } catch (err) {
    console.error('Error uploading doc', err);
    Alert.alert('❌ Error', err.message);
  }
}

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.question}>Upload Template</Text>
      <TouchableOpacity style={styles.upload} onPress={pickDocument}>
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
        <Text style={styles.text}>
          {picked ? fileName : "Upload pdf file"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LocationTemp")}
      >
        <AntDesign size={45} name="arrowright" color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    fontSize: 30,
    fontFamily: "CustomFont",
    marginBottom: 40,
  },
  upload: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
  },
  button: {
    marginTop: 60,
    width: 100,
    height: 70,
    borderRadius: 30,
    backgroundColor: Constants.DEFAULT_ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },
});
