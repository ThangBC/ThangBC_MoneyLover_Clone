import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../../constraints';
import {
  convertDate,
  convertMonth,
  convertYear,
  convertDay,
} from './validationsHome';

const ItemExpenseTracker = props => {
  const {index, item} = props;

  return (
    <TouchableOpacity disabled={true}>
      <View>
        <View style={[styles.itemTransView, {marginTop: index == 0 ? 35 : 0}]}>
          <View style={styles.dateView}>
            <Text style={styles.date}>{convertDate(item)}</Text>
            <View style={styles.dayView}>
              <Text style={styles.day}>{convertDay(item)}</Text>
              <Text style={styles.monthYear}>
                tháng {convertMonth(item)} {convertYear(item)}
              </Text>
            </View>
            <Text style={styles.moneyTotal}>
              {item.type == 'chi' ? '-' : '+'}
              {item.money}₫
            </Text>
          </View>
          <View style={styles.line} />
          <View style={styles.typeView}>
            <Text style={styles.type}>{item.typeName}</Text>
            <Text
              style={[
                styles.money,
                {
                  color:
                    item.type == 'chi'
                      ? colors.spentColor
                      : colors.collectColor,
                },
              ]}>
              {item.money}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemTransView: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 20,
    elevation: 2,
  },
  dateView: {flexDirection: 'row', alignItems: 'center'},
  date: {color: 'black', fontSize: fontSizes.h1},
  dayView: {flex: 1, marginLeft: 10},
  day: {color: 'black'},
  monthYear: {color: 'gray'},
  moneyTotal: {color: 'black', fontSize: fontSizes.h3},
  line: {
    height: 1,
    backgroundColor: colors.blurColorBlack2,
    alignItems: 'center',
    marginVertical: 5,
  },
  typeView: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  type: {color: 'black', fontSize: fontSizes.h3, flex: 1},
  money: {
    fontSize: fontSizes.h3,
    marginLeft: 10,
  },
});

export default ItemExpenseTracker;
