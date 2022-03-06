import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ProfileScreen} from '../features/';
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name="user"
                  size={20}
                  color={focused ? 'black' : 'gray'}
                />
                <Text
                  style={{
                    color: focused ? 'black' : 'gray',
                    fontSize: fontSizes.h6,
                  }}>
                  Tài khoản
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
