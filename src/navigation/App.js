import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HelloScreen,
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  AddTransactionScreen,
} from '../features/';
import UITab from './UITab';

const Stack = createNativeStackNavigator();

const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UITab"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HelloScreen" component={HelloScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="UITab" component={UITab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
