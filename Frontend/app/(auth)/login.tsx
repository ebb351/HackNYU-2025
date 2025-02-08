import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, Pressable } from 'react-native';
import { View, Text } from '@/components/Themed';
import { useAuth } from '../../utils/authenticationManager';
import { supabase } from '@/utils/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useAuth(); // The auth manager listens to onAuthStateChange

  // Sign in an existing user with email and password
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert('Sign In Error', error.message);
    } else {
      console.log('Signed in successfully');
      // No need to manually setIsAuthenticated; the auth listener in your auth manager will handle it.
    }
  };

  // Sign up a new user with email and password
  const handleSignUp = async () => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      Alert.alert('Sign Up Error', error.message);
    } else {
      if (data.session) {
        // If your Supabase configuration automatically confirms sign-ups,
        // a session may be returned right away.
        Alert.alert('Sign Up Success', 'Account created and signed in.');
      } else {
        Alert.alert(
          'Sign Up Success',
          'Account created. Please check your email for confirmation instructions.'
        );
      }
    }
  };

  // Optional mock login for testing purposes
  const handleMock = async () => {
    console.log('Login attempt with mock credentials');
    setEmail('test@example.com');
    setPassword('password123');
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAuthenticated(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login / Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      {/* Optional mock button */}
      <Pressable style={styles.button} onPress={handleMock}>
        <Text style={styles.buttonText}>Mock</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
