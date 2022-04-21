import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {colors, fontSizes} from '../../../constraints';
import {
  convertDate,
  convertMonth,
  convertYear,
  convertDay,
} from './validationsHome';
import {
  auth,
  collection,
  db,
  query,
  where,
  onSnapshot,
} from '../../../firebase/firebase';
import {formatMoney} from '../../../utils/validations';
import {handleTotalSpend, handleTotalCollect} from './validationsHome';

const ItemExpenseTracker = props => {
  const {navigation, route, nameWallet} = props;
  const {navigate, goBack} = navigation;
  const {index, date} = props;

  const [itemChild, setItemChild] = useState([]);
  const [collect, setCollect] = useState([]);
  const [spend, setSpend] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'transaction'),
      where('createdById', '==', auth.currentUser?.uid),
    );
    const unsubcribe = onSnapshot(q, snapshot => {
      let itemChild = [];
      let collect = [];
      let spend = [];
      snapshot.docs.map(doc => {
        if (doc.data().date == date) {
          itemChild.push({
            id: doc.data().id,
            typeName: doc.data().typeName,
            money: doc.data().money,
            type: doc.data().type,
            description: doc.data().description,
          });
          if (doc.data().type == 'thu') {
            collect.push(doc.data().money);
          }
          if (doc.data().type == 'chi') {
            spend.push(doc.data().money);
          }
        }
        setItemChild(itemChild);
        setCollect(collect);
        setSpend(spend);
      });
    });
    return () => {
      unsubcribe();
    };
  }, []);

  return (
    <View style={[styles.itemTransView, {marginTop: index == 0 ? 35 : 0}]}>
      <View style={styles.dateView}>
        <Text style={styles.date}>{convertDate(date)}</Text>
        <View style={styles.dayView}>
          <Text style={styles.day}>{convertDay(date)}</Text>
          <Text style={styles.monthYear}>
            tháng {convertMonth(date)} {convertYear(date)}
          </Text>
        </View>
        <View style={styles.moneyTotalView}>
          <Text style={styles.moneyTotal} numberOfLines={1}>
            {formatMoney(handleTotalCollect(collect) - handleTotalSpend(spend))}
            ₫
          </Text>
        </View>
      </View>
      <View style={styles.line} />
      <FlatList
        data={itemChild}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigate('ShowDetailTransScreen', {
                  idTrans: item.id,
                  typeName: item.typeName,
                  des: item.description,
                  money: item.money,
                  date: date,
                  type: item.type,
                  nameWallet: nameWallet,
                });
              }}>
              <View style={styles.typeView} key={item.id}>
                <View style={styles.itemIconView}>
                  <Image
                    source={require('../../../assets/item_icon.png')}
                    style={styles.itemIcon}
                  />
                </View>

                <View style={styles.typeDesView}>
                  <Text style={styles.type}>{item.typeName}</Text>
                  <Text
                    style={[
                      styles.des,
                      {
                        display:
                          item.description == 'Không có ghi chú!'
                            ? 'none'
                            : 'flex',
                      },
                    ]}
                    numberOfLines={1}>
                    {item.description}
                  </Text>
                </View>
                <View style={styles.moneyView}>
                  <Text
                    style={[
                      styles.money,
                      {
                        color:
                          item.type == 'chi'
                            ? colors.spentColor
                            : colors.collectColor,
                      },
                    ]}
                    numberOfLines={1}>
                    {item.type == 'chi' ? '-' : '+'}
                    {formatMoney(item.money)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
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
  date: {
    color: 'black',
    fontSize: fontSizes.h1,
    flex: 0.1,
  },
  dayView: {flex: 0.5, marginLeft: 5},
  day: {color: 'black'},
  monthYear: {color: 'gray', fontSize: fontSizes.h5},
  moneyTotal: {
    color: 'black',
    fontSize: fontSizes.h3,
    textAlign: 'right',
  },
  moneyTotalView: {flex: 0.4},
  line: {
    height: 1,
    backgroundColor: colors.blurColorBlack2,
    alignItems: 'center',
    marginVertical: 5,
  },
  typeView: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 5,
  },
  itemIcon: {width: 30, height: 30},
  itemIconView: {flex: 0.1},
  type: {color: 'black', fontSize: fontSizes.h3},
  des: {color: 'gray', fontSize: fontSizes.h5},
  typeDesView: {
    flex: 0.5,
    marginLeft: 5,
  },
  money: {
    fontSize: fontSizes.h3,
    textAlign: 'right',
  },
  moneyView: {flex: 0.4},
});

export default ItemExpenseTracker;
