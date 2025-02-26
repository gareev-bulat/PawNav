import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Maps from '../components/Maps'
import SearchComponent from "../components/SearchBar";


const Menu = () => {
    return (
      <View style={styles.container}>
        <SearchComponent style={styles.search}/>
        <Maps />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    search: {
        position: 'absolute',
        zIndex: 2,
    },
   
})


export default Menu;