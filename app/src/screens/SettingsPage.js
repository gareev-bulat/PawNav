import React from "react";
import { View, Text, StyleSheet, SectionList, SafeAreaView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Constants from '../utilities/constants';

const DATA = [
  {
    title: 'First name',
    data: ['First name'],
  },
  {
    title: 'Last name',
    data: ['Last name'],
  },
  {
    title: 'Status',
    data: ['Status'],
  },
  {
    title: 'Role',
    data: ['Role'],
  },
];

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
            <SectionList
              sections={DATA}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => (
                <View style={styles.item}>
                  <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={styles.title_item}>{item}</Text>
                  <AntDesign name="arrowright" size={30} color={Constants.DARK_RED} />
                  </TouchableOpacity>
                </View>
              )}
              renderSectionHeader={({section: {title}}) => (
                <Text style={styles.header_item}>{title}</Text>
              )}
            />
            <TouchableOpacity onPress={() => navigation.navigate("SignInPage")} style={{flexDirection: 'row'}}>
              <Text style={{marginLeft: 10, marginRight: 10, fontSize: 20, marginBottom: 30 }}>Sign out</Text>
              <Ionicons name="exit-outline" size={24} color="black" />
            </TouchableOpacity>
           
        </View>
      </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
    },

    header_item: {
      fontSize: 28,
      paddingLeft: 10,
      paddingBottom: 5,
      marginTop: 15,
    },

    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      borderRadius: 20,
      marginVertical: 8,
    },

    title_item: {
      fontSize: 20,
      fontWeight: 700,
      color: 'rgb(111, 110, 110)'
    },

    header: {
        height: 100,
        width: '100%',
        backgroundColor: Constants.DEFAULT_ORANGE,
        justifyContent: 'center',
        alignItems: "left",
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "black",
        marginHorizontal: 20, 
    },

    settingsButton: {
        position: 'absolute',
        right: 20,
        top: 20,
    },

    body: {
        flex: 1,
        marginHorizontal: 15,
        marginTop: 20,
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