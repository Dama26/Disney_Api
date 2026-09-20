import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/splashScreen';
import CharacterListScreen from '../screens/characterListScreen';
import DetailScreen from '../screens/detailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: { backgroundColor: '#071322' },
          headerTintColor: '#D8A012',
          headerTitleStyle: { fontWeight: 'bold', color: '#D8A012' },
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={CharacterListScreen} 
          options={{ title: 'Auradon Prep Registry' }} 
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={{ title: 'Expediente del Estudiante' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}