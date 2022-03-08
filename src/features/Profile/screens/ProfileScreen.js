import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {fontSizes, colors} from '../../../constraints/';

const ProfileScreen = props => {
  return (
    <View style={{flex: 1}}>
      <View //-----------HEADER----------------
        style={{
          height: 70,
          padding: 10,
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'black', fontSize: fontSizes.h1, marginLeft: 5}}>
          Quản lý tài khoản
        </Text>
      </View>
      <View style={{height: 1, backgroundColor: colors.blurColorBlack2}} />
      <View style={{backgroundColor: 'white', alignItems: 'center'}}>
        <Icon
          name="user-circle"
          size={70}
          color={colors.primaryColor}
          style={{marginTop: 20}}
        />
        <Text style={{color: 'black', fontSize: fontSizes.h3, marginTop: 10}}>
          BUICONGTHANG4821
        </Text>
        <Text
          style={{
            color: 'gray',
            fontSize: fontSizes.h3,
            marginTop: 5,
            marginBottom: 20,
          }}>
          buicongthang4821@gmail.com
        </Text>
      </View>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          marginTop: 50,
          elevation: 2,
        }}>
        <Text style={{color: 'red', fontSize: fontSizes.h2, padding: 10}}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileScreen;
