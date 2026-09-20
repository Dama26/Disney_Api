import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/auradon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>AURADON PREP</Text>
      <Text style={styles.subtitle}>Listado Oficial de Estudiantes</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={styles.buttonText}>ENTRAR A AURADON</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071322',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D8A012',
    letterSpacing: 2,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#9BB4C9',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D8A012',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#A2753C',
  },
  buttonText: {
    color: '#071322',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});