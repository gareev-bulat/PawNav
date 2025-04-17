import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, TextInput } from "react-native";
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

const ShelterProfile = ({ shelter }) => (
  <View style={styles.card}>
    <Image
      source={{ uri: "https://via.placeholder.com/300x150.png?text=Shelter+Image" }}
      style={styles.image}
    />
    <View style={styles.cardContent}>
      <Text style={styles.shelterName}>{shelter.name}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>🕚 11 am - 1 pm</Text>
        <Text style={styles.metaText}>👤 32</Text>
        <Text style={styles.metaText}>🐾 32</Text>
      </View>
    </View>
  </View>
);

const SheltersMenu = () => {
  const [search, setSearch] = useState("");

  const renderItem = ({ item }) => <ShelterProfile shelter={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Shelters’ Menu</Text>
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
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
    padding: 12,
  },
  shelterName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaText: {
    fontSize: 14,
    color: "#555",
  },
});

export default SheltersMenu;


