import React, { useContext, useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Constants from "../utilities/constants";
import { MapPrompts } from "../components/MapPrompts";
import { db } from "../../config/firebase";
import { getDocs, collectionGroup } from "firebase/firestore";

const PopUpList = ({ isVisible, onItemPress, searchText = "" }) => {
  const { setPrompts } = useContext(MapPrompts);
  const [shelters, setShelters] = useState([]);

  const fetchMarkers = async () => {
    const all = [];
    const snap = await getDocs(collectionGroup(db, "Shelter Information"));
    for (const doc of snap.docs) {
      const data = doc.data();
      if (data.shelterStatus === "Published") {
        all.push({
          id: doc.id,
          name: data.shelterName,
          startHours: data.startHours,
          endHours: data.endHours,
          location: {
            latitude: data.shelterLatitude,
            longitude: data.shelterLongitude,
          },
        });
      }
    }
    return all;
  };

  useEffect(() => {
    fetchMarkers()
      .then((list) => {
        const sortedList = list.sort((a, b) => a.name.localeCompare(b.name));
        setShelters(sortedList);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!isVisible) return null;

  const filteredShelters =
    searchText.trim().length > 0
      ? shelters.filter((s) =>
          s.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

  return (
    <View style={styles.popUpList}>
      {searchText.trim().length > 0 && filteredShelters.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No shelters found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredShelters}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.elem,
                {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
              onPress={() => {
                setPrompts((prev) => ({
                  ...prev,
                  DestinationRegion: item.location,
                  Name: item.name,
                }));
                if (onItemPress) onItemPress();
              }}
            >
              <Text style={styles.shelterName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default PopUpList;

const styles = StyleSheet.create({
  popUpList: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderColor: Constants.DARK_RED,
    borderWidth: 1.47,
    width: "95%",
    padding: 15,
    marginHorizontal: 10,
    marginTop: 65,
    borderRadius: 20,
    zIndex: 999,
  },
  elem: {
    borderBottomWidth: 1,
    borderColor: Constants.DARK_RED,
    paddingTop: 15,
    height: 50,
  },
  shelterName: {
    fontSize: 20,
  },
  shelterDistance: {
    fontSize: 15,
    color: "#A9A9A9",
  },
  emptyContainer: {
    paddingVertical: 10,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
});
