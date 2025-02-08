import { useState } from 'react';
import { StyleSheet, TextInput, Pressable } from 'react-native';
import { View, Text } from '@/components/Themed';
import { useAuth } from '../utils/authenticationManager';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = useAuth();

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Login attempt with:', { email, password });
  };

  const handleMock = async () => {
    // Set mock credentials and authenticate
    console.log('Login attempt with mock');
    setEmail('test@example.com');
    setPassword('password123');
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Update authentication state
    setIsAuthenticated(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
  mockText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  }
});