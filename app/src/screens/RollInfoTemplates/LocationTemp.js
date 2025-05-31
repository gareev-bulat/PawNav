import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";            // <— import Expo Location
import * as Constants from "../../utilities/constants";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";

const initial_region = {
  latitude: 40.7128,
  longitude: -74.0060,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};

const LocationTemp = ({ navigation, route }) => {
  const [region, setRegion] = useState(initial_region);
  const { shelterDocId } = route.params;

  const handleLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Permission to access location was denied.");
        return;
      }

      const reverseResults = await Location.reverseGeocodeAsync({
        latitude: region.latitude,
        longitude: region.longitude,
      });

      let addressString = "Unknown address";
      if (reverseResults.length > 0) {
        const place = reverseResults[0];
        addressString = `${place.name ?? ""} ${place.street ?? ""}`.trim();
        if (place.city) addressString += ", " + place.city;
        if (place.region) addressString += ", " + place.region;
        if (place.postalCode) addressString += " " + place.postalCode;
        if (place.country) addressString += ", " + place.country;
      }

      const user = auth.currentUser;
      if (!user) throw new Error("Not signed in");

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { currentReg: shelterDocId });

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
        shelterAddress: addressString,
      });

      Alert.alert(
        "✅ Location recorded",
        `Approximate address:\n${addressString}`
      );
    } catch (err) {
      console.error("Error uploading location:", err);
      Alert.alert("Error", "Could not record location.");
    }
    navigation.navigate("EndPage");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.question}>Upload Shelter Location</Text>
      <Text style={styles.sub_text}>
        Drag the pin 📍 to your shelter’s location, then tap the button to
        confirm.
      </Text>
      <MapView
        style={styles.map}
        initialRegion={initial_region}
        onRegionChangeComplete={setRegion}
      />

      <View pointerEvents="none" style={styles.pinContainer}>
        <Text style={styles.pin}>📍</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLocation}>
        <AntDesign size={45} name="arrowright" color="white" />
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
    fontSize: 28,
    marginTop: 10,
    fontWeight: "bold",
    color: Constants.DARK_RED,
  },
  sub_text: {
    fontSize: 12,
    textAlign: "center",
    marginHorizontal: 35,
    paddingTop: 10,
    color: "#333",
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
