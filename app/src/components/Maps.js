import React, { useRef, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, CalloutSubview } from "react-native-maps";
import { MapPrompts } from './MapPrompts';
import DataBase from '../utilities/data';
import * as Constants from '../utilities/constants';


const styles = StyleSheet.create({
  markerImage: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Constants.DARK_RED,
    padding: 5,
    borderBottomRightRadius: 0.1,
    width: 45,
    height: 45,
  },

  infoWindow: {
    width: 155,
    height: 105,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    marginBottom: 5,
    borderColor: Constants.DARK_RED,
    borderWidth: 0.5,
  },

  headerText: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: "bold",
  },

  subTitle: {
    paddingTop: 5,
    paddingLeft: 5,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: '700',
    
  },

  bodyText: {
    paddingLeft: 5,
    paddingTop: 3,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'normal',
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

//Markers Render
const Markers = DataBase.map(({location, name, id, workHours, link}) => {
  return (
    <Marker key={id} coordinate={location}>
      <Image
            source={require('../../assets/images/Marker_icon.png')}
            style={styles.markerImage}
            resizeMode="contain"
          />
      <Callout tooltip={true}>
        <View style={styles.infoWindow}>
          <Text style={styles.headerText}>{name}</Text>
          <Text style={styles.subTitle}>Hours:</Text>
          <Text style={styles.bodyText}>{workHours}</Text>
          <Text style={styles.subTitle}>Website:</Text>
          <Text style={styles.bodyText}>{link}</Text>
        </View>
      </Callout>
    </Marker>
  )
});
////////////////////

const Maps = () => {
  const { prompts } = useContext(MapPrompts);
  const mapReference = useRef(null);
  
  console.log("user-location", prompts.UserRegion)
  console.log("destination", prompts.DestinationRegion)

  const mapRegion = prompts.DestinationRegion.latitude
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
    if (prompts.DestinationRegion.latitude) {
      animateToDestination(prompts.DestinationRegion);
    }
  }, [prompts.DestinationRegion]);

  useEffect(() => {
    if (prompts.UserRegion.latitude) {
      animateToDestination(prompts.UserRegion);
    }
  }, [prompts.UserRegion]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapReference}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={mapRegion}
        customMapStyle={[
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'transit',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ]}
        showsUserLocation={true}
      >
        {Markers}
      </MapView>
    </View>
  );
};



export default Maps;