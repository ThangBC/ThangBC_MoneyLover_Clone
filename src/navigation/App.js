import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
<<<<<<< HEAD
import {RegisterScreen} from '../features/';
=======
import {
  HelloScreen,
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  AddTransactionScreen,
  ShowDetailTransScreen,
  EditTransactionScreen,
} from '../features/';
import UITab from './UITab';
>>>>>>> 0c89ede5586fd64fc648a73fc181ab37fae9f331

const Stack = createNativeStackNavigator();

const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="RegisterScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
<<<<<<< HEAD
=======
        <Stack.Screen name="UITab" component={UITab} />
        <Stack.Screen
          name="ShowDetailTransScreen"
          component={ShowDetailTransScreen}
        />
        <Stack.Screen
          name="EditTransactionScreen"
          component={EditTransactionScreen}
        />
>>>>>>> 0c89ede5586fd64fc648a73fc181ab37fae9f331
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
