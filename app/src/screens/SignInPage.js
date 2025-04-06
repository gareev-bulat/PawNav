import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import Tabs from '../components/Tabs';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Constants from '../utilities/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInPage = ({ navigation }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [] = useFonts({'CustomFont': require('../../assets/fonts/PlayfairDisplay-Bold.ttf'),
  });

  const handleSignIn = () => {
    if (!email || !password) {
      setError('Error: Username and password are required.');
      alert(error);
      return;
    } 
    //firebase part (sign in)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
     
      setError('');
      const user = userCredential.user;
      alert(`Welcome, ${user.email}!`);
      navigation.navigate('Tabs'); 
    })
    .catch((err) => {
      setError('Incorrect username or password. Try again!');
      alert(error);
    });
    
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.shelter_image}
        source={require("../../assets/images/Menu_icon.png")}
      />
      <Text style={styles.appname}>PawNav</Text>
      <Text style={styles.title}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Text style={styles.title}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={handleSignIn}>
        <LinearGradient colors={['#CA3232', '#641919']} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpPage')}>
        <Text style={styles.link}>Need an account? Sign Up</Text>
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
    marginBottom: 25,
    fontFamily: 'CustomFont',
  },
  button: {
    width: 180,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
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

export default SignInPage;