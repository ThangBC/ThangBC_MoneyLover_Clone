import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {HomeScreen} from '../features/';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, fontSizes} from '../constraints';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
  headerShown: false,
  tabBarShowLabel: false,
});

const UITab = props => {
  return (
    <Tab.Navigator initialRouteName="HomeScreen" screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icon
                  name="wallet"
                  size={20}
                  color={focused ? 'black' : 'gray'}
                />
                <Text
                  style={{
                    color: focused ? 'black' : 'gray',
                    fontSize: fontSizes.h6,
                  }}>
                  Sổ giao dịch
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default UITab;
