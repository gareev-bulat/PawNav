import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ShelterProfile from "./ShelterProfile";

const shelters = [
  { id: 1, name: "Shelter One" },
  { id: 2, name: "Shelter Two" },
  { id: 3, name: "Shelter Three" },
  { id: 4, name: "Shelter Four" },
  { id: 5, name: "Shelter Five" },
];

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
});

export default SheltersMenu;
