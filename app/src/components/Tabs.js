import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native'

import SheltersMenu from '../screens/SheltersMenu'
import AboutUs from '../screens/AboutUs'
import Menu from '../screens/Menu'
import VolunteeringPage from '../screens/VolunteeringPage'
import UserProfile from '../screens/UserProfile';

const Tab = createBottomTabNavigator();


const Tabs = () => {
    return (
      <Tab.Navigator 
        initialRouteName="Menu"
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {height: 55, paddingTop: 10},
        }}
      >
        <Tab.Screen
          name={"VolunteeringPage"}
          component={VolunteeringPage}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={
                    focused
                      ? require("../../assets/images/VolunteeringPage_icon.png")
                      : require("../../assets/images/VolunteeringPage_icon.png")
                  }
                  style={focused ? {  width: 45, height: 45 } : {  width: 40, height: 40 }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={"SheltersMenu"}
          component={SheltersMenu}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={
                    focused
                      ? require("../../assets/images/SheltersMenu_icon.png")
                      : require("../../assets/images/SheltersMenu_icon.png")
                  }
                  style={focused ? {  width: 45, height: 45 } : {  width: 40, height: 40 }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={"Menu"}
          component={Menu}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={
                    focused
                      ? require("../../assets/images/Menu_icon.png")
                      : require("../../assets/images/Menu_icon.png")
                  }
                  style={focused ? {  width: 45, height: 45 } : {  width: 40, height: 40 }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={"AboutUs"}
          component={AboutUs}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={
                    focused
                      ? require("../../assets/images/AboutUs_icon.png")
                      : require("../../assets/images/AboutUs_icon.png")
                  }
                  style={focused ? {  width: 45, height: 45 } : {  width: 40, height: 40 }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={"UserProfile"}
          component={UserProfile}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={
                    focused
                      ? require("../../assets/images/UserProfile_icon.png")
                      : require("../../assets/images/UserProfile_icon.png")
                  }
                  style={focused ? {  width: 45, height: 45 } : {  width: 40, height: 40 }}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
}

export default Tabs;