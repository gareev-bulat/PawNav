import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
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

const ShelterProfile = ({ shelter, isFavorite, onToggleFavorite }) => (
  <View style={styles.shelterCard}>
    <Text style={styles.shelterName}>{shelter.name}</Text>
    <Text>Address: {shelter.address}</Text>
    <Text>Phone: {shelter.phone}</Text>
    <Text>Capacity: {shelter.capacity}</Text>
    <TouchableOpacity onPress={onToggleFavorite}>
      <Text style={{ color: isFavorite ? "red" : "blue", marginTop: 6 }}>
        {isFavorite ? "Unfavorite" : "Favorite"}
      </Text>
    </TouchableOpacity>
  </View>
);

const SheltersMenu = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }) => (
    <ShelterProfile
      shelter={item}
      isFavorite={favorites.includes(item.id)}
      onToggleFavorite={() => toggleFavorite(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Available Shelters</Text>
      <FlatList
        data={shelters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  shelterCard: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  shelterName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
});

export default SheltersMenu;

