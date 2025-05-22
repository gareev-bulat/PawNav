import { useRef, useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Image, Button, TouchableOpacity, TouchableHighlight} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, CalloutSubview } from "react-native-maps";
import { MapPrompts } from './MapPrompts';
import * as Constants from '../utilities/constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';



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
const Markers = ({ shelters }) => {
  console.log(shelters);
  const navigation = useNavigation();
  return shelters.map(({ shelterLongitude, shelterLatitude, name, id, startHours, endHours }) => {
    const location = {
      latitude: shelterLatitude,
      longitude: shelterLongitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };
    return (
      <Marker
        key={id}
        coordinate={location}
        onCalloutPress={() => navigation.navigate("ShelterProfile", { shelter: { id, name, startHours, endHours, shelterLatitude, shelterLongitude }})}
      >
        <Image
          source={require("../../assets/images/Marker_icon.png")}
          style={styles.markerImage}
          resizeMode="contain"
        />
        <Callout tooltip={true}>
          <View style={styles.infoWindow}>
            <Text style={styles.headerText}>{name}</Text>
            <Text style={styles.subTitle}>Hours:</Text>
            <Text style={styles.bodyText}>
              {startHours} - {endHours}
            </Text>
            
          </View>
        </Callout>
      </Marker>
    );
});
};
///////////////////

const Maps = ( { navigation } ) => {
  const { prompts } = useContext(MapPrompts);
  const mapReference = useRef(null);
  const [shelters, setShelters] = useState([]);
  
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
        shelterLongitude: data.shelterLongitude,
        shelterLatitude: data.shelterLatitude,
      })
    }
    return shelters;
  };

  useEffect(() => {         /////fetch all locations from firebase
    console.log("Starting fetch process...")
    fetchMarkers()
    .then(list => {
      console.log(list);
      setShelters(list);
    })
    .catch(err => console.error(err))

  }, []);

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
        style={styles.map}
        initialRegion={mapRegion}
        showsUserLocation={true}
      >
        <Markers shelters={shelters} />
      </MapView>
    </View>
  );
};



export default Maps;