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
import {auth, signOut} from '../../../firebase/firebase';

const ProfileScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('HelloScreen');
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const displayName = () => {
    let index = auth.currentUser?.email.indexOf('@');
    return auth.currentUser?.email.substring(0, index).toUpperCase();
  };

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
          {displayName()}
        </Text>
        <Text
          style={{
            color: 'gray',
            fontSize: fontSizes.h3,
            marginTop: 5,
            marginBottom: 20,
          }}>
          {auth.currentUser?.email}
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleSignOut}
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
