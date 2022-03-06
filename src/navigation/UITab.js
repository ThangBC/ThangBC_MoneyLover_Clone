import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {AddTransactionScreen} from '../features/';
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
    </Tab.Navigator>
  );
};

export default UITab;
