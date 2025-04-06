import React from 'react';
import { View, StyleSheet } from 'react-native'
import Tabs from './src/components/Tabs';
import { useFonts } from "expo-font";
import Maps from './src/components/Maps'
import SignInPage from './src/screens/SignInPage';
import SignUpPage from './src/screens/SignUpPage';

import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => {
    return (
      <Stack.Navigator
        initialRouteName="SignInPage"
        screenOptions={{ 
          headerShown: false, 
          cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
        }}

      >
        <Stack.Screen name="SignInPage" component={SignInPage} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
      </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
  
})

export default App;

