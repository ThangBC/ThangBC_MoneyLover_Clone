import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
  StyleSheet,
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
import {isValidAddTransaction} from '../components/validatitonTransaction';
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

const AddTransactionScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [money, setMoney] = useState('');
  const [type, setType] = useState('Chọn nhóm');
  const [description, setDescription] = useState('Không có ghi chú!');
  const [dateText, setDateText] = useState(validateCurrentDate(new Date()));

  const setDefaultValue = () => {
    setMoney('');
    setType('Chọn nhóm');
    setDescription('Không có ghi chú!');
    setDateText(validateCurrentDate(new Date()));
  };

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
      const typeNameStr = type.slice(0, type.length - 4);
      const typeStr = type.slice(-3);
      const removeComma = money.split(',').join('');
      const moneyUpdate = removeComma - 0;
      console.log(`Remove Comma: ${removeComma}`);
      console.log(`Money Updated: ${moneyUpdate}`);
      // add Transaction
      const transCollRef = doc(collection(db, 'transaction'));
      await setDoc(transCollRef, {
        id: transCollRef.id,
        money: moneyUpdate,
        type: typeStr,
        typeName: typeNameStr,
        description: description,
        date: dateText,
        createdById: auth.currentUser?.uid,
      });

      // update User moneyTotal
      const valUserId = await AsyncStorage.getItem('userId');
      const valMoneyTotal = await AsyncStorage.getItem('moneyTotal');
      const userRef = doc(db, 'users', valUserId);
      await updateDoc(userRef, {
        moneyTotal:
          typeStr == 'thu'
            ? parseInt(valMoneyTotal) + parseInt(moneyUpdate)
            : parseInt(valMoneyTotal) - parseInt(moneyUpdate),
        updatedAt: validateCurrentDate(new Date()),
      });
      setDefaultValue();
      goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View //-----------HEADER----------------
        style={styles.headerView}>
        <Icon
          name="times"
          size={20}
          color={'black'}
          onPress={() => {
            setDefaultValue();
            goBack();
          }}
          style={styles.iconBack}
        />
        <Text style={styles.title}>Thêm giao dịch</Text>
        <TouchableOpacity
          disabled={isValidAddTransaction(money, type)}
          onPress={handleSubmit}>
          <Text style={styles.saveText}>Lưu</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyView}>
        <View //-----------MONEY------------
          style={styles.bigView}>
          <View style={styles.space} />
          <View style={styles.inputView}>
            <TextInput
              maxLength={13}
              style={styles.inputMoney}
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
            <View style={styles.line} />
          </View>
        </View>
        <View //-----------TYPE------------
          style={styles.bigView}>
          <View style={styles.space} />
          <View style={styles.inputView}>
            <Picker
              dropdownIconColor={'black'}
              style={styles.picker}
              selectedValue={type}
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
              <Picker.Item label="Chọn nhóm" value={'Chọn nhóm'} />
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
            <View style={styles.line} />
          </View>
        </View>
        <View //-----------DESCRIPTION------------
          style={styles.bigView}>
          <View style={styles.desIconView}>
            <Icon name="grip-lines" color={'black'} size={20} />
          </View>
          <View style={styles.inputView}>
            <TextInput
              maxLength={50}
              style={styles.inputDes}
              placeholder={'Thêm ghi chú (không bắt buộc)'}
              placeholderTextColor={'gray'}
              onChangeText={text => {
                setDescription(text);
              }}
            />
            <View style={styles.line} />
          </View>
        </View>
        <View //----------DAY------------
          style={styles.bigView}>
          <View style={styles.dayIconView}>
            <Icon name="calendar" color={'black'} size={20} />
          </View>
          <View style={styles.inputView}>
            <TouchableOpacity
              onPress={() => {
                showMode('date');
              }}>
              <Text style={styles.dayBtnText}>
                {dateText === validateCurrentDate(new Date())
                  ? 'Hôm nay'
                  : dateText}
              </Text>
            </TouchableOpacity>
            <View style={styles.line} />
          </View>
          {show && (
            <DateTimePicker
              format={'DD/MM/YYYY'}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  headerView: {
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    backgroundColor: 'white',
    elevation: 2,
  },
  iconBack: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    color: 'black',
    fontSize: fontSizes.h2,
    flex: 1,
    marginLeft: 10,
  },
  saveText: {color: 'black', fontSize: fontSizes.h3},
  bodyView: {
    padding: 10,
    backgroundColor: 'white',
    marginTop: 30,
    elevation: 2,
  },
  bigView: {flexDirection: 'row'},
  inputView: {flex: 0.9, flexDirection: 'column'},
  space: {flex: 0.1},
  inputMoneyView: {flexDirection: 'column', flex: 0.9},
  inputMoney: {fontSize: fontSizes.h2, color: 'black'},
  line: {backgroundColor: colors.blurColorBlack2, height: 1},
  picker: {color: 'black'},
  desIconView: {
    flex: 0.1,
    justifyContent: 'center',
  },
  inputDes: {fontSize: fontSizes.h3, color: 'black'},
  dayIconView: {
    flex: 0.1,
    justifyContent: 'center',
  },
  dayBtnText: {
    fontSize: fontSizes.h3,
    color: 'black',
    marginVertical: 10,
    marginHorizontal: 5,
  },
});

export default AddTransactionScreen;
