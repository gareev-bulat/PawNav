import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const shelters = [
  {
    id: 1,
    name: "Shelter One",
    address: "123 Main St, Cityville",
    phone: "(123) 456-7890",
    capacity: 50,
  },
  {
    id: 2,
    name: "Shelter Two",
    address: "456 Elm St, Townsville",
    phone: "(234) 567-8901",
    capacity: 30,
  },
  {
    id: 3,
    name: "Shelter Three",
    address: "789 Oak St, Villagetown",
    phone: "(345) 678-9012",
    capacity: 40,
  },
  {
    id: 4,
    name: "Shelter Four",
    address: "101 Pine St, Hamletburg",
    phone: "(456) 789-0123",
    capacity: 25,
  },
  {
    id: 5,
    name: "Shelter Five",
    address: "202 Maple St, Boroughcity",
    phone: "(567) 890-1234",
    capacity: 60,
  },
];

const ShelterComponent = ({ shelter,  navigation}) => (
  <TouchableOpacity onPress={() => navigation.navigate('ShelterProfile')}>
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
          <Text style={styles.metaPillText}>🕚 11 am - 1 pm</Text>
        </View>
        <View style={styles.metaPill}>
          <Text style={styles.metaPillText}>👤 32</Text>
        </View>
        <View style={styles.metaPill}>
          <Text style={styles.metaPillText}>🐾 32</Text>
        </View>
      </View>
    </View>
   
  </View>
  </TouchableOpacity>
);

const SheltersMenu = ( { navigation } ) => {
  const [search, setSearch] = useState("");

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
        keyExtractor={(item) => item.id.toString()}
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





