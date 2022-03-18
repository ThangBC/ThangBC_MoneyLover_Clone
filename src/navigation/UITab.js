import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {HomeScreen, AddTransactionScreen, ProfileScreen} from '../features/';
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
      <Tab.Screen
        name="AddTransactionScreen"
        component={AddTransactionScreen}
        options={({navigation}) => ({
          tabBarIcon: ({focused, color, size}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.primaryColor,
                  borderRadius: 50,
                }}>
                <Icon
                  name="plus"
                  size={20}
                  color={'white'}
                  style={{marginHorizontal: 12, marginVertical: 10}}
                />
              </View>
            );
          },
          tabBarStyle: {
            display: 'none',
          },
        })}
      />
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
