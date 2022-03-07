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

const AddTransactionScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [money, setMoney] = useState('');
  const [dateText, setDateText] = useState('Chọn ngày giao dịch');
  const [selectedLanguage, setSelectedLanguage] = useState('Chọn nhóm');

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

  return (
    <SafeAreaView style={{flex: 1}}>
      <View //-----------HEADER----------------
        style={{
          height: 50,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 10,
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
          Thêm giao dịch
        </Text>
        <Text style={{color: 'black', fontSize: fontSizes.h3}}>Lưu</Text>
      </View>
      <View style={{padding: 10}}>
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
                if (/^\d+$/.test(text) || text === '') {
                  setMoney(text);
                }
              }}
            />
            <View style={{backgroundColor: 'gray', height: 1}} />
          </View>
        </View>
        <View //-----------TYPE------------
          style={{flexDirection: 'row'}}>
          <View style={{flex: 0.1}} />
          <View style={{flex: 0.9, flexDirection: 'column'}}>
            <Picker
              style={{color: 'black'}}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item label="Chọn nhóm" value={'0'} />
              <Picker.Item label="----- Khoản chi -----" enabled={false} />
              <Picker.Item label="Tiền xăng" value="Tiền xăng" />
              <Picker.Item label="Tiền điện" value="Tiền điện" />
              <Picker.Item label="Tiền nước" value="Tiền nước" />
              <Picker.Item label="Tiền nhà" value="Tiền nhà" />
              <Picker.Item label="Mua sắm" value="Mua sắm" />
              <Picker.Item label="----- Khoản thu -----" enabled={false} />
              <Picker.Item label="Tiền lương" value="Tiền lương" />
              <Picker.Item label="Tiền bán đồ" value="Tiền bán đồ" />
              <Picker.Item label="Khác" value="Khác" />
            </Picker>
            <View style={{backgroundColor: 'gray', height: 1}} />
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
            />
            <View style={{backgroundColor: 'gray', height: 1}} />
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
            <View style={{backgroundColor: 'gray', height: 1}} />
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
    </SafeAreaView>
  );
};

export default AddTransactionScreen;
