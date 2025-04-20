import React from 'react';
import { View, StyleSheet } from 'react-native'
import Tabs from './src/components/Tabs';
import { useFonts } from "expo-font";
import Maps from './src/components/Maps'
import SignInPage from './src/screens/SignInPage';
import SignUpPage from './src/screens/SignUpPage';
import SettingsPage from './src/screens/SettingsPage';
import UserProfile from './src/screens/UserProfile';
import ShelterProfile from './src/screens/ShelterProfile';
import RollInfoPages from './src/screens/RollInfoPages'


import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SheltersMenu from './src/screens/SheltersMenu';


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
        <Stack.Screen name="SheltersMenu" component={SheltersMenu} />
        <Stack.Screen name="ShelterProfile" component={ShelterProfile} options={{presentation: 'modal'}}/>
        <Stack.Screen name="SignInPage" component={SignInPage} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="RollInfoPages" component={RollInfoPages} options={{presentation: 'modal'}}/>
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureDirection: 'horizontal-inverted',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsPage}
          options={{
            presentation: 'modal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, 
          }}
        />
      </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
  
})

export default App;

