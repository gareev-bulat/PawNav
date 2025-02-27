import React, { useRef, useEffect} from 'react';
import { View, Text,  StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";




const Maps = ({region}) => {

  //const mapReference = useRef(null);
  

  /*const moveToLocation = (name, location) => {
    console.log(name);
    console.log(location);
    if (mapReference.current) {
      mapReference.current.animateToRegion({
        latitude: 45.95656,
        longitude: -75.19,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
  
      })
    }*/

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          region
        }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Maps;