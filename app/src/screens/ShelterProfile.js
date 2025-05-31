import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import MapView, { Marker, Callout } from "react-native-maps";
import { auth, db } from "../../config/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import * as Constants from '../utilities/constants';

const ShelterProfile = ({ navigation, route }) => {
  const { shelter } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const uid = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    if (!uid) return;
    const userDocRef = doc(db, "users", uid);

    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const favourites = docSnap.data().favourites || [];
        const exists = favourites.some((fav) => fav.id === shelter.id);
        setIsFavorite(exists);
      }
    });

    return unsubscribe;
  }, [uid]);

  const toggleFavorite = async () => {
    if (!uid) return;
    const userDocRef = doc(db, "users", uid);

    try {
      if (!isFavorite) {
        await updateDoc(userDocRef, {
          favourites: arrayUnion({
            id: shelter.id,
            shelterName: shelter.name,
            imageURL: shelter.imageURL,
          }),
        });
      } else {
        await updateDoc(userDocRef, {
          favourites: arrayRemove({
            id: shelter.id,
            shelterName: shelter.name,
            imageURL: shelter.imageURL,
          }),
        });
      }
      setIsFavorite((prev) => !prev);
    } catch {
      Alert.alert("Error", "Could not update favorites.");
    }
  };

  const [fontsLoaded] = useFonts({
    CustomFont: require("../../assets/fonts/PlayfairDisplay-Bold.ttf"),
  });
  if (!fontsLoaded) return null;

  const initialRegion = {
    latitude: shelter.shelterLatitude ?? 40.7128,
    longitude: shelter.shelterLongitude ?? -74.0060,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="exit-outline" size={35} color="black" />
          </TouchableOpacity>

          <Text style={styles.name}>{shelter.name}</Text>

          <TouchableOpacity style={styles.iconButton} onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={30}
              color={isFavorite ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>

        <Image
          style={styles.shelter_image}
          source={{ uri: shelter.imageURL }}
        />

        <View style={styles.content}>
          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>
              {shelter.shelterBio?.trim() || "Bio not available."}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Location:</Text>
          <Text style={[styles.sectionText, styles.addressText]}>
            {shelter.shelterAddress ?? "Address not available"}
          </Text>
          <View style={styles.mapContainer}>
            <MapView style={styles.map} initialRegion={initialRegion}>
              {shelter.shelterLatitude && shelter.shelterLongitude && (
                <Marker
                  coordinate={{
                    latitude: shelter.shelterLatitude,
                    longitude: shelter.shelterLongitude,
                  }}
                >
                  <Image
                    source={require("../../assets/images/Marker_icon.png")}
                    style={styles.markerImage}
                    resizeMode="contain"
                  />
                  <Callout tooltip>
                    <View style={styles.infoWindow}>
                      <Text style={styles.subTitle}>Hours:</Text>
                      <Text style={styles.bodyText}>
                        {shelter.startHours} - {shelter.endHours}
                      </Text>
                    </View>
                  </Callout>
                </Marker>
              )}
            </MapView>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.adoptButton]}
            onPress={() => Alert.alert("Adopt!")}
          >
            <Text style={styles.whiteText}>Adopt a pet</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShelterProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: Constants.DEFAULT_ORANGE,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    flex: 1,
    fontSize: 30,
    color: Constants.DARK_RED,
    textAlign: "center",
    fontFamily: "CustomFont",
  },
  shelter_image: {
    width: "90%",
    height: 200,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
    resizeMode: "cover",
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 7,
    marginBottom: 5,
  },
  bioContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 5,
    minHeight: 70,
    maxHeight: 120,
  },
  bioText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  sectionText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  addressText: {
    marginBottom: 10,
  },
  mapContainer: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },
  map: {
    flex: 1,
  },
  markerImage: {
    width: 45,
    height: 45,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Constants.DARK_RED,
    padding: 5,
  },
  infoWindow: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 8,
    borderColor: Constants.DARK_RED,
    borderWidth: 0.5,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 3,
  },
  bodyText: {
    fontSize: 12,
    color: "#333",
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  adoptButton: {
    backgroundColor: "#ff7f09",
  },  
  whiteText: {
    color: "white",
    fontWeight: "600",
  },
  orangeText: {
    color: "#ff7f09",
    fontWeight: "600",
  },
});
