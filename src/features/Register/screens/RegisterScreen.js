import React, {useState, useEffect} from 'react';
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
import {validateEmail, validatePassword} from '../../../utils/validations';
import {
  auth,
  signInWithCredential,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GoogleSignin,
} from '../../../firebase/firebase';

const RegisterScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  //set text input email & password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //set text error email & password
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [hidePass, setHidePass] = useState(true);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = GoogleAuthProvider.credential(idToken);

      // navigate('AddWalletScreen', {
      //   googleCredential: googleCredential,
      // });

      console.log((await signInWithCredential(auth, googleCredential)).user);

      // const res = signInWithCredential(auth, googleCredential);
      // res
      //   .then(user => {
      //     navigate('UITab');
      //   })
      //   .catch(err => {
      //     alert(err.message);
      //   });
    } catch (error) {
      console.log(error);
    }
  };

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
          style={{width: '90%', alignSelf: 'center', marginTop: 15}}>
          <TouchableOpacity
            onPress={handleGoogleSignIn}
            style={{
              backgroundColor: colors.blurColorBlack2,
              flexDirection: 'row',
              alignItems: 'center',
              height: 40,
              borderRadius: 7,
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../../assets/google_logo.png')}
              style={{
                width: 20,
                height: 20,
                marginLeft: 10,
                marginRight: 20,
                position: 'absolute',
                left: 5,
              }}
            />
            <Text
              style={{
                color: '#EB4132',
                fontSize: fontSizes.h3,
              }}>
              Kết nối với Google
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: 'gray',
              textAlign: 'center',
              marginTop: 15,
              fontSize: fontSizes.h6,
            }}>
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
          style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
          <TextInput
            onFocus={() => {
              setFocusEmail(true);
            }}
            onBlur={() => {
              setFocusEmail(false);
            }}
            style={{
              fontSize: fontSizes.h3,
              paddingHorizontal: 10,
              color: 'black',
              marginTop: 10,
            }}
            placeholder="Email"
            placeholderTextColor={focusEmail ? colors.primaryColor : 'gray'}
            onChangeText={textEmail => {
              if (textEmail.trim().length == 0) {
                setErrorEmail('*Vui lòng không để trống Email');
              } else if (!validateEmail(textEmail)) {
                setErrorEmail('*Vui lòng nhập đúng định dạng Email');
              } else {
                setErrorEmail('');
                setEmail(textEmail);
                return;
              }
              setEmail('');
            }}
          />
          <View
            style={{
              backgroundColor: focusEmail ? colors.primaryColor : 'gray',
              height: 2,
            }}
          />
          {errorEmail != '' ? (
            <Text
              style={{
                color: 'red',
                marginLeft: 10,
                fontSize: fontSizes.h5,
              }}>
              {errorEmail}
            </Text>
          ) : (
            <View />
          )}
          <View
            style={{justifyContent: 'center', marginBottom: 10, marginTop: 10}}>
            <TextInput
              onFocus={() => {
                setFocusPass(true);
              }}
              onBlur={() => {
                setFocusPass(false);
              }}
              style={{
                fontSize: fontSizes.h3,
                paddingLeft: 10,
                paddingRight: 40,
                color: 'black',
              }}
              secureTextEntry={hidePass ? true : false}
              placeholder="Mật khẩu"
              placeholderTextColor={focusPass ? colors.primaryColor : 'gray'}
              onChangeText={textPassword => {
                if (textPassword.trim().length == 0) {
                  setErrorPassword('*Vui lòng không để trống mật khẩu');
                } else if (validatePassword(textPassword)) {
                  setErrorPassword('*Vui lòng không nhập những ký tự đặc biệt');
                } else if (
                  textPassword.trim().length < 6 ||
                  textPassword.trim().length > 20
                ) {
                  setErrorPassword('*Vui lòng nhập mật khẩu 6-20 ký tự');
                } else {
                  setErrorPassword('');
                  setPassword(textPassword);
                  return;
                }
                setPassword('');
              }}
            />
            <Icon
              onPress={() => {
                setHidePass(!hidePass);
              }}
              name={hidePass ? 'eye-slash' : 'eye'}
              size={20}
              color={focusPass ? colors.primaryColor : 'gray'}
              style={{position: 'absolute', right: 10}}
            />
            <View
              style={{
                backgroundColor: focusPass ? colors.primaryColor : 'gray',
                height: 2,
              }}
            />
            {errorPassword != '' ? (
              <Text
                style={{
                  color: 'red',
                  marginLeft: 10,
                  fontSize: fontSizes.h5,
                }}>
                {errorPassword}
              </Text>
            ) : (
              <View />
            )}
          </View>

          <TouchableOpacity
            disabled={email != '' && password != '' ? false : true}
            onPress={() => {
              navigate('AddWalletScreen', {email: email, password: password});
            }}
            style={{
              backgroundColor:
                email != '' && password != ''
                  ? colors.primaryColor
                  : colors.blurColorBlack2,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginTop: 10,
            }}>
            <Text
              style={{
                color: email != '' && password != '' ? 'white' : 'gray',
                padding: 10,
                fontSize: fontSizes.h3,
              }}>
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
