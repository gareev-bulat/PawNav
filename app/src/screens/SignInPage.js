import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import Tabs from '../components/Tabs';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SignInPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login, setLogin] = useState(false);
  const [] = useFonts({'CustomFont': require('../../assets/fonts/PlayfairDisplay-Bold.ttf'),
  });

  const handleSignIn = () => {
    if (!username || !password) {
      setError('Error: Username and password are required.');
    } else {
      // Simulate a successful sign-in
      setLogin(true);
      setError('');
      alert(`Welcome, ${username}!`);
    }
  };

  if (login){
    return (
        <Tabs />
    )
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.shelter_image}
        source={require("../../assets/images/Menu_icon.png")}
      />
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'CustomFont',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontFamily: 'CustomFont',
  },
  button: {
    width: '100%',
    backgroundColor: '#ff7f09',
    padding: 10,
    borderRadius: 5,
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
    marginBottom: 80,
    width: 100,
    height: 100,
    resizeMode: 'contain'
    

  }
});

export default SignInPage;