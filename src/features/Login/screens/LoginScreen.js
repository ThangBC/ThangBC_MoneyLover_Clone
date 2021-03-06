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
import {UILoading} from '../../../components/';

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
  const [isModalVisible, setModalVisible] = useState(false);
  const [disable, setDisable] = useState(false);

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
    setModalVisible(true);
    setDisable(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
        setModalVisible(false);
        setDisable(false);
        navigate('UITab');
      })
      .catch(err => {
        setModalVisible(false);
        setDisable(false);
        switch (err.code) {
          case 'auth/too-many-requests':
            alert('B???n ????ng nh???p qu?? nhi???u, h??y th??? l???i sau');
            break;
          case 'auth/wrong-password':
            alert('Sai m???t kh???u');
            break;
          case 'auth/user-not-found':
            alert('Ng?????i d??ng kh??ng t???n t???i, h??y ????ng k??');
            break;
          default:
            alert('C?? l???i x???y ra, h??y th??? l???i sau');
        }
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
        <Text style={styles.loginTitle}>????ng nh???p</Text>
        <View //---------LOGIN_GOOGLE-----------
          style={styles.loginGoogleView}>
          <TouchableOpacity
            onPress={() => {
              alert('T??nh n??ng ??ang ???????c ph??t tri???n');
            }}
            style={styles.loginGoogleBtn}>
            <Image
              source={require('../../../assets/google_logo.png')}
              style={styles.googleLogo}
            />
            <Text style={styles.loginGoogleText}>K???t n???i v???i Google</Text>
          </TouchableOpacity>
          <Text style={styles.permissionText}>
            Ch??ng t??i s??? kh??ng ????ng th??ng tin m?? kh??ng c?? s??? cho ph??p c???a b???n
          </Text>
        </View>
        <View style={styles.lineView}>
          <View style={styles.line} />
          <Text style={styles.lineText}>HO???C</Text>
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
              placeholder="M???t kh???u"
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
            disabled={!isValidLogin(disable, email, password)}
            onPress={handleLogin}
            style={[
              styles.loginBtn,
              {
                backgroundColor: isValidLogin(disable, email, password)
                  ? colors.primaryColor
                  : colors.blurColorBlack2,
              },
            ]}>
            <Text
              style={[
                styles.loginBtnText,
                {
                  color: isValidLogin(disable, email, password)
                    ? 'white'
                    : 'gray',
                },
              ]}>
              ????ng nh???p
            </Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <TouchableOpacity
              onPress={() => {
                navigate('RegisterScreen');
              }}>
              <Text style={styles.resBtn}>????ng k??</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                alert('T??nh n??ng ??ang ???????c ph??t tri???n');
              }}>
              <Text style={styles.forgotPassBtn}>Qu??n m???t kh???u ?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <UILoading isModalVisible={isModalVisible} />
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
