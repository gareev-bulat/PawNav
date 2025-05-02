import React from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { PROVIDER_GOOGLE, Marker, Callout, CalloutSubview } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as Constants from '../../utilities/constants';


const LocationTemp = ({ navigation }) => {

    const [] = useFonts({
        CustomFont: require("../../../assets/fonts/Roboto_Condensed-Bold.ttf"),
      });


    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.question}>Upload Shelter Location📍</Text>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={[
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ]}
          showsUserLocation={true}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EndPage")}
        >
          <AntDesign size="45" name="arrowright" color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e0f7fa",
        alignItems: 'center',
        flexDirection: 'column',
        
    },

    question: {
        fontFamily: "CustomFont",
        fontSize: 28,
        marginTop: 10,

    },

    map: {
      
      width: '80%',
      height: '60%',
      marginTop: 50,
      borderRadius: 20,
      
    },

    button: {
        width: 100,
        height: 70,
        borderRadius: 30,
        top: "90%",
        position: 'absolute',
        backgroundColor: Constants.DEFAULT_ORANGE,
        alignItems: "center",
        justifyContent: "center",
      },

});

export default LocationTemp;

