import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HelloScreen} from '../features/';

const Stack = createNativeStackNavigator();

const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HelloScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HelloScreen" component={HelloScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
