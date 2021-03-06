import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../../constraints';
import ItemExpenseTracker from './ItemExpenseTracker';
import {handleTotalSpend, handleTotalCollect} from './validationsHome';
import {formatMoney} from '../../../utils/validations';
import {
  auth,
  collection,
  db,
  query,
  where,
  onSnapshot,
} from '../../../firebase/firebase';
import moment from 'moment';

const FirstPage = props => {
  const {navigation, route, nameWallet} = props;
  const {navigate, goBack} = navigation;

  const [totalCollect, setTotalCollect] = useState([]);
  const [totalSpent, setTotalSpent] = useState([]);
  const [itemTrans, setItemTrans] = useState([]);

  //----------- GET TRANSACTION ----------------
  useEffect(() => {
    const q = query(
      collection(db, 'transaction'),
      where('createdById', '==', auth.currentUser?.uid),
    );
    const unsubcribe = onSnapshot(q, snapshot => {
      const collect = [];
      const spent = [];
      const items = [];

      snapshot.docs.map(doc => {
        const cutStr = doc.data().date.indexOf('/');
        const cutLastStr = doc.data().date.lastIndexOf('/');
        const month = doc.data().date.slice(cutStr + 1, cutLastStr);
        const currMonth = new Date().getMonth() + 1;
        if (parseInt(month) < currMonth) {
          if (doc.data().type == 'thu') {
            collect.push(doc.data().money);
          }
          if (doc.data().type == 'chi') {
            spent.push(doc.data().money);
          }
          items.push(doc.data().date);
        }
      });
      setItemTrans(
        items.filter((item, index) => items.indexOf(item) === index),
      );
      setTotalCollect(collect);
      setTotalSpent(spent);
    });
    return () => {
      unsubcribe;
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.totalView}>
        <View style={styles.totalCollectView}>
          <Text style={styles.totalCollectText}>Ti???n v??o</Text>
          <Text style={styles.totalCollect}>
            {formatMoney(handleTotalCollect(totalCollect))}???
          </Text>
        </View>
        <View style={styles.totalSpentView}>
          <Text style={styles.totalSpentText}>Ti???n ra</Text>
          <Text style={styles.totalSpent}>
            {formatMoney(handleTotalSpend(totalSpent))}???
          </Text>
        </View>
        <View style={styles.line} />
        <Text style={styles.totalMoney}>
          {formatMoney(
            handleTotalCollect(totalCollect) - handleTotalSpend(totalSpent),
          )}
          ???
        </Text>
        <View style={styles.statisticsBtnView}>
          <TouchableOpacity
            onPress={() => {
              alert('T??nh n??ng ??ang ???????c ph??t tri???n');
            }}
            style={styles.statisticsBtn}>
            <Text style={styles.statisticsBtnText}>
              Xem b??o c??o cho giai ??o???n n??y
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={itemTrans.sort(
          (a, b) => moment(b, 'DD/MM/YYYY') - moment(a, 'DD/MM/YYYY'),
        )}
        keyExtractor={item => item}
        renderItem={({item, index}) => {
          return (
            <ItemExpenseTracker
              date={item}
              index={index}
              key={item}
              navigation={props.navigation}
              route={props.route}
              nameWallet={nameWallet}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  totalView: {backgroundColor: 'white', padding: 10, elevation: 2},
  totalCollectView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalCollectText: {color: 'gray', fontSize: fontSizes.h3},
  totalCollect: {
    color: colors.collectColor,
    fontSize: fontSizes.h3,
    fontWeight: 'bold',
  },
  totalSpentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalSpentText: {color: 'gray', fontSize: fontSizes.h3},
  totalSpent: {
    color: colors.spentColor,
    fontSize: fontSizes.h3,
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: 'gray',
    width: '40%',
    alignSelf: 'flex-end',
  },
  totalMoney: {
    color: 'black',
    fontSize: fontSizes.h3,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  statisticsBtnView: {flexDirection: 'row', alignSelf: 'center', marginTop: 20},
  statisticsBtn: {
    backgroundColor: 'rgba(255,140,0,0.1)',
    borderRadius: 30,
  },
  statisticsBtnText: {
    color: colors.primaryColor,
    padding: 10,
    fontSize: fontSizes.h4,
  },
});

export default FirstPage;
