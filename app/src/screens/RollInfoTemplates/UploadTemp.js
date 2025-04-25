import React from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const UploadTemp = ({ navigation }) => {
    const [] = useFonts({
        CustomFont: require("../../../assets/fonts/Roboto_Condensed-Bold.ttf"),
      });


  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.question}>Upload Template</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LocationTemp")}
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
        alignItems: 'center'
    },

    question: {
        fontFamily: "CustomFont",
        fontSize: 30,
        top: '10%'

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

export default UploadTemp;

