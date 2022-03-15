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
import {fontSizes, colors} from '../../../constraints';
import {validateEmail, validatePassword} from '../../../utils/validations';
import {
  auth,
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  GoogleSignin,
} from '../../../firebase/firebase';

const LoginScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  //set error email and password
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  //set email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [hidePass, setHidePass] = useState(true);

  const handleGoogleSignIn = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = GoogleAuthProvider.credential(idToken);

      const res = signInWithCredential(auth, googleCredential);
      res
        .then(user => {
          navigate('UITab');
        })
        .catch(err => {
          alert(err.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
        navigate('UITab');
      })
      .catch(err => {
        alert(err.message);
      });
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
          Đăng nhập
        </Text>
        <View //---------LOGIN_GOOGLE-----------
          style={{width: '70%', alignSelf: 'center', marginTop: 15}}>
          <TouchableOpacity
            onPress={handleGoogleSignIn}
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
        <View //---------LOGIN_EMAIL&PASSWORD-----------
          style={{width: '70%', alignSelf: 'center', marginTop: 20}}>
          {errorEmail != '' ? (
            <Text
              style={{color: 'red', fontSize: fontSizes.h5, marginLeft: 10}}>
              {errorEmail}
            </Text>
          ) : errorPassword != '' ? (
            <Text
              style={{color: 'red', fontSize: fontSizes.h5, marginLeft: 10}}>
              {errorPassword}
            </Text>
          ) : (
            <View />
          )}
          <TextInput
            style={{
              backgroundColor: colors.blurColorBlack,
              fontSize: fontSizes.h3,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingLeft: 10,
              color: 'black',
              marginTop: 10,
            }}
            placeholder="Email"
            placeholderTextColor={'gray'}
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
          <View style={{backgroundColor: 'gray', height: 1}} />
          <View style={{justifyContent: 'center', marginBottom: 10}}>
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
              onChangeText={textPassword => {
                if (textPassword.trim().length == 0) {
                  setErrorPassword('*Vui lòng không để trống mật khẩu');
                } else if (validatePassword(textPassword)) {
                  setErrorPassword('*Vui lòng không nhập ký tự đặc biệt');
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
              color={'gray'}
              style={{position: 'absolute', right: 10}}
            />
          </View>
          <TouchableOpacity
            disabled={email != '' && password != '' ? false : true}
            onPress={handleLogin}
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
              Đăng nhập
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                navigate('RegisterScreen');
              }}>
              <Text
                style={{
                  color: colors.primaryColor,
                  marginTop: 10,
                  fontSize: fontSizes.h4,
                  alignSelf: 'center',
                }}>
                Đăng ký
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                alert('Tính năng đang được phát triển');
              }}>
              <Text
                style={{
                  color: colors.primaryColor,
                  marginTop: 10,
                  fontSize: fontSizes.h4,
                  alignSelf: 'center',
                }}>
                Quên mật khẩu ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
