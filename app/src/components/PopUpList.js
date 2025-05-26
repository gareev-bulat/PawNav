import React, { useContext, useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Constants from '../utilities/constants';
import { MapPrompts } from '../components/MapPrompts';
import { getPreciseDistance } from 'geolib';
import { db } from '../../config/firebase';
import { getDocs, collection, doc, collectionGroup } from 'firebase/firestore';


const PopUpList = ({ isVisible, onItemPress }) => {

  const { setPrompts } = useContext(MapPrompts);
  const { prompts } = useContext(MapPrompts);
  const [shelters, setShelters] = useState([]);


  const fetchMarkers = async() => {

    const shelters = [];
  
    const snap = await getDocs(collectionGroup(db, "Shelter Information"));
    for (const doc of snap.docs) {
      const data = doc.data();
      shelters.push({
        id: doc.id,
        name: data.shelterName,
        startHours: data.startHours,
        endHours: data.endHours,
        location: {
          latitude:  data.shelterLatitude,
          longitude: data.shelterLongitude,
        },
      })
    }
    return shelters;
  };

  useEffect(() => {         /////fetch all shelters from firebase
      console.log("Starting fetch process...")
      fetchMarkers()
      .then(list => {
        const sortedList = list.sort((a, b) =>
          a.name.localeCompare(b.name)
      );
        console.log(list);
        setShelters(list);
      })
      .catch(err => console.error(err))
    }, []);

  
  if (!isVisible) return null;

  console.log(shelters);

  return (
    <View style={styles.popUpList}>
      <FlatList
        data={shelters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.elem, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}
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
    </View>
  );
};

export default PopUpList;

const styles = StyleSheet.create({
  popUpList: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: Constants.DARK_RED,
    borderWidth: 1.47,
    width: '95%',
    padding: 15,
    marginRight: 10,
    marginLeft: 10,
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
    color: '#A9A9A9',
  },

});
