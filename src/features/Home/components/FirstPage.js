import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {colors, fontSizes} from '../../../constraints';
import ItemExpenseTracker from './ItemExpenseTracker';
import {auth, collection, db, getDocs} from '../../../firebase/firebase';

const FirstPage = props => {
  const {navigation} = props;
  const {navigate, goBack} = navigation;

  const [tien, setTien] = useState([]);
  console.log(`Kết quả ${JSON.stringify(tien)}`);

  useEffect(() => {
    const getList = async () => {
      const data = await getDocs(collection(db, 'transaction'));
      const result = data.docs.map(detail => ({
        ...detail.data(),
        id: detail.id,
      }));
      setTien(result);
    };
    getList();
  }, [db]);

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
            20,000,000
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
            2,000,000
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
          18,000,000
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
        data={tien}
        renderItem={({item, index}) => {
          return (
            <ItemExpenseTracker
              item={item}
              index={index}
              key={index}
              onPress={() => {
                navigate('ShowDetailTransScreen');
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default FirstPage;
