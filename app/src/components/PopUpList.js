import React, { useContext, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DataBase from '../utilities/data';
import * as Constants from '../utilities/constants';
import Maps from './Maps';
import { MapPrompts } from '../components/MapPrompts';



const PopUpList = ({ state }) => {
  const [showMaps, setShowMaps] = useState(false);
  const { setPrompts } = useContext(MapPrompts);

  if (!state) return null;
  if (showMaps) return null;


  return (
    <View style={styles.popUpList}>
      <FlatList
        data={DataBase}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setShowMaps(true);
              setPrompts(prev => ({ ...prev, DestinationRegion: item.location }));
            }}
            style={styles.elem}>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};


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
    marginTop: 7,
    borderRadius: 20,
  },

  elem: {
    borderBottomWidth: 1,
    borderColor: Constants.DARK_RED,
    paddingTop: 15,
    height: 50,

  },

  text: {
    fontSize: 20,
    paddingLeft: 10,
    textAlignVertical: 'center'
  }


});

export default PopUpList;
