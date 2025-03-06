import React, { useContext, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DataBase from '../utilities/data';
import * as Constants from '../utilities/constants';
import { MapPrompts } from '../components/MapPrompts';
import { getPreciseDistance } from 'geolib';


const PopUpList = ({ isVisible, onItemPress }) => {

  const { setPrompts } = useContext(MapPrompts);
  const { prompts } = useContext(MapPrompts);

  
  if (!isVisible) return null;

  return (
    <View style={styles.popUpList}>
      <FlatList
        data={DataBase}
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
            <Text style={styles.shelterDistance}>{getPreciseDistance(prompts.UserRegion, item.location).toFixed(1)} mi</Text>
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
