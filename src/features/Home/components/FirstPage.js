import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {colors, fontSizes} from '../../../constraints';
import ItemExpenseTracker from './ItemExpenseTracker';
import {
  auth,
  collection,
  db,
  query,
  where,
  getDocs,
  onSnapshot,
} from '../../../firebase/firebase';

const FirstPage = props => {
  const {navigation} = props;
  const {navigate, goBack} = navigation;

  const [trans, setTrans] = useState([]);
  const [totalCollect, setTotalCollect] = useState([]);
  const [totalSpent, setTotalSpent] = useState([]);

  const handleTotalCollect = () => {
    let sum = 0;
    totalCollect.forEach(collect => {
      sum += parseInt(collect);
    });
    return sum;
  };

  const handleTotalSpend = () => {
    let minus = 0;
    totalSpent.forEach(spent => {
      minus += parseInt(spent);
    });
    return minus;
  };

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
    <View style={{flex: 1}}>
      <View style={{backgroundColor: 'white', padding: 10, elevation: 2}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}>
          <Text style={{color: 'gray', fontSize: fontSizes.h3}}>Tiền vào</Text>
          <Text
            style={{
              color: colors.collectColor,
              fontSize: fontSizes.h3,
              fontWeight: 'bold',
            }}>
            {handleTotalCollect()}₫
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}>
          <Text style={{color: 'gray', fontSize: fontSizes.h3}}>Tiền ra</Text>
          <Text
            style={{
              color: colors.spentColor,
              fontSize: fontSizes.h3,
              fontWeight: 'bold',
            }}>
            {handleTotalSpend()}₫
          </Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: 'gray',
            width: '40%',
            alignSelf: 'flex-end',
          }}
        />
        <Text
          style={{
            color: 'black',
            fontSize: fontSizes.h3,
            fontWeight: 'bold',
            alignSelf: 'flex-end',
            marginTop: 5,
          }}>
          {handleTotalCollect() - handleTotalSpend()}₫
        </Text>
        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
          <TouchableOpacity
            onPress={() => {
              alert('Tính năng đang được phát triển');
            }}
            style={{
              backgroundColor: 'rgba(255,140,0,0.1)',
              borderRadius: 30,
            }}>
            <Text
              style={{
                color: colors.primaryColor,
                padding: 10,
                fontSize: fontSizes.h4,
              }}>
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

export default FirstPage;
