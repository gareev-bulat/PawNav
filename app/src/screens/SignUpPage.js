import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import Tabs from '../components/Tabs';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Constants from '../utilities/constants';
import { LinearGradient } from 'expo-linear-gradient';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import DropDownPicker from 'react-native-dropdown-picker';
import { auth, db } from '../../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';


const SignUpPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [owner, setOwner] = useState(false);
  const [items, setItems] = useState([
             {label: 'Volunteer', value: 'V'},                  
             {label: 'Shelter administrator', value: 'S'},
               ]);

  const [] = useFonts({'CustomFont': require('../../assets/fonts/PlayfairDisplay-Bold.ttf'),
  });
   
  //firebase - new account
  const handleSignUp = async () => {
    if (!email || !password) {
      setError('Error: Username and password are required.');
      return;
    } 
    try {
      
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
  
      if (owner){
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name: name,
          surname: surname,   
          owner: owner,
          registrationStatus: "Finish registration",   
          createdAt: Date.now(),
        });
      }
      else{
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name: name,
          surname: surname,   
          owner: owner, 
          createdAt: Date.now(),
        });
      }
      setError('');
      alert(`Welcome, ${user.email}!`);
      navigation.navigate('SignInPage');
    } catch (err) {
      setError(err.message);
    }
  };
  //

  return (
    <View style={styles.container}>
      <Image
        style={styles.shelter_image}
        source={require("../../assets/images/Menu_icon.png")}
      />
      <Text style={styles.appname}>PawNav</Text>
      <Text style={styles.title}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.title}>Surname:</Text>
      <TextInput
        style={styles.input}
        placeholder="surname"
        value={surname}
        onChangeText={setSurname}
      />
      {/*<Text style={styles.title}>Position:</Text>
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
      />*/}
      <Text style={styles.title}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />
      <Text style={styles.title}>Password:</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={!passwordVisible}
          textContentType="newPassword"
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Text style={styles.toggleText}>
            {passwordVisible ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      {/*Check box for choosing if shelter owner or not*/}
      <View style={styles.toggleContainer}>
        <BouncyCheckbox
          isChecked={owner}
          size={20}
          fillColor='green'
          style={{alignSelf: 'left'}}
          onPress={() => {
            setOwner(!owner);
          }}
        />
        <Text style={styles.checkboxText}>I manage or own animal shelter</Text>
      </View>
      {/*************************************************/}

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity onPress={handleSignUp}>
        <LinearGradient colors={["#CA3232", "#641919"]} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignInPage")}>
        <Text style={styles.link}>Back to Sign In</Text>
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
    paddingBottom: 40,
    backgroundColor: '#f5f5f5',
  },

  toggleContainer: {
    flexDirection: 'row',
  },

  checkboxText: {
    margin: 3,
  },

  appname: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 40,
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
    marginBottom: 40,
    width: 100,
    height: 100,
    resizeMode: 'contain'
    

  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: Constants.DARK_RED,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    fontFamily: 'CustomFont',
  },
  toggleText: {
    color: '#CA3232',
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'CustomFont',
  },
  
});

export default SignUpPage;