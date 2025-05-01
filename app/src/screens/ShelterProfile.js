import React from "react";
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity} from "react-native";
import { useFonts } from 'expo-font'
import  Ionicons  from "@expo/vector-icons/Ionicons";
import * as Constants from '../utilities/constants';


const ShelterProfile = ( { navigation } ) => {

  const handleAdoption = () => alert("Adopt!");
  const handleVolunteering = () => alert("Volunteer!");
  const handleDonation = () => alert("Donate!");


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
          <View style={styles.buttonRow}>

          <TouchableOpacity style={[styles.button, styles.button1]} onPress={handleAdoption}>
            <Text style={styles.buttonText}>Adopt a pet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.button2]} onPress={handleVolunteering}>
            <Text style={[styles.buttonText, styles.alternate_font]}>Apply for volunteering</Text>
          </TouchableOpacity>

          
            <TouchableOpacity style={[styles.button, styles.button3]} onPress={handleDonation}>
              <Text style={styles.buttonText}>Make a donation</Text>
            </TouchableOpacity>
          
        </View>
        </View>
        
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="exit-outline" size={35} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
};


const styles = StyleSheet.create({
    wrapper: {
        padding: 15,
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

    container: {
        flex: 1,
        justifyContent: "center",
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
        marginTop: 60,
        position: 'absolute',
        justifyContent: 'flex-start',
        height: '40%',
        width: '100%',
        padding: 15,
        borderRadius: 15,
    },
    buttonRow: {
      flexDirection: 'column',
      marginTop: 15,
  },

  button: {
      
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 20,
      marginBottom: 12,
  },

  button1: {
    backgroundColor: '#ff7f09',

    
},

  button2: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: "#ff7f09"
    
},
  button3: {
    backgroundColor: '#ff7f09',
  
},
  buttonText: {
      color: 'white',
      fontWeight: '600',
      textAlign: 'center',
  },
  alternate_font: {
    color: '#ff7f09',

  }
});

export default ShelterProfile;