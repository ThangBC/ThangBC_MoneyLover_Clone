import React, {useState, useEffect} from 'react';
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
import {fontSizes, colors} from '../../../constraints/';
import {
  isValidRegister,
  validErrorEmail,
  validErrorPass,
} from '../components/validationsRegister';
import {
  auth,
  signInWithCredential,
  GoogleAuthProvider,
  GoogleSignin,
  collection,
  getDocs,
  db,
} from '../../../firebase/firebase';
import {UILoading} from '../../../components/';

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
  const [isModalVisible, setModalVisible] = useState(false);
  const [disable, setDisable] = useState(false);

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

  const checkSignIn = async () => {
    try {
      setModalVisible(true);
      setDisable(true);
      let isExist = false;
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach(doc => {
        if (doc.data().email == email) {
          isExist = true;
        }
      });
      if (isExist) {
        alert('Tài khoản đã tồn tại, hãy đăng nhập!');
      } else {
        setModalVisible(false);
        setDisable(false);
        navigate('AddWalletScreen', {email: email, password: password});
      }
    } catch (error) {
      console.error(error);
      setModalVisible(false);
      setDisable(false);
      alert('Có lỗi xảy ra, hãy thử lại!');
    }
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
        <Text style={styles.titleTextRes}>Đăng ký</Text>
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
        <View //---------REGISTER_EMAIL&PASSWORD-----------
          style={styles.resInputView}>
          <TextInput
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => {
              setFocusEmail(true);
            }}
            onBlur={() => {
              setFocusEmail(false);
            }}
            style={styles.inputEmail}
            placeholder="Email"
            value={email}
            placeholderTextColor={focusEmail ? colors.primaryColor : 'gray'}
            onChangeText={textEmail => {
              setErrorEmail(validErrorEmail(textEmail));
              setEmail(textEmail);
            }}
          />
          <View
            style={[
              styles.inputEmailUnderLine,
              {backgroundColor: focusEmail ? colors.primaryColor : 'gray'},
            ]}
          />
          {errorEmail != '' ? (
            <Text style={styles.errorText}>{errorEmail}</Text>
          ) : (
            <View />
          )}
          <View style={styles.resInputPassView}>
            <TextInput
              onFocus={() => {
                setFocusPass(true);
              }}
              onBlur={() => {
                setFocusPass(false);
              }}
              style={styles.inputPass}
              secureTextEntry={hidePass ? true : false}
              placeholder="Mật khẩu"
              value={password}
              placeholderTextColor={focusPass ? colors.primaryColor : 'gray'}
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
                styles.inputPassUnderline,
                {backgroundColor: focusPass ? colors.primaryColor : 'gray'},
              ]}
            />
            {errorPassword != '' ? (
              <Text style={styles.errorText}>{errorPassword}</Text>
            ) : (
              <View />
            )}
          </View>
          <TouchableOpacity
            disabled={!isValidRegister(disable, email, password)}
            onPress={checkSignIn}
            style={[
              styles.resBtn,
              {
                backgroundColor: isValidRegister(disable, email, password)
                  ? colors.primaryColor
                  : colors.blurColorBlack2,
              },
            ]}>
            <Text
              style={[
                styles.resBtnText,
                {
                  color: isValidRegister(disable, email, password)
                    ? 'white'
                    : 'gray',
                },
              ]}>
              Đăng ký
            </Text>
          </TouchableOpacity>
          <View style={styles.loginBtnView}>
            <TouchableOpacity
              onPress={() => {
                navigate('LoginScreen');
              }}>
              <Text style={styles.loginBtnText}>Đăng nhập</Text>
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
  titleTextRes: {color: 'black', fontSize: fontSizes.h1, alignSelf: 'center'},
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
  resInputView: {width: '90%', alignSelf: 'center', marginTop: 20},
  inputEmail: {
    fontSize: fontSizes.h3,
    paddingHorizontal: 10,
    color: 'black',
    marginTop: 10,
  },
  inputEmailUnderLine: {
    height: 2,
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
    fontSize: fontSizes.h5,
  },
  resInputPassView: {
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  inputPass: {
    fontSize: fontSizes.h3,
    paddingLeft: 10,
    paddingRight: 40,
    color: 'black',
  },
  iconShowPass: {position: 'absolute', right: 10},
  inputPassUnderline: {
    height: 2,
  },
  resBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  resBtnText: {
    padding: 10,
    fontSize: fontSizes.h3,
  },
  loginBtnView: {flexDirection: 'row', alignSelf: 'center'},
  loginBtnText: {
    color: colors.primaryColor,
    marginTop: 10,
    fontSize: fontSizes.h4,
  },
});

export default RegisterScreen;
