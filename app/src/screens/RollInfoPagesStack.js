import React from 'react';
import { View, StyleSheet } from 'react-native'



import RollInfoPages from './RollInfoPages'
import QuizTemp from './RollInfoTemplates/QuizTemp'
import LocationTemp from './RollInfoTemplates/LocationTemp'
import UploadTemp from './RollInfoTemplates/UploadTemp'
import EndPage from './RollInfoTemplates/EndPage'

import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';



const Stack = createStackNavigator();


const RollInfoPagesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="RollInfoPages"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
      }}
    >
      <Stack.Screen name="RollInfoPages" component={RollInfoPages} />
      <Stack.Screen name="QuizTemp" component={QuizTemp} />
      <Stack.Screen name="UploadTemp" component={UploadTemp} />
      <Stack.Screen name="LocationTemp" component={LocationTemp} />
      <Stack.Screen name="EndPage" component={EndPage} />
    </Stack.Navigator>
  );
};

export default RollInfoPagesStack;

