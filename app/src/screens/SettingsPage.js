import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Constants from '../utilities/constants';


const SettingsPage = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.settingsButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="settings-outline"
                size={40}
                color={Constants.DARK_RED}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
            <Text>Body</Text>
        </View>
      </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 20,
    },

    header: {
        height: 100,
        justifyContent: 'center',
        alignItems: "left",
    },

    title: {
        fontSize: 20,
        color: "black",
    },

    settingsButton: {
        position: 'absolute',
        right: 20,
        top: 20,
    },

    body: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'left',
    },

    bodyText: {
        fontSize: 16,
    },

    signOutButton: {

    }

});


export default SettingsPage;