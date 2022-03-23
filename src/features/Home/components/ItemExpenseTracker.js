import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {colors, fontSizes} from '../../../constraints';
import {validateCurrentDate} from '../../../utils/validations';

const ItemExpenseTracker = props => {
  const {index, item} = props;
  console.log(`item: ${JSON.stringify(item)}`);

  const convertDate = () => {
    return item.date.slice(0, 2);
  };
  const convertMonth = () => {
    return item.date.slice(3, -5);
  };
  const convertYear = () => {
    return item.date.slice(-4);
  };

  const convertDay = () => {
    return item.date == validateCurrentDate(new Date())
      ? 'Hôm nay'
      : item.date > validateCurrentDate(new Date())
      ? 'Tương lai'
      : 'Các ngày trước';
  };

  return (
    <TouchableOpacity disabled={true}>
      <View>
        <View
          style={{
            padding: 10,
            backgroundColor: 'white',
            marginTop: index == 0 ? 35 : 0,
            marginBottom: 20,
            elevation: 2,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'black', fontSize: fontSizes.h1}}>
              {convertDate()}
            </Text>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={{color: 'black'}}>{convertDay()}</Text>
              <Text style={{color: 'gray'}}>
                tháng {convertMonth()} {convertYear()}
              </Text>
            </View>
            <Text style={{color: 'black', fontSize: fontSizes.h3}}>
              {item.type == 'chi' ? '-' : '+'}
              {item.money}₫
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
              {item.typeName}
            </Text>
            <Text
              style={{
                color:
                  item.type == 'chi' ? colors.spentColor : colors.collectColor,
                fontSize: fontSizes.h3,
                marginLeft: 10,
              }}>
              {item.money}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemExpenseTracker;
