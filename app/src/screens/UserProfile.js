import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font'
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Constants from '../utilities/constants';


const UserProfile = ( {navigation} ) => {

    const [] = useFonts({
        'CustomFont': require('../../assets/fonts/PlayfairDisplay-Bold.ttf'),
    });

    let ProfileName = "John Doe"
    let ProfileStatus = "This is an example bio"
    let ProfileRole = "Profile Role"
    let ProfileFav = "List of favourite shelters"
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.profile_image}
            source={require("../../assets/images/profile_image.jpeg")}
          />
          <Text style={styles.name}>{ProfileName}</Text>
          <View style={styles.settingsButton}>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Ionicons
                name="settings-outline"
                size={40}
                color={Constants.DARK_RED}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.body} indicatorStyle="white">
          <Text style={styles.title}>Status:</Text>
          <Text style={styles.text}>{ProfileStatus}</Text>
          <Text style={styles.title}>Role:</Text>
          <Text style={styles.text}>{ProfileRole}</Text>
          <Text style={styles.title}>Favourite Shelters:</Text>
          <Text style={styles.text}>{ProfileFav}</Text>
        </ScrollView>
      </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        flex: 1,
    },
    settingsButton: {
        position: 'absolute',
        right: 20,
        top: 20,
    },

    body: {
        width: '100%',
        paddingHorizontal: 20,
        
    },
    header: {
        padding: 20,
        width: '100%',
        backgroundColor: "#ff7f09",
    },
    buttons: {
        alignItems: 'center'
    },
    title: {
        marginBottom: 5,
        paddingTop: 40, 
        fontSize: 24,
        fontWeight: "bold",
        color: "#ff7f09",
    },

    text: {
        marginBottom: 75,
        fontSize: 20,
        fontWeight: 500,
        color: 'black',
        paddingTop: 5,
    },

    name: {
        fontSize: 30,
        color: "black",
        paddingTop: 10,
        fontFamily: 'CustomFont',
    },

    profile_image: {
        marginTop: 10,
        width: 120,        
        height: 120,     
        borderRadius: 50,  
        alignSelf: 'left',
        resizeMode: 'cover' 
      }
});
export default UserProfile;