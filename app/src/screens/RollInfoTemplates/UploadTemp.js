import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as Constants from '../../utilities/constants';
import * as DocumentPicker from 'expo-document-picker';


const UploadTemp = ({ navigation }) => {

  const [BlobFile, setBlobFile] = useState();
  const [FileName, setFileName] = useState('');
  const [IsUpload, setIsUpload] = useState(false);
  const [] = useFonts({
    CustomFont: require("../../../assets/fonts/Roboto_Condensed-Bold.ttf"),
  });

  const pickDocument = async () => {

    let result = await DocumentPicker.getDocumentAsync({})
    console.log(result);
    if (result != null){
      const r = await fetch(result.uri)
      const b = await r.blob();
      setFileName(result.name)
      setBlobFile(b);
      setIsUpload(true)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.question}>Upload Template</Text>
      <TouchableOpacity style={styles.upload} onPress={pickDocument}>
        {IsUpload ? <MaterialCommunityIcons name="file" size={35} color={Constants.DEFAULT_ORANGE} /> : <MaterialIcons name="file-upload" size={35} color={Constants.DEFAULT_ORANGE} />}
        <Text style={styles.text}>Upload pdf file</Text>
      </TouchableOpacity>

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
        alignItems: 'center',
        flexDirection: 'column',

    },

    text: {
      alignSelf: 'center',
      
      
    },

    upload: {

      flexDirection: "row",
      position: 'relative',
      marginTop: 50,

    },

    question: {
        fontFamily: "CustomFont",
        fontSize: 30,
   

    },

    button: {
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

export default UploadTemp;

