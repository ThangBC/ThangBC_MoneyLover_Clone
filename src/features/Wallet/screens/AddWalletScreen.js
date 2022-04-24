import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {colors, fontSizes} from '../../../constraints/';
import {
  validateMoney,
  validateCurrentDate,
  formatMoneyInput,
} from '../../../utils/validations';
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
  doc,
  setDoc,
} from '../../../firebase/firebase';
import moment from 'moment';
import {UILoading} from '../../../components/';

const AddWalletScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  const {email, password, googleCredential} = route.params;

  const [nameWallet, setNameWallet] = useState('Tien Mat');
  const [errorNameWallet, setErrorNameWallet] = useState('');
  const [currentMoney, setCurrentMoney] = useState('');

  const [focusNameWallet, setFocusNameWallet] = useState(false);
  const [focusCurrentMoney, setFocusCurrentMoney] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [disable, setDisable] = useState(false);

  const addFirestore = async user => {
    try {
      const getIndex = user.email.indexOf('@');
      const displayName = user.email.substring(0, getIndex).toUpperCase();
      const userCollRef = collection(db, 'users');
      const removeComma = currentMoney.split(',').join('');
      const moneyUpdate = removeComma - 0;
      const dateText = moment().format('DD/MM/YYYY');

      if (!moneyUpdate == 0) {
        const transCollRef = doc(collection(db, 'transaction'));
        await setDoc(transCollRef, {
          id: transCollRef.id,
          money: moneyUpdate,
          type: 'thu',
          typeName: 'Khác',
          description: 'Số tiền hiện có',
          date: dateText,
          createdById: user.uid,
        });
      }

      addDoc(userCollRef, {
        id: user.uid,
        email: user.email,
        name: displayName,
        accountType: user.providerData[0].providerId,
        walletName: nameWallet,
        moneyTotal: moneyUpdate,
        createdAt: validateCurrentDate(new Date()),
      })
        .then(res => {
          setModalVisible(false);
          navigate('UITab');
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = () => {
    setModalVisible(true);
    setDisable(true);
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
          alert('Có lỗi xảy ra, hãy thử lại!');
          setModalVisible(false);
          setDisable(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
          <Text //------------NAME WALLET INPUT-------------
            style={{
              color: focusNameWallet ? colors.primaryColor : 'gray',
              alignSelf: 'flex-start',
            }}>
            Tên ví
          </Text>
          <TextInput
            onFocus={() => {
              setFocusNameWallet(true);
            }}
            onBlur={() => {
              setFocusNameWallet(false);
            }}
            value={nameWallet}
            onChangeText={text => {
              setErrorNameWallet(validErrorNameWallet(text));
              setNameWallet(text);
            }}
            style={[
              styles.inputNameWallet,
              {borderColor: focusNameWallet ? colors.primaryColor : 'gray'},
            ]}
            placeholder={'Tên ví'}
            placeholderTextColor={
              focusNameWallet ? colors.primaryColor : 'gray'
            }
            maxLength={20}
          />
          {errorNameWallet != '' ? (
            <Text style={styles.errorText}>{errorNameWallet}</Text>
          ) : (
            <View />
          )}
          <Text style={{color: 'gray', alignSelf: 'flex-start', marginTop: 10}}>
            Tên ví
          </Text>

          <TextInput //------------CURRENCY-------------
            value={'Việt Nam Đồng'}
            editable={false}
            style={[
              styles.inputMoney,
              {
                borderColor: 'gray',
              },
            ]}
          />
          <Text //------------CURRENT MONEY INPUT-------------
            style={{
              color: focusCurrentMoney ? colors.primaryColor : 'gray',
              alignSelf: 'flex-start',
              marginTop: 10,
            }}>
            Số dư
          </Text>
          <TextInput
            onFocus={() => {
              setFocusCurrentMoney(true);
            }}
            onBlur={() => {
              setFocusCurrentMoney(false);
            }}
            value={currentMoney}
            onChangeText={text => {
              if (validateMoney(text) || text === '') {
                setCurrentMoney(formatMoneyInput(text));
              }
            }}
            style={[
              styles.inputMoney,
              {borderColor: focusCurrentMoney ? colors.primaryColor : 'gray'},
            ]}
            maxLength={15}
            placeholder={'Nhập số tiền hiện có'}
            placeholderTextColor={
              focusCurrentMoney ? colors.primaryColor : 'gray'
            }
            keyboardType={'numeric'}
          />
        </View>
        <View style={{marginVertical: 15}} />
      </ScrollView>

      <View style={styles.footerView}>
        <TouchableOpacity
          onPress={handleRegister}
          disabled={!isValidCreateWallet(disable, nameWallet)}
          style={styles.createWalletBtn}>
          <Text style={styles.createWalletBtnText}>TẠO VÍ</Text>
        </TouchableOpacity>
      </View>
      <UILoading isModalVisible={isModalVisible} />
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
