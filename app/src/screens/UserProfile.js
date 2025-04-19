import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth, db } from '../../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import * as Constants from '../utilities/constants';

const UserProfile = ({ navigation }) => {

  const [fontsLoaded] = useFonts({
    'CustomFont': require('../../assets/fonts/PlayfairDisplay-Bold.ttf'),
  });
  

  const [userData, setUserData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);


  const uid = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    if (!uid) {
      setLoadingData(false);
      return;
    }

    const userDocRef = doc(db, 'users', uid);
    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No documents");
        }
        setLoadingData(false);
      },
      (error) => {
        setLoadingData(false);
      }
    );

    return unsubscribe;
  }, [uid]);

  if (!fontsLoaded || loadingData) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={Constants.DARK_RED} />
      </SafeAreaView>
    );
  }

  let ProfileName = userData?.name || "Name";
  let ProfileSurname = userData?.surname || "Surname";
  let ProfileStatus = userData?.status || "Status example";
  let ProfileRole = userData?.role || "Role";
  let ProfileFav = userData?.favourites || "Favourite shelter #1";
  let ShelterOwner = userData?.owner;
  let RegistrationStatus = userData?.registrationStatus;


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.profile_image}
          source={require("../../assets/images/profile_image.jpeg")}
        />
        <Text style={styles.name}>
          {ProfileName} {ProfileSurname}
        </Text>
        
        <View style={styles.settingsButton}>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Ionicons
              name="settings-outline"
              size={40}
              color={Constants.DARK_RED}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.body} indicatorStyle="white">
      {ShelterOwner && (
          <View style={styles.shelter_owner_line}>
            <Text>🏠 New shelter registration</Text>
            <TouchableOpacity disabled={(RegistrationStatus != "Finish registration")} style={styles.registrationButton} onPress={() => navigation.navigate("RollInfoPages")}>
              {(RegistrationStatus == "Finish registration") && <Text style={[styles.registrationButtonText, styles.finishRegistrationColor]}>{RegistrationStatus}</Text>}
              {(RegistrationStatus == "Pending") && <Text style={[styles.registrationButtonText, styles.PendingRegistrationColor]}>{RegistrationStatus}</Text>}
              {(RegistrationStatus == "Approved") && <Text style={[styles.registrationButtonText, styles.ApprovedRegistrationColor]}>{RegistrationStatus}</Text>}
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.title}>Status:</Text>
        <Text style={styles.text}>{ProfileStatus}</Text>
        <Text style={styles.title}>Role:</Text>
        <Text style={styles.text}>{ProfileRole}</Text>
        <Text style={styles.title}>Favourite Shelters:</Text>
        <Text style={styles.text}>{ProfileFav}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  shelter_owner_line: {
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 0,
    flexDirection: 'row',
  },

  finishRegistrationColor: {
    backgroundColor: '#FF704F',
    borderRadius: 13,
  },

  PendingRegistrationColor: {
    backgroundColor: '#FFE523',
    borderRadius: 13,
  },

  ApprovedRegistrationColor: {
    backgroundColor: '#32CA35',
    borderRadius: 13,
  },

  registrationButtonText: {
    fontSize: 12,
    padding: 3,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  registrationButton: {
    width: 150,
    height: 25,
    marginLeft: 10,
  },

  container: {
    alignItems: 'flex-start',
    flex: 1,
  },
  settingsButton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  body: {
    width: '100%',
    paddingHorizontal: 20,  
  },
  header: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 15,
    width: '100%',
    backgroundColor: "#ff7f09",
  },
  title: {
    marginBottom: 5,
    paddingTop: 40,
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff7f09",
  },
  text: {
    marginBottom: 75,
    fontSize: 20,
    fontWeight: "500",
    color: 'black',
    paddingTop: 5,
  },
  name: {
    fontSize: 30,
    color: "black",
    paddingTop: 10,
    fontFamily: 'CustomFont',
  },
  profile_image: {
    marginTop: 10,
    width: 120,
    height: 120,
    borderRadius: 50,
    alignSelf: 'flex-start',
    resizeMode: 'cover'
  }
});

export default UserProfile;
