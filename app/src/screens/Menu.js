import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Maps from '../components/Maps'
import SearchComponent from "../components/SearchBar";
import * as Location from 'expo-location';
import { MapPrompts } from '../components/MapPrompts';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Constants from '../utilities/constants';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";


const Menu = () => {

  const [prompts, setPrompts] = useState({
    UserRegion: {},
    DestinationRegion: {}
  });
   

  const getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    location.coords.latitudeDelta = 0.05
    location.coords.longitudeDelta = 0.05
    setPrompts(prev => ({ ...prev, UserRegion: location.coords }));

  };

  const updateShelterInfo = async (currentReg) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not signed in");

    const docRef = doc(
      db,
      "users",
      user.uid,
      "Shelter Information",
      currentReg
    );

    await updateDoc(docRef, {
      shelterStatus: "Published"
    });
  };

  const checkRegStatus = async() => {
    try {
          const user = auth.currentUser;
          if (!user) throw new Error("Not signed in");

          const userRef = doc(db, 'users', user.uid)
          const docSnap = await getDoc(userRef);
          console.log(docSnap.data().registrationStatus)
          if (docSnap.exists()){
            if (docSnap.data().registrationStatus == "Approved"){
              console.log("APPROVED")
              await updateDoc(userRef, {
                registrationStatus: "No registration"
              });
              updateShelterInfo(docSnap.data().currentReg);
            }


          } else {
          console.log("No documents");
        }
        }catch(error){
          console.log("Error:", err);
        }

  }

  const getPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted"){return;}
    getLocation();
  };

    useEffect(() => {

      getPermission();
      checkRegStatus();

    }, []);
    return (
      <MapPrompts.Provider value={{ prompts, setPrompts }}>
        <View style={styles.container}>
          <Maps style={styles.map} />
          <View style={styles.search}>
            <SearchComponent />
          </View>
          <View style={styles.currentLocationButton}>
            <TouchableOpacity onPress={getLocation} style={{top: '25%', left: '25%'}}>
              <FontAwesome5 name="location-arrow" size={30} color={Constants.DARK_RED} solid />
            </TouchableOpacity>
          </View>
        </View>
      </MapPrompts.Provider>
    );
}

const styles = StyleSheet.create({

    currentLocationButton: {
      backgroundColor: 'white',
      marginBottom: 10,
      marginRight: 10,
      borderRadius: 23,
      right: 0,
      bottom: 0,
      width: 60,
      height: 60,
      position: 'absolute',
      zIndex: 2,
    },

    container: {
        flex: 1
    },
    map: {
      position: 'absolute',
      zIndex: 1,
      
    },
    search: {
        position: 'absolute',
        width: '100%',
        top: 20,
        zIndex: 2,
    },
})


export default Menu;