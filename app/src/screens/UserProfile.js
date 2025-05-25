import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { auth, db } from '../../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import * as Constants from '../utilities/constants';
import * as Progress from 'react-native-progress';
import { AntDesign } from "@expo/vector-icons";


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
          console.log('Fetched user data: ', docSnap.data()); 
        } else {
          console.log("No documents");
        }
        setLoadingData(false);
      },
      (error) => {
        console.error("Error fetching user data: ", error);
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
  let ProfileRole = userData?.role || "Role";
  let ShelterOwner = userData?.owner;
  let RegistrationStatus = userData?.registrationStatus;
  let Favourites = userData?.favourites || [];

  console.log('Favourites data: ', Favourites); 

  const renderFavoriteShelter = ({ item }) => (
    <View style={styles.favShelterContainer}>
      <Image
        source={require('../../assets/images/animal_shelter_image_profile.webp')}
        style={styles.favShelterImage}
      />
      <Text style={styles.favShelterName}>{item}</Text>
    </View>
  )

  const getColor = () => {
    switch (RegistrationStatus) {
      case 'Finish registration':
        return Constants.DARK_RED;
      case "Pending":
        return Constants.YELLOW;
      case "Approved":
        return Constants.GREEN;
    }
  }

  const getProgress = () => {
    switch (RegistrationStatus) {
      case 'Finish registration':
        return 0.35;
      case "Pending":
        return 0.7;
      case "Approved":
        return 1.0;
    }


  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.sub_container}>
          <Image
            style={styles.profile_image}
            source={require("../../assets/images/profile_image.jpeg")}
          />
          <View style={styles.editButton}>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <FontAwesome5
                name="pen"
                style={styles.editIcon}
                size={20}
                color={Constants.DARK_RED}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.right_content}>
        <Text style={styles.name}>
          {ProfileName} {ProfileSurname}
        </Text>

        <Text style={styles.role}>{ProfileRole}</Text>
      
        </View>
      </View>

      <ScrollView style={styles.body} indicatorStyle="white">
        {ShelterOwner && (
          <TouchableOpacity disabled={RegistrationStatus != "Finish registration"} style={styles.shelter_owner_tab} onPress={() => navigation.navigate("RollInfoPagesStack")}>
            <View style={styles.registrationButton}>
              {RegistrationStatus == "Finish registration" && (
                <Text
                  style={[
                    styles.registrationButtonText,
                    styles.finishRegistrationColor,
                  ]}
                >
                  Complete shelter registration
                </Text>
              )}
              {RegistrationStatus == "Pending" && (
                <Text
                  style={[
                    styles.registrationButtonText,
                    styles.PendingRegistrationColor,
                  ]}
                >
                  Pending shelter registration
                </Text>
              )}
              {RegistrationStatus == "Approved" && (
                <Text
                  style={[
                    styles.registrationButtonText,
                    styles.ApprovedRegistrationColor,
                  ]}
                >
                  Shelter is approved
                </Text>
              )}
            </View>
            <View style={styles.progress_bar_container}>
              <View style={styles.progress_bar}>
              <Progress.Bar progress={getProgress()} color={getColor()} width={300} height={8} />
              </View>
              <AntDesign name="right" size={16} color={Constants.DARK_RED} />
            </View>
          </TouchableOpacity>
        )}

        <Text style={styles.title}>Favourite Shelters</Text>
        {Favourites && Favourites.length > 0 ? (
          <FlatList
            data={Favourites}
            renderItem={renderFavoriteShelter}
            keyExtractor={(item, index) => item.name + index}
            numColumns={3}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.text}>No favourite shelters yet.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  progress_bar_container: {
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  shelter_owner_tab: {
    marginTop: 20,
    height: 100,
    backgroundColor: 'rgb(255, 231, 146)',
    flexDirection: 'column',
    borderRadius: 25,
    padding: 20,
    marginBottom: 30,
    justifyContent: 'space-between'
  },  

  editIcon: {
    transform: [{ rotate: '90deg' }],

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
    fontSize: 15,
    padding: 3,
    fontWeight: 500,
    borderColor: Constants.DEFAULT_ORANGE,
    borderWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  registrationButton: {
    width: 230,
    height: 50,
    paddingVertical: 6,
    
  },

  container: {
    alignItems: 'flex-start',
    flex: 1,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderColor: Constants.DARK_RED,
    borderWidth: 0.5,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    width: '100%',
    paddingHorizontal: 20,  
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    flexDirection: "row",
    width: '100%',
    backgroundColor: "#ff7f09",
    justifyContent: 'space-evenly',
  },

  sub_container: {
    position: 'relative',
    padding: 0,

  },

  title: {
    marginBottom: 5,
    paddingTop: 40,
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
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
  role: {
    color: Constants.WHITE,
    textAlign: 'left',
    padding: 3,
    fontWeight: "500",
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: Constants.DARK_RED,
    marginTop: 15,
    borderRadius: 15,
    width: 120,
  },
  name: {
    fontSize: 28,
    color: "black",
    paddingTop: 10,
    fontFamily: 'CustomFont',
  },
  profile_image: {
    marginTop: 10,
    width: 130,
    height: 130,
    borderRadius: 60,
    resizeMode: 'cover',
  },
  favShelterContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    maxWidth: Dimensions.get('window').width / 3 - 20, 
  },
  
  favShelterImage: {
    width: 70,
    height: 70,
    borderRadius: 35,  
    marginBottom: 5,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#ff7f09',
  },
  
  favShelterName: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  
  
});

export default UserProfile;
