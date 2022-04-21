import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import {colors, fontSizes} from '../../../constraints';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {formatMoney, validateCurrentDate} from '../../../utils/validations';
import Modal from 'react-native-modal';
import {db, doc, updateDoc, deleteDoc} from '../../../firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShowDetailTransScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const {idTrans, typeName, des, money, date, type, nameWallet} = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleSubmit = async () => {
    try {
      setDisable(true);
      // delete Transaction
      await deleteDoc(doc(db, 'transaction', idTrans));

      // update User moneyTotal
      const valUserId = await AsyncStorage.getItem('userId');
      const valMoneyTotal = await AsyncStorage.getItem('moneyTotal');
      const userRef = doc(db, 'users', valUserId);
      await updateDoc(userRef, {
        moneyTotal:
          type == 'chi'
            ? parseInt(valMoneyTotal) + parseInt(money)
            : parseInt(valMoneyTotal) - parseInt(money),
        updatedAt: validateCurrentDate(new Date()),
      });
      navigate('UITab');
    } catch (error) {
      console.log(error);
      alert('Có lỗi xảy ra, hãy thử lại');
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
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Icon
            name="share-alt"
            size={20}
            color={'black'}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          />
          <Icon
            onPress={() => {
              navigate('EditTransactionScreen', {
                idTrans: idTrans,
                moneyParam: money,
                typeNameParam: typeName,
                typeParam: type,
                desParam: des,
                dateParam: date,
              });
            }}
            name="pen"
            size={20}
            color={'black'}
            style={{
              marginHorizontal: 5,
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          />
          <Icon
            onPress={() => {
              setIsVisible(true);
            }}
            name="trash"
            size={20}
            color={'black'}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          />
        </View>
      </View>
      <View //-----------------BODY-----------------
        style={{
          backgroundColor: 'white',
          marginTop: 20,
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <View style={{flex: 0.1}} />
          <Text style={{color: 'black', fontSize: fontSizes.h2, flex: 0.9}}>
            {typeName}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 20}}>
          <View style={{flex: 0.1}} />
          <Text
            style={{
              color: type == 'chi' ? colors.spentColor : colors.collectColor,
              fontSize: fontSizes.h2,
              flex: 0.9,
            }}>
            {formatMoney(money)}
            <Text style={{textDecorationLine: 'underline'}}>đ</Text>
          </Text>
        </View>
        {des == 'Không có ghi chú!' ? (
          <View />
        ) : (
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <View style={{flex: 0.1, justifyContent: 'center'}}>
              <Icon name="grip-lines" size={20} color={'black'} />
            </View>

            <Text style={{color: 'gray', fontSize: fontSizes.h4, flex: 0.9}}>
              {des}
            </Text>
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            marginTop: des == 'Không có ghi chú!' ? 0 : 10,
          }}>
          <View style={{flex: 0.1, justifyContent: 'center'}}>
            <Icon name="calendar" size={20} color={'black'} />
          </View>

          <Text style={{color: 'black', fontSize: fontSizes.h3, flex: 0.9}}>
            {validateCurrentDate(new Date()) === date ? 'Hôm nay' : date}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            marginTop: 10,
          }}>
          <View style={{flex: 0.1, justifyContent: 'center'}}>
            <Image
              source={require('../../../assets/wallet_icon.png')}
              style={{width: 20, height: 20}}
            />
          </View>

          <Text style={{color: 'black', fontSize: fontSizes.h3, flex: 0.9}}>
            {nameWallet}
          </Text>
        </View>
      </View>
      <Modal isVisible={isVisible} animationType="slide">
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginTop: 10,
              color: 'black',
              fontSize: fontSizes.h2,
              fontWeight: 'bold',
            }}>
            Bạn có chắc muốn xóa ?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 10,
              width: '100%',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
              style={{
                backgroundColor: colors.blurColorBlack,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  marginHorizontal: 30,
                  marginVertical: 5,
                  color: 'gray',
                  fontSize: fontSizes.h3,
                }}>
                Hủy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={disable}
              onPress={handleSubmit}
              style={{backgroundColor: 'red', borderRadius: 10}}>
              <Text
                style={{
                  marginHorizontal: 30,
                  marginVertical: 5,
                  color: 'black',
                  fontSize: fontSizes.h3,
                }}>
                Xóa
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ShowDetailTransScreen;
