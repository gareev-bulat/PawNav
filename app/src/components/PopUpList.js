import React, { useContext, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DataBase from '../utilities/data';
import * as Constants from '../utilities/constants';
import { MapPrompts } from '../components/MapPrompts';

const PopUpList = ({ isVisible, onItemPress }) => {
  const { setPrompts } = useContext(MapPrompts);

  if (!isVisible) return null;

  return (
    <View style={styles.popUpList}>
      <FlatList
        data={DataBase}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.elem}
            onPress={() => {
              setPrompts((prev) => ({
                ...prev,
                DestinationRegion: item.location,
                Name: item.name,
              }));
              if (onItemPress) onItemPress();
            }}
          >
            <Text style={styles.text}>{item.name}</Text>
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
  text: {
    fontSize: 20,
    paddingLeft: 10,
    textAlignVertical: 'center',
  },
});
