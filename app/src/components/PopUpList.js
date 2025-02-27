import React, { useState } from 'react';
import { FlatList, SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DataBase from '../utilities/data';
import * as Constants from '../utilities/constants';
import Maps from './Maps';



const Item = ({name, location}) => { 
  console.log(location);

  return (
    <TouchableOpacity onPress={() => Maps(location)} style={styles.elem}>
        <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>)
};

const PopUpList = ({ state }) => {
  if (!state){
    return null;
  }
  else{
    return (
      <View style={styles.popUpList}>
        <FlatList 
          data={DataBase}
          renderItem={({ item }) => <Item name={item.name} location={item.location} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
  
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
