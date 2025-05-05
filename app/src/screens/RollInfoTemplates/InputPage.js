import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Constants from '../../utilities/constants';
import { auth, db } from '../../../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { format } from "date-fns";


const QuizTemp = ({ navigation }) => {

  const [] = useFonts({
      CustomFont: require("../../../assets/fonts/Roboto_Condensed-Bold.ttf"),
    });

  const [shelterName, setShelterName] = useState("");
  const [animalCapacity, setAnimalCapacity] = useState(null);
  const [startHours, setStartHours] = useState(new Date());
  const [endHours, setEndHours] = useState(new Date());
  const [phoneNumber, setPhoneNumber] = useState("");


  const onChangeStartTime = (e, selectedTime) => {
    setStartHours(selectedTime);
  };

  const onChangeFinishTime = (e, selectedTime) => {
    setEndHours(selectedTime);
  };

  const UpdateDate = async () => {
    if (
      shelterName != "" &&
      animalCapacity != null &&
      startHours != new Date() &&
      endHours != new Date() &&
      phoneNumber != ""
    ) {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("Not signed in");

        const colRef = collection(db, "users", user.uid, "Shelter Information");
        const startTime = format(startHours, "hh:mm a");
        const endTime = format(endHours, "hh:mm a");
        await addDoc(colRef, {
          animalCapacity: Number(animalCapacity) || null,
          startHours: startTime,
          endHours: endTime,
          phoneNumber,
        });

        console.log("Shelter data has been recorded");
        navigation.navigate("QuizTemp");
      } catch (error) {
        Alert.alert("Error. Please try again.");
      }
    }
    else {
      Alert.alert("Please fill out all the information")
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.question}>Tell us more about your shelter 📝</Text>
      <View style={styles.button_list}>
        <Text style={styles.title}>Shelter's name</Text>
        <TextInput
          style={styles.input}
          value={shelterName}
          onChangeText={setShelterName}
          autoCapitalize="none"
        />
        <Text style={styles.title}>Animal capacity</Text>
        <TextInput
          style={styles.input}
          value={animalCapacity}
          onChangeText={setAnimalCapacity}
          autoCapitalize="none"
        />
        <Text style={styles.title}>Work Hours</Text>
        <View style={styles.workHours}>
        <DateTimePicker
          value={startHours}
          mode={"time"}
          is24Hour={true}
          accentColor={Constants.DEFAULT_ORANGE}
          onChange={onChangeStartTime}
          style={{marginHorizontal: 8}}
        />
        <Text style={{fontSize: 18}}>-</Text>
        <DateTimePicker
          value={endHours}
          mode={"time"}
          is24Hour={true}
          accentColor={Constants.DEFAULT_ORANGE}
          onChange={onChangeFinishTime}
          style={{marginHorizontal: 6}}
        />
        </View>
        <Text style={styles.title}>Phone number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="(555) 555‑1234"
          keyboardType="phone-pad"
          returnKeyType="done"
          maxLength={18}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
        style={styles.buttonSubmit}
        onPress={UpdateDate}
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
    alignItems: "center",
  },


  workHours: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  
  },

  title: {
    fontSize: 15,
    marginBottom: 5,
    marginLeft: 15,
    fontFamily: 'CustomFont',
  },

  input: {
    borderWidth: 2,
    height: 50,
    width: 300,
    borderRadius: 30,
    marginBottom: 10,
    paddingLeft: 15,
    borderColor: Constants.DEFAULT_ORANGE,
    justifyContent: "center",
    alignItems: "center",
  },

  button_list: {
    marginTop: 80,
  },

  button_text: {
    fontFamily: "CustomFont",
    fontSize: 20,
  },

  question: {
    fontFamily: "CustomFont",
    fontSize: 26,
    top: "5%",
    textAlign: 'center',
    
  },

  buttonSubmit: {
    width: 100,
    height: 70,
    borderRadius: 30,
    top: "90%",
    position: "absolute",
    backgroundColor: Constants.DEFAULT_ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default QuizTemp;

