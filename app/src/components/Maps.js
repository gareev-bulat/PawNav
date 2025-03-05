import React, { useRef, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { MapPrompts } from './MapPrompts';

const Maps = () => {
  const { prompts } = useContext(MapPrompts);
  const mapReference = useRef(null);
  console.log("user-location", prompts.UserRegion)

  const mapRegion = prompts.DestinationRegion && prompts.DestinationRegion.latitude
      ? prompts.DestinationRegion
      : prompts.UserRegion;

  const animateToDestination = (destination) => {
    if (mapReference.current) {
      mapReference.current.animateCamera(
        {
          center: destination,
          pitch: 0,
          heading: 0,
          altitude: 1500,
          zoom: 14,
        },
        { duration: 3000 }
      );
    }
  };

  useEffect(() => {
    if (prompts.DestinationRegion && prompts.DestinationRegion.latitude) {
      animateToDestination(prompts.DestinationRegion);
    }
  }, [prompts.DestinationRegion]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapReference}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={mapRegion}
        showsUserLocation={true}
      >
        {prompts.DestinationRegion && prompts.DestinationRegion.latitude && (
          <Marker coordinate={prompts.DestinationRegion}>
            <Image
            source={require('../../assets/images/Menu_icon.png')}
            style={styles.markerImage}
            resizeMode="contain"
          />
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  markerImage: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 5,
    borderColor: 'white',
    borderBottomRightRadius: 0.1,
    width: 45,
    height: 45,
  },

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