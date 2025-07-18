import React from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";


const LocationTemp = ({ navigation }) => {

    const [] = useFonts({
        CustomFont: require("../../../assets/fonts/Roboto_Condensed-Bold.ttf"),
      });

    const Redirection = () => {

       Alert.alert("PLease wait for 3-5 business days for shelter approval")

       navigation.navigate("Tabs", { screen: "UserProfile" })

    }


    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.texts}>
          <Text style={styles.main_text}>Thank you for taking your time!</Text>
          <Text style={styles.sub_text}>
            The app registration application is being processed, track the
            status of the 
          </Text>
          <Text style={styles.sub_text}>
          shelter in your profile.
          </Text>
          <Text style={[styles.sub_text, styles.email]}>
          Feel free to reach out to us for any questions here: admin@gmail.com
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={Redirection}
        >
          <AntDesign size="45" name="arrowright" color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e0f7fa",
        alignItems: 'center',
      
    },

    texts: {

        alignItems: 'center',
        padding: 30,
        paddingBottom: 0,

    },

    email: {
      marginTop: 50,
    },

    main_text: {
        textAlign: 'center',
        fontSize: 24,
        marginTop: 50,
        marginBottom: 100,
       

    },

    sub_text: {

        fontSize: 16,
        textAlign: 'center',

    },

    button: {
        width: 100,
        height: 70,
        borderRadius: 30,
        top: "80%",
        position: 'absolute',
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
      },

});

export default LocationTemp;

