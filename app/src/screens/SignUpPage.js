import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import Tabs from '../components/Tabs';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Constants from '../utilities/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import DropDownPicker from 'react-native-dropdown-picker';

const SignUpPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
             {label: 'Volunteer', value: 'V'},                  
             {label: 'Shelter administrator', value: 'S'},
               ]);

  const [] = useFonts({'CustomFont': require('../../assets/fonts/PlayfairDisplay-Bold.ttf'),
  });
   
  //firebase - new account
  const handleSignUp = () => {
    if (!email || !password) {
      setError('Error: Username and password are required.');
      return;
    } 
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
     
      setError('');
      const user = userCredential.user;
      alert(`Welcome, ${user.email}!`);
     
      navigation.navigate('SignInPage'); 
    })
    .catch((error) => {
      setError(error.message);
    });
  };
  //

  return (
    <View style={styles.container}>
      <Image
        style={styles.shelter_image}
        source={require("../../assets/images/Menu_icon.png")}
      />
      <Text style={styles.appname}>PawNav</Text>
      <Text style={styles.title}>Position:</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="position"
        style={{
          borderColor: Constants.DARK_RED,
          borderWidth: 1,
          borderRadius: 15,
          paddingHorizontal: 10,
          marginBottom: 30,
          height: 40,
        }}
        itemStyle={{ height: 60, justifyContent: "center" }}
        dropDownContainerStyle={{
          borderColor: Constants.DARK_RED,
          borderWidth: 1,
        }}
        listItemLabelStyle={{
          fontFamily: 'CustomFont', 
          fontSize: 14,
          color: '#000',
        }}
      />
      <Text style={styles.title}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.title}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity onPress={handleSignUp}>
        <LinearGradient colors={["#CA3232", "#641919"]} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignInPage")}>
        <Text style={styles.link}>Comeback to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#f5f5f5',
  },

  appname: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 50,
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'CustomFont',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Constants.DARK_RED,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontFamily: 'CustomFont',
  },
  button: {
    width: 180,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'CustomFont',
  },
  link: {
    color: '#ff7f09',
    marginTop: 10,
    fontFamily: 'CustomFont',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'CustomFont',
  },
  shelter_image: {
    justifyContent: 'center',
    marginBottom: 50,
    width: 100,
    height: 100,
    resizeMode: 'contain'
    

  }
});

export default SignUpPage;