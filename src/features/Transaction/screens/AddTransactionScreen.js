import React, {useState, useEffect} from 'react';
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
import {validateMoney} from '../../../utils/validations';
import {
  auth,
  signInWithCredential,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GoogleSignin,
  collection,
  doc,
  setDoc,
  db,
  getDocs,
} from '../../../firebase/firebase';

const AddTransactionScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  // const [tien, setTien] = useState([]);
  // console.log(auth.currentUser?.providerData);

  // useEffect(() => {
  //   console.log('123');
  //   getDocs(collection(db, 'transaction')).then(snapshot => {
  //     snapshot.docs.forEach(async doc => {
  //       setTien({
  //         money: doc.data().money,
  //       });
  //     });
  //   });
  // }, [tien]);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [money, setMoney] = useState('');
  const [type, setType] = useState('Chọn nhóm');
  const [description, setDescription] = useState('');
  const [dateText, setDateText] = useState('Chọn ngày giao dịch');

  const isValid = (inputMoney, inputType, inputDes, inputDate) => {
    if (
      inputMoney == '' ||
      inputType == 'Chọn nhóm' ||
      inputDes == '' ||
      inputDate == 'Chọn ngày giao dịch'
    ) {
      return true;
    }
    return false;
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
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
      const newCityRef = doc(collection(db, 'transaction'));
      await setDoc(newCityRef, {
        money: money,
        type: typeStr,
        typeName: typeNameStr,
        description: description,
        date: dateText,
        createdById: auth.currentUser?.uid,
      });
      setMoney('');
      setType('Chọn nhóm');
      setDescription('');
      setDateText('Chọn ngày giao dịch');
      goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View //-----------HEADER----------------
        style={{
          height: 55,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: 10,
          backgroundColor: 'white',
          elevation: 2,
        }}>
        <Icon
          name="times"
          size={20}
          color={'black'}
          onPress={() => {
            setMoney('');
            setType('Chọn nhóm');
            setDescription('');
            setDateText('Chọn ngày giao dịch');
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
          Thêm giao dịch
        </Text>
        <TouchableOpacity
          disabled={isValid(money, type, description, dateText)}
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
              style={{fontSize: fontSizes.h2, color: 'black'}}
              placeholder={'0 đ'}
              keyboardType={'numeric'}
              placeholderTextColor={'gray'}
              value={money}
              onChangeText={text => {
                if (validateMoney(text) || text === '') {
                  setMoney(text);
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
              <Picker.Item label="Khác" value="Khác" />
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
              maxLength={50}
              style={{fontSize: fontSizes.h3, color: 'black'}}
              placeholder={'Thêm ghi chú'}
              placeholderTextColor={'gray'}
              value={description}
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
                {dateText}
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
      {/* {tien.map((item, index) => {
        <Text style={{color: 'black'}}>{item.money}</Text>;
      })} */}
    </SafeAreaView>
  );
};

export default AddTransactionScreen;
