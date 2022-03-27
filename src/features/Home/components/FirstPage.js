import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../../constraints';
import ItemExpenseTracker from './ItemExpenseTracker';
import {handleTotalSpend, handleTotalCollect} from './validationsHome';
import {
  auth,
  collection,
  db,
  query,
  where,
  onSnapshot,
} from '../../../firebase/firebase';

const FirstPage = props => {
  const {navigation} = props;
  const {navigate, goBack} = navigation;

  const [trans, setTrans] = useState([]);
  const [totalCollect, setTotalCollect] = useState([]);
  const [totalSpent, setTotalSpent] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'transaction'),
      where('createdById', '==', auth.currentUser?.uid),
    );
    const unsubcribe = onSnapshot(q, snapshot => {
      const collect = [];
      const spent = [];
      setTrans(snapshot.docs.map(doc => doc.data()));

      snapshot.docs.map(doc => {
        if (doc.data().type == 'thu') {
          collect.push(doc.data().money);
        }
        if (doc.data().type == 'chi') {
          spent.push(doc.data().money);
        }
      });
      setTotalCollect(collect);
      setTotalSpent(spent);
    });
    return () => {
      unsubcribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.totalView}>
        <View style={styles.totalCollectView}>
          <Text style={styles.totalCollectText}>Tiền vào</Text>
          <Text style={styles.totalCollect}>
            {handleTotalCollect(totalCollect)}₫
          </Text>
        </View>
        <View style={styles.totalSpentView}>
          <Text style={styles.totalSpentText}>Tiền ra</Text>
          <Text style={styles.totalSpent}>{handleTotalSpend(totalSpent)}₫</Text>
        </View>
        <View style={styles.line} />
        <Text style={styles.totalMoney}>
          {handleTotalCollect(totalCollect) - handleTotalSpend(totalSpent)}₫
        </Text>
        <View style={styles.statisticsBtnView}>
          <TouchableOpacity
            onPress={() => {
              alert('Tính năng đang được phát triển');
            }}
            style={styles.statisticsBtn}>
            <Text style={styles.statisticsBtnText}>
              Xem báo cáo cho giai đoạn này
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={trans}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <ItemExpenseTracker item={item} index={index} key={item.id} />
        )}
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
