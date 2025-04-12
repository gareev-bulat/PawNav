import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SectionList, Alert, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Constants from '../utilities/constants';
import { auth, db } from '../../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
    title: 'Status',
    data: ['Status'],
  },
  {
    title: 'Role',
    data: ['Role'],
  },
];

const SettingsPage = ({ navigation }) => {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');

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
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setSurname(data.surname || "");
          setStatus(data.status || "");
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
          status: status,
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
                case 'Status':
                  value = status;
                  onChange = setStatus;
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
