import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from '../../config/firebase';
import { getDocs, collection, doc, collectionGroup } from 'firebase/firestore';


//fetch of all shelters in the app

async function fetchAllShelters() {
  const shelters = [];
  const snap = await getDocs(collectionGroup(db, "Shelter Information"));
  //console.log(snap)
  for (const docSnap of snap.docs) {
    //console.log("docsSnap:", docSnap)
    const data = docSnap.data();

    shelters.push({
      id:   docSnap.id,
      name: data.shelterName,
      address: "Address", 
      phone:  data.phoneNumber,
      capacity: data.animalCapacity,         
      startHours: data.startHours,
      endHours: data.endHours,
      
    });
  }

  return shelters;
}

////////////////////



const ShelterComponent = ({ shelter,  navigation }) => (
  //passing shelter props inside navigation props to the Shelter Profile component
  <TouchableOpacity onPress={() => navigation.navigate('ShelterProfile', { shelter })}> 
  <View style={styles.card}>
    <Image
        style={styles.shelter_image}
        source={require("../../assets/images/animal_shelter_image_profile.webp")}
    />
    
    <View style={styles.cardContent}>
      <Text style={styles.shelterName}>{shelter.name}</Text>
      <Text style={styles.shelterDetail}>📍 {shelter.address}</Text>
      <Text style={styles.shelterDetail}>📞 {shelter.phone}</Text>
      <Text style={styles.shelterDetail}>🏠 Capacity: {shelter.capacity}</Text>

      <View style={styles.metaRow}>
        <View style={styles.metaPill}>
          <Text style={styles.metaPillText}>🕚 {shelter.startHours} - {shelter.endHours}</Text>
        </View>
      </View>
    </View>
   
  </View>
  </TouchableOpacity>
);

const SheltersMenu = ( { navigation } ) => {
  const [search, setSearch] = useState("");

  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {     //fetch of all shelters 
    fetchAllShelters()
      .then((list) => setShelters(list))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  

  if (loading) {      //shelters loading
    return <Text>Loading shelters…</Text>;
  }

  //console.log(shelters);

  const renderItem = ({ item }) => <ShelterComponent shelter={item} navigation={navigation}/>;

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search shelters..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={shelters}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
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
    backgroundColor: "#faf8ff",
  },
  shelterName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#673ab7",
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
    color: "#333",
  },
});

export default SheltersMenu;





