import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {fontSizes, colors} from '../../../constraints/';
import {
  auth,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleSignin,
} from '../../../firebase/firebase';
import Modal from 'react-native-modal';
import {
  isValidChangePass,
  validErrorPass,
} from '../components/validationsProfile';

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
            console.log(error.message);
          });
      })
      .catch(error => {
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
    <View style={styles.container}>
      <View //-----------HEADER----------------
        style={styles.headerView}>
        <Text style={styles.title}>Quản lý tài khoản</Text>
      </View>
      <View style={styles.line} />
      <View //-----------------INFORMATION-------------------
        style={styles.inforView}>
        <Icon
          name="user-circle"
          size={70}
          color={colors.primaryColor}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{displayName()}</Text>
        <Text style={styles.userEmail}>{auth.currentUser?.email}</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          setModalVisible(!isModalVisible);
        }}
        style={styles.changePassBtn}>
        <Text style={styles.changePassBtnText}>Thay đổi mật khẩu</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignOut} style={styles.logOutBtn}>
        <Text style={styles.logOutBtnText}>Đăng xuất</Text>
      </TouchableOpacity>
      <Modal //--------------MODAL-----------------
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        isVisible={isModalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Đổi mật khẩu</Text>
          {errorCurrentPassword != '' ? (
            <Text style={styles.errorText}>{errorCurrentPassword}</Text>
          ) : errorNewPassword != '' ? (
            <Text style={styles.errorText}>{errorNewPassword}</Text>
          ) : (
            <View />
          )}
          <View //--------------INPUT CURRENT PASSWORD-----------------
            style={styles.inputPassView}>
            <TextInput
              secureTextEntry={hidePassCurrent ? true : false}
              text
              style={styles.inputPass}
              placeholder={'Nhập mật khẩu cũ'}
              placeholderTextColor={'gray'}
              onChangeText={textPassword => {
                setErrorCurrentPassword(validErrorPass(textPassword));
                setCurrentPassword(textPassword);
              }}
            />
            <Icon
              onPress={() => {
                setHidePassCurrent(!hidePassCurrent);
              }}
              name={hidePassCurrent ? 'eye-slash' : 'eye'}
              size={20}
              color={'gray'}
              style={styles.iconShowPass}
            />
          </View>

          <View //--------------INPUT NEW PASSWORD-----------------
            style={styles.inputPassView}>
            <TextInput
              secureTextEntry={hidePassNew ? true : false}
              style={styles.inputPass}
              placeholder={'Nhập mật khẩu mới'}
              placeholderTextColor={'gray'}
              onChangeText={textPassword => {
                setErrorNewPassword(validErrorPass(textPassword));
                setNewPassword(textPassword);
              }}
            />
            <Icon
              onPress={() => {
                setHidePassNew(!hidePassNew);
              }}
              name={hidePassNew ? 'eye-slash' : 'eye'}
              size={20}
              color={'gray'}
              style={styles.iconShowPass}
            />
          </View>

          <View style={styles.btnConfirmView}>
            <TouchableOpacity
              onPress={() => {
                setDefaultStates();
              }}
              style={styles.cancelBtn}>
              <Text style={styles.cancelBtnText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!isValidChangePass(currentPassword, newPassword)}
              onPress={changePassword}
              style={[
                styles.confirmBtn,
                {
                  backgroundColor: isValidChangePass(
                    currentPassword,
                    newPassword,
                  )
                    ? colors.primaryColor
                    : colors.blurColorBlack2,
                },
              ]}>
              <Text
                style={[
                  styles.confirmBtnText,
                  {
                    color: isValidChangePass(currentPassword, newPassword)
                      ? 'white'
                      : 'gray',
                  },
                ]}>
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  headerView: {
    height: 70,
    padding: 10,
    justifyContent: 'center',
  },
  title: {color: 'black', fontSize: fontSizes.h1, marginLeft: 5},
  line: {height: 1, backgroundColor: colors.blurColorBlack2},
  inforView: {alignItems: 'center'},
  avatar: {marginTop: 20},
  userName: {color: 'black', fontSize: fontSizes.h3, marginTop: 10},
  userEmail: {
    color: 'gray',
    fontSize: fontSizes.h3,
    marginTop: 5,
    marginBottom: 20,
  },
  changePassBtn: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.blurColorBlack2,
    display: auth.currentUser?.photoURL ? 'none' : 'flex',
  },
  changePassBtnText: {
    color: colors.primaryColor,
    fontSize: fontSizes.h3,
    padding: 10,
  },
  logOutBtn: {
    alignSelf: 'center',
    width: '90%',
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: colors.blurColorBlack,
    marginTop: 30,
    borderRadius: 30,
    bottom: 20,
  },
  logOutBtnText: {color: 'red', fontSize: fontSizes.h2, padding: 7},
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  modalTitle: {
    color: colors.primaryColor,
    fontSize: fontSizes.h1,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
    fontSize: fontSizes.h5,
  },
  inputPassView: {justifyContent: 'center', marginTop: 10},
  inputPass: {
    backgroundColor: colors.blurColorBlack,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 40,
    fontSize: fontSizes.h3,
    color: 'black',
  },
  iconShowPass: {position: 'absolute', right: 10},
  btnConfirmView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  cancelBtn: {
    backgroundColor: colors.blurColorBlack2,
    borderRadius: 10,
    flex: 1,
    marginRight: 20,
  },
  cancelBtnText: {
    color: 'gray',
    fontSize: fontSizes.h2,
    padding: 10,
    textAlign: 'center',
  },
  confirmBtn: {
    borderRadius: 10,
    flex: 1,
  },
  confirmBtnText: {
    fontSize: fontSizes.h2,
    padding: 10,
    textAlign: 'center',
  },
});

export default ProfileScreen;
