import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../config/firebase";
import { getDocs, collectionGroup } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import * as Constants from '../utilities/constants';

//fetch of all shelters in the app

async function fetchAllShelters() {
  const shelters = [];
  const snap = await getDocs(collectionGroup(db, "Shelter Information"));
  for (const docSnap of snap.docs) {
    // image reference
    const data = docSnap.data();
    if (data.shelterStatus === "Published") {
    const imageRef = ref(getStorage(), `images/${docSnap.id}/ShelterBanner`);
    const imageURL = await getDownloadURL(imageRef);
    console.log("imageURL", imageURL);
    //
    

    shelters.push({
      imageURL: imageURL,
      id: docSnap.id,
      shelterBio: data.shelterBio,
      name: data.shelterName,
      shelterAddress: data.shelterAddress,
      shelterLatitude: data.shelterLatitude,
      shelterLongitude: data.shelterLongitude,
      phone: data.phoneNumber,
      capacity: data.animalCapacity,
      startHours: data.startHours,
      endHours: data.endHours,
    });}
  }

  return shelters;
}

////////////////////

const ShelterComponent = ({ shelter, navigation }) => (
  //passing shelter props inside navigation props to the Shelter Profile component
  <TouchableOpacity
    onPress={() => navigation.navigate("ShelterProfile", { shelter })}
  >
    <View style={styles.card}>
      <Image style={styles.shelter_image} source={{ uri: shelter.imageURL }} />

      <View style={styles.cardContent}>
        <Text style={styles.shelterName}>{shelter.name}</Text>
        <Text style={styles.shelterDetail}>📍 {shelter.shelterAddress}</Text>
        <Text style={styles.shelterDetail}>📞 {shelter.phone}</Text>
        <Text style={styles.shelterDetail}>
          🏠 Capacity: {shelter.capacity}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <Text style={styles.metaPillText}>
              🕚 {shelter.startHours} - {shelter.endHours}
            </Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const SheltersMenu = ({ navigation }) => {
  const [search, setSearch] = useState("");

  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //fetch of all shelters
    fetchAllShelters()
      .then((list) => setShelters(list))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    //shelters loading
    return <Text>Loading shelters…</Text>;
  }

  const filteredShelters = shelters.filter((shelter) => {
    if (!search.trim()) return true;
    return shelter.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
  });

  const renderItem = ({ item }) => (
    <ShelterComponent shelter={item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search shelters..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      {filteredShelters.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No shelters found</Text>
          <Text style={styles.emptySubtitle}>
            Try adjusting your search
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredShelters}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  shelter_image: {
    width: "100%",
    height: 150,
  },
  searchInput: {
    width: '104%',
    right: '2%',
    height: 45,
    borderWidth: 1.47,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    paddingLeft: 20,
    marginTop: -50,
    marginBottom: 16,
    fontSize: 14,
    backgroundColor: "#fff",
    borderColor: "#8B0000"
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: Constants.DEFAULT_ORANGE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 14,
    backgroundColor: Constants.DEFAULT_ORANGE_BLUR,
  },
  shelterName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    color: Constants.DEFAULT_ORANGE,
    textShadowColor: Constants.DARK_RED
  },
  shelterDetail: {
    fontSize: 14,
    color: "#444",
    marginBottom: 3,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  metaPill: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  metaPillText: {
    fontSize: 13,
    color: Constants.DARK_RED,
  },

});

export default SheltersMenu;
