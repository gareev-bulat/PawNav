import React from "react";
import { View, StyleSheet } from "react-native";

import RollInfoPages from "./RollInfoPages";
import ImageTemp from "./RollInfoTemplates/ImageTemp";
import LocationTemp from "./RollInfoTemplates/LocationTemp";
import UploadTemp from "./RollInfoTemplates/UploadTemp";
import EndPage from "./RollInfoTemplates/EndPage";
import InputPage from "./RollInfoTemplates/InputPage";

import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

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
      <Stack.Screen name="ImageTemp" component={ImageTemp} />
      <Stack.Screen name="InputPage" component={InputPage} />
      <Stack.Screen name="UploadTemp" component={UploadTemp} />
      <Stack.Screen name="LocationTemp" component={LocationTemp} />
      <Stack.Screen name="EndPage" component={EndPage} />
    </Stack.Navigator>
  );
};

export default RollInfoPagesStack;
