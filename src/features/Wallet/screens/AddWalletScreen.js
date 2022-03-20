import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {colors, fontSizes} from '../../../constraints/';
import {validateMoney, validatePassword} from '../../../utils/validations';

const AddWalletScreen = props => {
  const [nameWallet, setNameWallet] = useState('');
  const [currentMoney, setCurrentMoney] = useState('');

  const [focusNameWallet, setFocusNameWallet] = useState(false);
  const [focusCurrentMoney, setFocusCurrentMoney] = useState(false);
  const [errorNameWallet, setErrorNameWallet] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'space-between',
      }}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            color: 'black',
            fontSize: fontSizes.h2,
            fontWeight: 'bold',
            marginTop: 40,
          }}>
          Đầu tiên, hãy tạo ví
        </Text>
        <Text
          style={{
            color: 'gray',
            textAlign: 'center',
            fontSize: fontSizes.h6,
            marginTop: 5,
          }}>
          MoneyLover giúp bạn ghi chép chi tiêu từ nhiều ví khác nhau. Mỗi ví
          đại diện cho một nguồn tiền như Tiền mặt, Tài khoản ngân hàng
        </Text>
        <Image
          source={require('../../../assets/wallet_icon.png')}
          style={{width: 40, height: 40, marginTop: 20, marginBottom: 20}}
        />
        <TextInput //------------NAME WALLET INPUT-------------
          onFocus={() => {
            setFocusNameWallet(true);
          }}
          onBlur={() => {
            setFocusNameWallet(false);
          }}
          onChangeText={text => {
            if (text.trim().length < 6 || text.trim().length > 20) {
              setErrorNameWallet('*Vui lòng nhập tên ví 6-20 ký tự');
            } else if (validatePassword(text)) {
              setErrorNameWallet('*Vui lòng không nhập ký tự đặc biệt');
            } else {
              setErrorNameWallet('');
              setNameWallet(text);
              return;
            }
            setNameWallet('');
          }}
          style={{
            borderBottomWidth: 2,
            width: '100%',
            borderColor: focusNameWallet ? colors.primaryColor : 'gray',

            fontSize: fontSizes.h3,
            color: 'black',
          }}
          placeholder={'Tên ví'}
          placeholderTextColor={focusNameWallet ? colors.primaryColor : 'gray'}
          maxLength={20}
        />
        {errorNameWallet != '' ? (
          <Text
            style={{
              color: 'red',
              alignSelf: 'flex-start',
              marginLeft: 5,
              marginBottom: 10,
            }}>
            {errorNameWallet}
          </Text>
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
              setCurrentMoney(text);
            }
          }}
          style={{
            borderBottomWidth: 1,
            width: '100%',
            borderColor: focusCurrentMoney ? colors.primaryColor : 'gray',
            fontSize: fontSizes.h3,
            color: 'black',
          }}
          placeholder={'Số dư (Số tiền hiện có)'}
          placeholderTextColor={
            focusCurrentMoney ? colors.primaryColor : 'gray'
          }
          keyboardType={'numeric'}
        />
      </View>

      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          disabled={nameWallet != '' && currentMoney != '' ? false : true}
          style={{
            backgroundColor: colors.blurColorBlack,
            width: '100%',
            borderRadius: 30,
          }}>
          <Text
            style={{
              color: colors.primaryColor,
              fontSize: fontSizes.h3,
              padding: 10,
              textAlign: 'center',
            }}>
            TẠO VÍ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddWalletScreen;
