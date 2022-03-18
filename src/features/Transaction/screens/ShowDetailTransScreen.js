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

const ShowDetailTransScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
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
              navigate('EditTransactionScreen');
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
              alert('Xóa');
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
            Sửa trang trí nhà
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 20}}>
          <View style={{flex: 0.1}} />
          <Text
            style={{
              color: colors.spentColor,
              fontSize: fontSizes.h2,
              flex: 0.9,
            }}>
            2,000,000 <Text style={{textDecorationLine: 'underline'}}>đ</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
          }}>
          <View style={{flex: 0.1, justifyContent: 'center'}}>
            <Icon name="calendar" size={20} color={'black'} />
          </View>

          <Text style={{color: 'black', fontSize: fontSizes.h3, flex: 0.9}}>
            Hôm nay
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShowDetailTransScreen;
