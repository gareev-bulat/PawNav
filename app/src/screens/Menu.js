import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Maps from '../components/Maps'
import SearchComponent from "../components/SearchBar";
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { MapPrompts } from '../components/MapPrompts';
import PopUpList from "../components/PopUpList";


const Menu = () => {


  const [prompts, setPrompts] = useState({
    UserRegion: {},
    DestinationRegion: {}
  });
   
    useEffect(() => {

      const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted"){return;}
        let location = await Location.getCurrentPositionAsync({});
        location.coords.latitudeDelta = 0.05
        location.coords.longitudeDelta = 0.05
        setPrompts(prev => ({ ...prev, UserRegion: location.coords }));
      };

      getLocation();

    }, []);
    return (
      <MapPrompts.Provider value={{prompts, setPrompts}}>
        <View style={styles.container}>
          <Maps style={styles.map} />
          <View style={styles.search}>
            <SearchComponent />
          </View>
          <PopUpList />
        </View>
      </MapPrompts.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
      position: 'absolute',
      zIndex: 1,
      
    },
    search: {
        position: 'absolute',
        width: '100%',
        top: 20,
        zIndex: 2,
    },
})


export default Menu;