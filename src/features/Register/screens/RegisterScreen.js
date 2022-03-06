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

const RegisterScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  const [hidePass, setHidePass] = useState(true);
  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <ScrollView>
        <View //---------ICON_BACK-----------
          style={{flexDirection: 'row'}}>
          <Icon
            onPress={() => {
              navigate('HelloScreen');
            }}
            name="arrow-left"
            size={25}
            color="black"
            style={{padding: 10}}
          />
        </View>
        <Text
          style={{color: 'black', fontSize: fontSizes.h1, alignSelf: 'center'}}>
          Đăng ký
        </Text>
        <View //---------LOGIN_GOOGLE-----------
          style={{width: '70%', alignSelf: 'center', marginTop: 15}}>
          <TouchableOpacity
            onPress={() => {
              alert('Tính năng đang được phát triển');
            }}
            style={{
              flexDirection: 'row',
              borderColor: '#EB4132',
              borderWidth: 1,
              alignItems: 'center',
              height: 40,
              borderRadius: 7,
            }}>
            <Image
              source={require('../../../assets/google_logo.png')}
              style={{width: 20, height: 20, marginLeft: 10, marginRight: 20}}
            />
            <Text
              style={{
                color: '#EB4132',
                fontSize: fontSizes.h3,
              }}>
              Kết nối với Google
            </Text>
          </TouchableOpacity>
          <Text style={{color: 'gray', textAlign: 'center', marginTop: 15}}>
            Chúng tôi sẽ không đăng thông tin mà không có sự cho phép của bạn
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <View style={{backgroundColor: 'gray', height: 1, flex: 1}} />
          <Text
            style={{
              color: 'gray',
              fontSize: fontSizes.h3,
              fontWeight: 'bold',
              marginHorizontal: 7,
            }}>
            HOẶC
          </Text>
          <View style={{backgroundColor: 'gray', height: 1, flex: 1}} />
        </View>
        <View //---------REGISTER_EMAIL&PASSWORD-----------
          style={{width: '70%', alignSelf: 'center', marginTop: 30}}>
          <TextInput
            style={{
              backgroundColor: colors.blurColorBlack,
              fontSize: fontSizes.h3,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: 10,
              color: 'black',
            }}
            placeholder="Email"
            placeholderTextColor={'gray'}
          />
          <View style={{backgroundColor: 'gray', height: 1}} />
          <View style={{justifyContent: 'center'}}>
            <TextInput
              style={{
                backgroundColor: colors.blurColorBlack,
                fontSize: fontSizes.h3,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                paddingLeft: 10,
                paddingRight: 40,
                color: 'black',
              }}
              secureTextEntry={hidePass ? true : false}
              placeholder="Mật khẩu"
              placeholderTextColor={'gray'}
            />
            <Icon
              onPress={() => {
                setHidePass(!hidePass);
              }}
              name={hidePass ? 'eye-slash' : 'eye'}
              size={20}
              color={'gray'}
              style={{position: 'absolute', right: 10}}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              navigate('UITab');
            }}
            style={{
              backgroundColor: colors.primaryColor,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Text style={{color: 'white', padding: 10, fontSize: fontSizes.h3}}>
              Đăng ký
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                navigate('LoginScreen');
              }}>
              <Text
                style={{
                  color: colors.primaryColor,
                  marginTop: 10,
                  fontSize: fontSizes.h4,
                }}>
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;