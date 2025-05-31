import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SectionList, Alert, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Constants from '../utilities/constants';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, getStorage, uploadBytes } from "firebase/storage";
import { launchImageLibrary } from "react-native-image-picker";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const DATA = [
  {
    title: 'First name',
    data: ['First name'],
  },
  {
    title: 'Last name',
    data: ['Last name'],
  },
  {
    title: 'Role',
    data: ['Role'],
  },
];

const SettingsPage = ({ navigation }) => {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [role, setRole] = useState('');
  const [picked, setPicked] = useState(false);
  const [fileName, setFileName] = useState("");
  const [docID, setDocID] = useState("");


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
            `UserImages/${docID}/UserProfileImage`
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

  useEffect(() => {
    async function fetchUserSettings() {
      if (!auth.currentUser) {
        console.log("User is not authenticated.");
        return;
      }
      const uid = auth.currentUser.uid;
      try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        setDocID(docRef.id);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setSurname(data.surname || "");
          setRole(data.role || "");
        } else {
          console.log("No documents");
        }
      } catch (error) {
        Alert.alert("Error. Please try again later.");
      }
    }
    fetchUserSettings();
  }, []); 

  const saveSettings = async () => {
    try {
      const uid = auth.currentUser.uid;
      await setDoc(
        doc(db, 'users', uid),
        {
          name: name,
          surname: surname,
          role: role,
        },
        { merge: true }
      );
      Alert.alert("Settings saved successfully!");
    } catch (error) {
      Alert.alert("Error. Please try again.");
    }
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.settingsButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="settings-outline" size={40} color={Constants.DARK_RED} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <View style={{ flex: 1, width: '100%' }}>
          <SectionList
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header_item}>{title}</Text>
            )}
            renderItem={({ item, section }) => {
              let value = "";
              let onChange = () => {};
              switch (section.title) {
                case 'First name':
                  value = name;
                  onChange = setName;
                  break;
                case 'Last name':
                  value = surname;
                  onChange = setSurname;
                  break;
                case 'Role':
                  value = role;
                  onChange = setRole;
                  break;
                default:
                  break;
              }
              return (
                <TextInput
                  placeholder={item}
                  style={styles.item}
                  value={value}
                  onChangeText={onChange}
                />
              );
            }}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
          <View>
            <Text style={styles.header_item}>
              Update profile image
            </Text>
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
            
          </View>
        </View>
        <TouchableOpacity onPress={saveSettings} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignInPage")}
          style={{ flexDirection: "row" }}
        >
          <Text style={{ marginLeft: 10, marginRight: 10, fontSize: 20, marginBottom: 30 }}>
            Sign out
          </Text>
          <Ionicons name="exit-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  settingsButton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },

  upload: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
  },
  header_item: {
    fontSize: 24,
    paddingLeft: 10,
    paddingBottom: 5,
    marginTop: 15,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    borderRadius: 25,
    marginVertical: 8,
    fontSize: 18,
    width: '100%',
  },
  header: {
    height: 100,
    width: '100%',
    backgroundColor: Constants.DEFAULT_ORANGE,
    justifyContent: 'center',
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "black",
  },
  body: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 20,
    backgroundColor: '#f5f5f5',
    // Align at the top, so items begin at the start of the available space:
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  saveButton: {
    backgroundColor: Constants.DARK_RED,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginVertical: 20,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsPage;
