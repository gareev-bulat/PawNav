import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Maps from '../components/Maps'
import SearchComponent from "../components/SearchBar";


const Menu = () => {
    return (
      <View style={styles.container}>
        <Maps style={styles.map} />
        <View style={styles.search}>
          <SearchComponent />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
      position: 'absolute',
      zIndex: 1,
      
    },
    search: {
        position: 'absolute',
        width: '100%',
        top: 20,
        zIndex: 2,
    },
})


export default Menu;