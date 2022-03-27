import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {fontSizes, colors} from '../../../constraints';
import {
  isValidLogin,
  validErrorEmail,
  validErrorPass,
} from '../components/validationLogin';
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
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

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
      console.log(error);
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View //---------ICON_BACK-----------
          style={styles.iconBackView}>
          <Icon
            onPress={() => {
              navigate('HelloScreen');
            }}
            name="arrow-left"
            size={25}
            color="black"
            style={styles.iconBack}
          />
        </View>
        <Text style={styles.loginTitle}>Đăng nhập</Text>
        <View //---------LOGIN_GOOGLE-----------
          style={styles.loginGoogleView}>
          <TouchableOpacity
            onPress={() => {
              alert('Tính năng đang được phát triển');
            }}
            style={styles.loginGoogleBtn}>
            <Image
              source={require('../../../assets/google_logo.png')}
              style={styles.googleLogo}
            />
            <Text style={styles.loginGoogleText}>Kết nối với Google</Text>
          </TouchableOpacity>
          <Text style={styles.permissionText}>
            Chúng tôi sẽ không đăng thông tin mà không có sự cho phép của bạn
          </Text>
        </View>
        <View style={styles.lineView}>
          <View style={styles.line} />
          <Text style={styles.lineText}>HOẶC</Text>
          <View style={styles.line} />
        </View>
        <View //---------LOGIN_EMAIL&PASSWORD-----------
          style={styles.loginInputView}>
          <TextInput
            onFocus={() => {
              setFocusEmail(true);
            }}
            onBlur={() => {
              setFocusEmail(false);
            }}
            style={styles.emailInput}
            placeholder="Email"
            placeholderTextColor={focusEmail ? colors.primaryColor : 'gray'}
            value={email}
            onChangeText={textEmail => {
              setErrorEmail(validErrorEmail(textEmail));
              setEmail(textEmail);
            }}
          />
          <View
            style={[
              styles.emailInputUnderline,
              {
                backgroundColor: focusEmail ? colors.primaryColor : 'gray',
              },
            ]}
          />
          {errorEmail != '' ? (
            <Text style={styles.errorText}>{errorEmail}</Text>
          ) : (
            <View />
          )}
          <View style={styles.loginInputPassView}>
            <TextInput
              onFocus={() => {
                setFocusPass(true);
              }}
              onBlur={() => {
                setFocusPass(false);
              }}
              style={styles.passInput}
              secureTextEntry={hidePass ? true : false}
              placeholder="Mật khẩu"
              placeholderTextColor={focusPass ? colors.primaryColor : 'gray'}
              value={password}
              onChangeText={textPassword => {
                setErrorPassword(validErrorPass(textPassword));
                setPassword(textPassword);
              }}
            />
            <Icon
              onPress={() => {
                setHidePass(!hidePass);
              }}
              name={hidePass ? 'eye-slash' : 'eye'}
              size={20}
              color={focusPass ? colors.primaryColor : 'gray'}
              style={styles.iconShowPass}
            />
            <View
              style={[
                styles.passInputUnderline,
                {
                  backgroundColor: focusPass ? colors.primaryColor : 'gray',
                },
              ]}
            />
            {errorPassword != '' ? (
              <Text style={styles.errorText}>{errorPassword}</Text>
            ) : (
              <View />
            )}
          </View>

          <TouchableOpacity
            disabled={!isValidLogin(email, password)}
            onPress={handleLogin}
            style={[
              styles.loginBtn,
              {
                backgroundColor: isValidLogin(email, password)
                  ? colors.primaryColor
                  : colors.blurColorBlack2,
              },
            ]}>
            <Text
              style={[
                styles.loginBtnText,
                {
                  color: isValidLogin(email, password) ? 'white' : 'gray',
                },
              ]}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <TouchableOpacity
              onPress={() => {
                navigate('RegisterScreen');
              }}>
              <Text style={styles.resBtn}>Đăng ký</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                alert('Tính năng đang được phát triển');
              }}>
              <Text style={styles.forgotPassBtn}>Quên mật khẩu ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  iconBackView: {flexDirection: 'row'},
  iconBack: {padding: 10},
  loginTitle: {color: 'black', fontSize: fontSizes.h1, alignSelf: 'center'},
  loginGoogleView: {width: '90%', alignSelf: 'center', marginTop: 15},
  loginGoogleBtn: {
    backgroundColor: colors.blurColorBlack2,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 7,
    justifyContent: 'center',
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 20,
    position: 'absolute',
    left: 5,
  },
  loginGoogleText: {
    color: '#EB4132',
    fontSize: fontSizes.h3,
  },
  permissionText: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 15,
    fontSize: fontSizes.h6,
  },
  lineView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  line: {backgroundColor: 'gray', height: 1, flex: 1},
  lineText: {
    color: 'gray',
    fontSize: fontSizes.h3,
    fontWeight: 'bold',
    marginHorizontal: 7,
  },
  loginInputView: {width: '90%', alignSelf: 'center', marginTop: 20},
  emailInput: {
    fontSize: fontSizes.h3,
    paddingHorizontal: 10,
    color: 'black',
    marginTop: 10,
  },
  emailInputUnderline: {
    height: 2,
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
    fontSize: fontSizes.h5,
  },
  loginInputPassView: {
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  passInput: {
    fontSize: fontSizes.h3,
    paddingLeft: 10,
    paddingRight: 40,
    color: 'black',
  },
  iconShowPass: {position: 'absolute', right: 10},
  passInputUnderline: {
    height: 2,
  },
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  loginBtnText: {
    padding: 10,
    fontSize: fontSizes.h3,
  },
  footerView: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  resBtn: {
    color: colors.primaryColor,
    marginTop: 10,
    fontSize: fontSizes.h4,
    alignSelf: 'center',
  },
  forgotPassBtn: {
    color: colors.primaryColor,
    marginTop: 10,
    fontSize: fontSizes.h4,
    alignSelf: 'center',
  },
});

export default LoginScreen;
