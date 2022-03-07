import React from 'react';
import {
  Text,
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors, fontSizes} from '../../../constraints';

const ItemExpenseTracker = props => {
  const {index} = props;
  return (
    <View>
      <View
        style={{
          padding: 10,
          backgroundColor: 'white',
          marginTop: index == 0 ? 35 : 0,
          marginBottom: 20,
          elevation: 5,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: fontSizes.h1}}>02</Text>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={{color: 'black'}}>Hôm nay</Text>
            <Text style={{color: 'gray'}}>tháng 3 2022</Text>
          </View>
          <Text style={{color: 'black', fontSize: fontSizes.h3}}>
            -2,000,000
          </Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: colors.blurColorBlack2,
            alignItems: 'center',
            marginVertical: 5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black', fontSize: fontSizes.h3, flex: 1}}>
            Sửa trang trí nhà
          </Text>
          <Text
            style={{
              color: colors.spentColor,
              fontSize: fontSizes.h3,
              marginLeft: 10,
            }}>
            2,000,000
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ItemExpenseTracker;
