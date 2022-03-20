import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HelloScreen,
  LoginScreen,
  RegisterScreen,
  ShowDetailTransScreen,
  EditTransactionScreen,
  AddWalletScreen,
} from '../features/';
import UITab from './UITab';
import codePush from 'react-native-code-push';

const Stack = createNativeStackNavigator();

const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AddWalletScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HelloScreen" component={HelloScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="AddWalletScreen" component={AddWalletScreen} />
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
