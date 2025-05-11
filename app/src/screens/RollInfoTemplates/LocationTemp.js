import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as Constants from '../../utilities/constants';
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";


const initial_region = {
  latitude:  40.7128,
  longitude: -74.0060,
  latitudeDelta:  0.1,
  longitudeDelta: 0.1,
};


const LocationTemp = ( { navigation, route } ) => {

  const [] = useFonts({
    CustomFont: require("../../../assets/fonts/Roboto_Condensed-Bold.ttf"),
  });

  const [region, setRegion] = useState(initial_region);

  const { shelterDocId } = route.params;

  console.log("docid", shelterDocId);

  const handleLocation = async() => {

    console.log("region: ", region);

    //upload coordinates to firestore
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
          shelterLatitude: region.latitude,
          shelterLongitude: region.longitude,
        });

        console.log("Shelter location has been recorded");
        Alert.alert("✅ Location has been recorded")


    }catch(error){
      console.log("Error uploading location:", err);
    }
    /////////////////////////////////


    navigation.navigate("EndPage");


  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.question}>Upload Shelter Location</Text>
      <Text style={styles.sub_text}>Drag the pin 📍 to your shelter’s location, then tap the button to confirm.</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initial_region}
        onRegionChangeComplete={setRegion}
        customMapStyle={[
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ]}
      />

      <View pointerEvents="none" style={styles.pinContainer}>
        <Text style={styles.pin}>📍</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLocation}
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
  },

  pinContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -22,  
    marginTop: -22,  
  },

  pin: {
    fontSize: 44,
    textAlign: "center",
  },

  question: {
    fontFamily: "CustomFont",
    fontSize: 28,
    marginTop: 10,
  },

  sub_text: {
    fontFamily: "CustomFont",
    fontSize: 12,
    textAlign: "center",
    marginLeft: 35,
    marginRight: 35,
    paddingTop: 10,
  },

  map: {
    width: "80%",
    height: "60%",
    marginTop: 20,
    borderRadius: 20,
  },

  button: {
    width: 100,
    height: 70,
    borderRadius: 30,
    position: "absolute",
    top: "90%",
    backgroundColor: Constants.DEFAULT_ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },
});


export default LocationTemp;
