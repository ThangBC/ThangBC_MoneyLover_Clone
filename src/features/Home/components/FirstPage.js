import React, {useState} from 'react';
import {
  Text,
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors, fontSizes} from '../../../constraints';
import ItemExpenseTracker from './ItemExpenseTracker';

const FirstPage = props => {
  const [users, setUsers] = useState([1, 2, 3, 4, 5, 6, 7]);
  return (
    <View style={{flex: 1, backgroundColor: colors.blurColorBlack2}}>
      <ScrollView>
        <View style={{backgroundColor: 'white', padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            <Text style={{color: 'gray', fontSize: fontSizes.h3}}>
              Tiền vào
            </Text>
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
        {users.map((item, index) => {
          return <ItemExpenseTracker index={index} key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

export default FirstPage;