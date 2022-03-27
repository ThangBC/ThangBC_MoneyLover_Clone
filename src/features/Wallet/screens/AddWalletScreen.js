import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {colors, fontSizes} from '../../../constraints/';
import {validateMoney, validateCurrentDate} from '../../../utils/validations';
import {
  isValidCreateWallet,
  validErrorNameWallet,
} from '../components/valdationsWallet';
import {
  auth,
  signInWithCredential,
  createUserWithEmailAndPassword,
  collection,
  db,
  addDoc,
} from '../../../firebase/firebase';

const AddWalletScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  const {email, password, googleCredential} = route.params;

  const [nameWallet, setNameWallet] = useState('');
  const [errorNameWallet, setErrorNameWallet] = useState('');
  const [currentMoney, setCurrentMoney] = useState('0');

  const [focusNameWallet, setFocusNameWallet] = useState(false);
  const [focusCurrentMoney, setFocusCurrentMoney] = useState(false);

  const addFirestore = user => {
    const getIndex = user.email.indexOf('@');
    const displayName = user.email.substring(0, getIndex).toUpperCase();
    const userCollRef = collection(db, 'users');
    addDoc(userCollRef, {
      id: user.uid,
      email: user.email,
      name: displayName,
      accountType: user.providerData[0].providerId,
      walletName: nameWallet,
      moneyTotal: currentMoney,
      createdAt: validateCurrentDate(new Date()),
    })
      .then(res => {
        navigate('UITab');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleRegister = () => {
    if (googleCredential != undefined) {
      const res = signInWithCredential(auth, googleCredential);
      res
        .then(userCredentials => {
          const user = userCredentials.user;
          addFirestore(user);
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          addFirestore(user);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.textTitle}>Đầu tiên, hãy tạo ví</Text>
        <Text style={styles.textContent}>
          MoneyLover giúp bạn ghi chép chi tiêu từ nhiều ví khác nhau. Mỗi ví
          đại diện cho một nguồn tiền như Tiền mặt, Tài khoản ngân hàng
        </Text>
        <Image
          source={require('../../../assets/wallet_icon.png')}
          style={styles.logoWallet}
        />
        <TextInput //------------NAME WALLET INPUT-------------
          onFocus={() => {
            setFocusNameWallet(true);
          }}
          onBlur={() => {
            setFocusNameWallet(false);
          }}
          onChangeText={text => {
            setErrorNameWallet(validErrorNameWallet(text));
            setNameWallet(text);
          }}
          style={[
            styles.inputNameWallet,
            {borderColor: focusNameWallet ? colors.primaryColor : 'gray'},
          ]}
          placeholder={'Tên ví'}
          placeholderTextColor={focusNameWallet ? colors.primaryColor : 'gray'}
          maxLength={20}
        />
        {errorNameWallet != '' ? (
          <Text style={styles.errorText}>{errorNameWallet}</Text>
        ) : (
          <View />
        )}

        <TextInput //------------CURRENT MONEY INPUT-------------
          onFocus={() => {
            setFocusCurrentMoney(true);
          }}
          onBlur={() => {
            setFocusCurrentMoney(false);
          }}
          value={currentMoney}
          onChangeText={text => {
            if (validateMoney(text) || text === '') {
              setCurrentMoney(text === '' ? '0' : text);
            }
          }}
          style={[
            styles.inputMoney,
            {borderColor: focusCurrentMoney ? colors.primaryColor : 'gray'},
          ]}
          maxLength={12}
          placeholder={'Số dư (Số tiền hiện có)'}
          placeholderTextColor={
            focusCurrentMoney ? colors.primaryColor : 'gray'
          }
          keyboardType={'numeric'}
        />
      </View>

      <View style={styles.footerView}>
        <TouchableOpacity
          onPress={handleRegister}
          disabled={!isValidCreateWallet(nameWallet)}
          style={styles.createWalletBtn}>
          <Text style={styles.createWalletBtnText}>TẠO VÍ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'space-between',
  },
  headerView: {alignItems: 'center'},
  textTitle: {
    color: 'black',
    fontSize: fontSizes.h2,
    fontWeight: 'bold',
    marginTop: 40,
  },
  textContent: {
    color: 'gray',
    textAlign: 'center',
    fontSize: fontSizes.h6,
    marginTop: 5,
  },
  logoWallet: {width: 40, height: 40, marginTop: 20, marginBottom: 20},
  inputNameWallet: {
    borderBottomWidth: 2,
    width: '100%',
    fontSize: fontSizes.h3,
    color: 'black',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: 10,
  },
  inputMoney: {
    borderBottomWidth: 1,
    width: '100%',
    fontSize: fontSizes.h3,
    color: 'black',
  },
  footerView: {alignItems: 'center'},
  createWalletBtn: {
    backgroundColor: colors.blurColorBlack,
    width: '100%',
    borderRadius: 30,
  },
  createWalletBtnText: {
    color: colors.primaryColor,
    fontSize: fontSizes.h3,
    padding: 10,
    textAlign: 'center',
  },
});

export default AddWalletScreen;
