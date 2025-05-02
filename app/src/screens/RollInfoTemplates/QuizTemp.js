import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as Constants from '../../utilities/constants';

const QuizTemp = ({ navigation }) => {

  const [] = useFonts({
      CustomFont: require("../../../assets/fonts/Roboto_Condensed-Bold.ttf"),
    });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.question}>How old are you?</Text>
      <View style={styles.button_list}>
        <TouchableOpacity
          style={styles.button}
          title="Press me"
          onPress={() => Alert.alert("Okay")}
        >
          <Text style={styles.button_text}>{"<18"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          title="Press me"gareev
          onPress={() => Alert.alert("okay")}
        >
          <Text style={styles.button_text}>{">18"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.buttonSubmit}
        onPress={() => navigation.navigate("UploadTemp")}
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

    button_list: {
        marginTop: 180,
    
    },

    button_text: {
        fontFamily: "CustomFont",
        fontSize: 20,

    },

    button: {
        borderWidth: 2,
        height: 50,
        width: 250,
        borderRadius: 30,
        marginBottom: 10,
        borderColor: Constants.DEFAULT_ORANGE,
        justifyContent: 'center',
        alignItems: 'center',
    },

    question: {
        fontFamily: "CustomFont",
        fontSize: 30,
        top: '10%'

    },

    buttonSubmit: {
        width: 100,
        height: 70,
        borderRadius: 30,
        top: "80%",
        position: 'absolute',
        backgroundColor: Constants.DEFAULT_ORANGE,
        alignItems: "center",
        justifyContent: "center",
      },

});

export default QuizTemp;

