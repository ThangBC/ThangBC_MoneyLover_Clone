import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
import {colors, fontSizes} from '../../../constraints';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {
  validateMoney,
  validateCurrentDate,
  formatMoneyInput,
} from '../../../utils/validations';
import {UILoading} from '../../../components/';
import {
  auth,
  collection,
  db,
  doc,
  setDoc,
  updateDoc,
  getDocs,
} from '../../../firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isValidAddTransaction} from '../components/validatitonTransaction';

const EditTransactionScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const {idTrans, moneyParam, typeNameParam, typeParam, desParam, dateParam} =
    route.params;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [money, setMoney] = useState(formatMoneyInput(moneyParam.toString()));
  const [type, setType] = useState(`${typeNameParam} ${typeParam}`);
  const [description, setDescription] = useState(
    desParam == 'Không có ghi chú!' ? '' : desParam,
  );
  const [dateText, setDateText] = useState(dateParam);
  const [isModalVisible, setModalVisible] = useState(false);
  const [disable, setDisable] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = validateCurrentDate(tempDate);
    if (event.type !== 'dismissed') {
      setDateText(fDate);
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const handleSubmit = async () => {
    try {
      setModalVisible(true);
      setDisable(true);
      const typeNameStr = type.slice(0, type.length - 4);
      const typeStr = type.slice(-3);
      const removeComma = money.split(',').join('');
      const moneyUpdate = removeComma - 0;
      // update Transaction
      const transCollRef = doc(db, 'transaction', idTrans);
      await updateDoc(transCollRef, {
        money: moneyUpdate,
        type: typeStr,
        typeName: typeNameStr,
        description: description == '' ? 'Không có ghi chú!' : description,
        date: dateText,
        updatedAt: validateCurrentDate(new Date()),
      });

      // update User moneyTotal
      const valUserId = await AsyncStorage.getItem('userId');
      const valMoneyTotal = await AsyncStorage.getItem('moneyTotal');
      const userRef = doc(db, 'users', valUserId);
      await updateDoc(userRef, {
        moneyTotal:
          typeStr == 'thu' && typeParam == 'thu'
            ? parseInt(valMoneyTotal) -
              (parseInt(moneyParam) - parseInt(moneyUpdate))
            : typeStr == 'chi' && typeParam == 'chi'
            ? parseInt(valMoneyTotal) +
              (parseInt(moneyParam) - parseInt(moneyUpdate))
            : typeStr == 'chi' && typeParam == 'thu'
            ? parseInt(valMoneyTotal) -
              parseInt(moneyParam) -
              parseInt(moneyUpdate)
            : typeStr == 'thu' && typeParam == 'chi'
            ? parseInt(valMoneyTotal) +
              parseInt(moneyParam) +
              parseInt(moneyUpdate)
            : parseInt(valMoneyTotal),
        updatedAt: validateCurrentDate(new Date()),
      });
      navigate('UITab');
    } catch (error) {
      console.log(error);
      alert('Có lỗi xảy ra, hãy thử lại');
      setModalVisible(false);
      setDisable(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View //-----------HEADER----------------
        style={{
          height: 55,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 10,
          backgroundColor: 'white',
          elevation: 2,
        }}>
        <Icon
          name="times"
          size={20}
          color={'black'}
          onPress={() => {
            goBack();
          }}
          style={{
            marginHorizontal: 5,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        />
        <Text
          style={{
            color: 'black',
            fontSize: fontSizes.h2,
            flex: 1,
            marginLeft: 10,
          }}>
          Sửa giao dịch
        </Text>
        <TouchableOpacity
          disabled={isValidAddTransaction(disable, money, type)}
          onPress={handleSubmit}>
          <Text style={{color: 'black', fontSize: fontSizes.h3}}>Lưu</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 10,
          backgroundColor: 'white',
          marginTop: 30,
          elevation: 2,
        }}>
        <View //-----------MONEY------------
          style={{flexDirection: 'row'}}>
          <View style={{flex: 0.1}} />
          <View style={{flexDirection: 'column', flex: 0.9}}>
            <TextInput
              maxLength={13}
              style={{fontSize: fontSizes.h2, color: 'black'}}
              placeholder={'0 đ'}
              keyboardType={'numeric'}
              placeholderTextColor={'gray'}
              value={money}
              onChangeText={text => {
                if (validateMoney(text) || text === '') {
                  setMoney(formatMoneyInput(text));
                }
              }}
            />
            <View
              style={{backgroundColor: colors.blurColorBlack2, height: 1}}
            />
          </View>
        </View>
        <View //-----------TYPE------------
          style={{flexDirection: 'row'}}>
          <View style={{flex: 0.1}} />
          <View style={{flex: 0.9, flexDirection: 'column'}}>
            <Picker
              dropdownIconColor={'black'}
              style={{color: 'black'}}
              selectedValue={type}
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
              <Picker.Item label="Chọn nhóm" value="Chọn nhóm" />
              <Picker.Item label="----- Khoản chi -----" enabled={false} />
              <Picker.Item label="Tiền xăng" value="Tiền xăng chi" />
              <Picker.Item label="Tiền điện" value="Tiền điện chi" />
              <Picker.Item label="Tiền nước" value="Tiền nước chi" />
              <Picker.Item label="Tiền nhà" value="Tiền nhà chi" />
              <Picker.Item label="Mua sắm" value="Mua sắm chi" />
              <Picker.Item label="----- Khoản thu -----" enabled={false} />
              <Picker.Item label="Tiền lương" value="Tiền lương thu" />
              <Picker.Item label="Tiền bán đồ" value="Tiền bán đồ thu" />
              <Picker.Item label="Khác" value="Khác thu" />
            </Picker>
            <View
              style={{backgroundColor: colors.blurColorBlack2, height: 1}}
            />
          </View>
        </View>
        <View //-----------DESCRIPTION------------
          style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
            }}>
            <Icon name="grip-lines" color={'black'} size={20} />
          </View>
          <View style={{flex: 0.9, flexDirection: 'column'}}>
            <TextInput
              value={description}
              maxLength={50}
              style={{fontSize: fontSizes.h3, color: 'black'}}
              placeholder={'Thêm ghi chú'}
              placeholderTextColor={'gray'}
              onChangeText={text => {
                setDescription(text);
              }}
            />
            <View
              style={{backgroundColor: colors.blurColorBlack2, height: 1}}
            />
          </View>
        </View>
        <View //----------DAY------------
          style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
            }}>
            <Icon name="calendar" color={'black'} size={20} />
          </View>
          <View style={{flex: 0.9, flexDirection: 'column'}}>
            <TouchableOpacity
              onPress={() => {
                showMode('date');
              }}>
              <Text
                style={{
                  fontSize: fontSizes.h3,
                  color: 'black',
                  marginVertical: 10,
                  marginHorizontal: 5,
                }}>
                {dateText === validateCurrentDate(new Date())
                  ? 'Hôm nay'
                  : dateText}
              </Text>
            </TouchableOpacity>
            <View
              style={{backgroundColor: colors.blurColorBlack2, height: 1}}
            />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </View>
      <UILoading isModalVisible={isModalVisible} />
    </SafeAreaView>
  );
};
export default EditTransactionScreen;
