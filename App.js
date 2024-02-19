import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Add' component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

