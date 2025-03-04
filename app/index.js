import React from 'react';
import { View, StyleSheet } from 'react-native'
import Tabs from './src/components/Tabs';
import { useFonts } from "expo-font";
import Maps from './src/components/Maps'
import SignInPage from './src/screens/SignInPage';

const App = () => {
    return (
      <SignInPage />
    );
}

const styles = StyleSheet.create({
  
})

export default App;


