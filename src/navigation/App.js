import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
<<<<<<< HEAD

=======
import {
  HelloScreen,
  LoginScreen,
  RegisterScreen,
  ShowDetailTransScreen,
  EditTransactionScreen,
} from '../features/';
>>>>>>> 42bf10897d4d2a5e4a2876618bab417ef824cf07
import UITab from './UITab';
import codePush from 'react-native-code-push';

const Stack = createNativeStackNavigator();

const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UITab"
        screenOptions={{headerShown: false}}>
<<<<<<< HEAD
=======
        <Stack.Screen name="HelloScreen" component={HelloScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
>>>>>>> 42bf10897d4d2a5e4a2876618bab417ef824cf07
        <Stack.Screen name="UITab" component={UITab} />
        <Stack.Screen
          name="ShowDetailTransScreen"
          component={ShowDetailTransScreen}
        />
        <Stack.Screen
          name="EditTransactionScreen"
          component={EditTransactionScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default codePush(App);
