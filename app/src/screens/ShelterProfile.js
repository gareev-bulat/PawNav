import React from "react";
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity} from "react-native";
import { useFonts } from 'expo-font'
import  Ionicons  from "@expo/vector-icons/Ionicons";
import * as Constants from '../utilities/constants';


const ShelterProfile = ( { navigation } ) => {


    const [] = useFonts({
        'CustomFont': require('../../assets/fonts/PlayfairDisplay-Bold.ttf'),
      });

    let ShelterName = "NAME"
    let ShelterInformation = "Information"
    let ShelterLocation = "Locations"
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name}>{ShelterName}</Text>
        </View>
        <Image
          style={styles.shelter_image}
          source={require("../../assets/images/animal_shelter_image_profile.webp")}
        />
        <View style={styles.wrapper}>
          <Text style={styles.title}>Information:</Text>
          <Text style={styles.text}>{ShelterInformation}</Text>
          <Text style={styles.title}>Locations:</Text>
          <Text style={styles.text}>{ShelterLocation}</Text>
        </View>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={ () => navigation.goBack()}>
            <Ionicons name="exit-outline" size={35} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
};


const styles = StyleSheet.create({
    wrapper: {
        padding : 15,
        alignItems: "left",
        flex: 1,
    },
    backButton: { 
      position: 'absolute',
      top: 0,
      padding: 20,

    },
    header: {
        padding : 15,
        flex: 1,
        alignItems: "center",
    },
    buttons: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        //backgroundColor: "#ff7f09",
    },
    title: {
        marginBottom: 10,
        paddingTop: 10, 
        fontSize: 24,
        fontWeight: "bold",
        color: "#ff7f09",
    },

    text: {
        marginBottom: 10,
        fontSize: 12,
        fontWeight: 500,
        color: 'black',
        paddingTop: 5,
    },

    name: {
        alignItems: 'center',
        fontSize: 30,
        color: "#ff7f09",
        fontFamily: 'CustomFont',
    },

    shelter_image: {
        top: 0,
        marginTop: 70,
        position: 'absolute',
        justifyContent: 'flex-start',
        height: '40%',
        width: '100%',
    }
});

export default ShelterProfile;