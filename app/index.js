import React from 'react';
import Tabs from './src/components/Tabs';
import SignInPage from './src/screens/SignInPage';
import SignUpPage from './src/screens/SignUpPage';
import SettingsPage from './src/screens/SettingsPage';
import ShelterProfile from './src/screens/ShelterProfile';


import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import RollInfoPagesStack from './src/screens/RollInfoPagesStack';


const RootStack = createStackNavigator();  // main navigation of the app


const App = () => {
    return (
      <RootStack.Navigator
        initialRouteName="SignInPage"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
        }}
      >
        {/*Main navigation*/}
        <RootStack.Screen name="SignUpPage" component={SignUpPage} />
        <RootStack.Screen name="SignInPage" component={SignInPage} />
        <RootStack.Screen name="Tabs" component={Tabs} />


        {/*Additional modal navigation*/}
        <RootStack.Group screenOptions={{ presentation: "modal" }}>
          <RootStack.Screen
            name="RollInfoPagesStack"
            component={RollInfoPagesStack}
          />
          <RootStack.Screen
            name="Settings"
            component={SettingsPage}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureDirection: "horizontal",
            }}
          />
          <RootStack.Screen name="ShelterProfile" component={ShelterProfile} />
        </RootStack.Group>
      </RootStack.Navigator>
    );
}


export default App;

