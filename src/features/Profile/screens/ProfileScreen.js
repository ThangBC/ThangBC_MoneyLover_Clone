import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {fontSizes, colors} from '../../../constraints/';
import {
  auth,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleSignin,
  collection,
  doc,
  setDoc,
  db,
  getDocs,
} from '../../../firebase/firebase';
import Modal from 'react-native-modal';
import {validatePassword} from '../../../utils/validations';

const ProfileScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  const [isModalVisible, setModalVisible] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorCurrentPassword, setErrorCurrentPassword] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState('');

  const [hidePassCurrent, setHidePassCurrent] = useState(true);
  const [hidePassNew, setHidePassNew] = useState(true);

  const displayName = () => {
    let index = auth.currentUser?.email.indexOf('@');
    return auth.currentUser?.email.substring(0, index).toUpperCase();
  };

  const setDefaultStates = () => {
    setModalVisible(false);
    setErrorNewPassword('');
    setErrorCurrentPassword('');
    setCurrentPassword('');
    setNewPassword('');
    setHidePassCurrent(true);
    setHidePassNew(true);
  };

  const changePassword = () => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser?.email,
      currentPassword,
    );
    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        updatePassword(auth.currentUser, newPassword)
          .then(() => {
            setDefaultStates();
          })
          .catch(error => {
            alert(error.message);
            console.log(error.message);
          });
      })
      .catch(error => {
        alert(error.message);
        console.log(error.message);
      });
  };

  const handleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      navigate('HelloScreen');
    } catch (error) {
      if (error.message == 'SIGN_IN_REQUIRED') {
        signOut(auth)
          .then(() => {
            navigate('HelloScreen');
          })
          .catch(error => {
            alert(error.message);
          });
      }
    }
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
      <View //-----------------INFORMATION-------------------
        style={{backgroundColor: 'white', alignItems: 'center'}}>
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
        onPress={() => {
          setModalVisible(!isModalVisible);
        }}
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          marginTop: 50,
          elevation: 2,
          display: auth.currentUser?.photoURL ? 'none' : 'flex',
        }}>
        <Text style={{color: 'black', fontSize: fontSizes.h3, padding: 10}}>
          Đổi mật khẩu
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSignOut}
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          marginTop: 30,
          elevation: 2,
        }}>
        <Text style={{color: 'red', fontSize: fontSizes.h2, padding: 10}}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
      <Modal //--------------MODAL-----------------
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        isVisible={isModalVisible}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <Text
            style={{
              color: colors.primaryColor,
              fontSize: fontSizes.h1,
              alignSelf: 'center',
            }}>
            Đổi mật khẩu
          </Text>
          {errorCurrentPassword != '' ? (
            <Text
              style={{
                color: 'red',
                marginLeft: 10,
                fontSize: fontSizes.h5,
              }}>
              {errorCurrentPassword}
            </Text>
          ) : errorNewPassword != '' ? (
            <Text
              style={{
                color: 'red',
                marginLeft: 10,
                fontSize: fontSizes.h5,
              }}>
              {errorNewPassword}
            </Text>
          ) : (
            <View />
          )}
          <View //--------------INPUT CURRENT PASSWORD-----------------
            style={{justifyContent: 'center', marginTop: 10}}>
            <TextInput
              secureTextEntry={hidePassCurrent ? true : false}
              text
              style={{
                backgroundColor: colors.blurColorBlack,
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 40,
                fontSize: fontSizes.h3,
                color: 'black',
              }}
              placeholder={'Nhập mật khẩu cũ'}
              placeholderTextColor={'gray'}
              onChangeText={textPassword => {
                if (textPassword.trim().length == 0) {
                  setErrorCurrentPassword('*Vui lòng không để trống mật khẩu');
                } else if (validatePassword(textPassword)) {
                  setErrorCurrentPassword(
                    '*Vui lòng không nhập những ký tự đặc biệt',
                  );
                } else if (
                  textPassword.trim().length < 6 ||
                  textPassword.trim().length > 20
                ) {
                  setErrorCurrentPassword('*Vui lòng nhập mật khẩu 6-20 ký tự');
                } else {
                  setErrorCurrentPassword('');
                  setCurrentPassword(textPassword);
                  return;
                }
                setCurrentPassword('');
              }}
            />
            <Icon
              onPress={() => {
                setHidePassCurrent(!hidePassCurrent);
              }}
              name={hidePassCurrent ? 'eye-slash' : 'eye'}
              size={20}
              color={'gray'}
              style={{position: 'absolute', right: 10}}
            />
          </View>

          <View //--------------INPUT NEW PASSWORD-----------------
            style={{justifyContent: 'center', marginTop: 10}}>
            <TextInput
              secureTextEntry={hidePassNew ? true : false}
              style={{
                backgroundColor: colors.blurColorBlack,
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 40,
                fontSize: fontSizes.h3,
                color: 'black',
              }}
              placeholder={'Nhập mật khẩu mới'}
              placeholderTextColor={'gray'}
              onChangeText={textPassword => {
                if (textPassword.trim().length == 0) {
                  setErrorNewPassword('*Vui lòng không để trống mật khẩu');
                } else if (validatePassword(textPassword)) {
                  setErrorNewPassword(
                    '*Vui lòng không nhập những ký tự đặc biệt',
                  );
                } else if (
                  textPassword.trim().length < 6 ||
                  textPassword.trim().length > 20
                ) {
                  setErrorNewPassword('*Vui lòng nhập mật khẩu 6-20 ký tự');
                } else {
                  setErrorNewPassword('');
                  setNewPassword(textPassword);
                  return;
                }
                setNewPassword('');
              }}
            />
            <Icon
              onPress={() => {
                setHidePassNew(!hidePassNew);
              }}
              name={hidePassNew ? 'eye-slash' : 'eye'}
              size={20}
              color={'gray'}
              style={{position: 'absolute', right: 10}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                setDefaultStates();
              }}
              style={{
                backgroundColor: colors.blurColorBlack2,
                borderRadius: 10,
                flex: 1,
                marginRight: 20,
              }}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: fontSizes.h2,
                  padding: 10,
                  textAlign: 'center',
                }}>
                Hủy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={
                currentPassword != '' && newPassword != '' ? false : true
              }
              onPress={changePassword}
              style={{
                backgroundColor:
                  currentPassword != '' && newPassword != ''
                    ? colors.primaryColor
                    : colors.blurColorBlack2,
                borderRadius: 10,
                flex: 1,
              }}>
              <Text
                style={{
                  color:
                    currentPassword != '' && newPassword != ''
                      ? 'white'
                      : 'gray',
                  fontSize: fontSizes.h2,
                  padding: 10,
                  textAlign: 'center',
                }}>
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ProfileScreen;
