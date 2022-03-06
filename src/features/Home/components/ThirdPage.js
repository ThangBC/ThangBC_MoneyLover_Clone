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

const ThirdPage = props => {
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
        <View>
          <View style={{padding: 10, backgroundColor: 'white', marginTop: 30}}>
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
              style={{height: 1, backgroundColor: 'gray', alignItems: 'center'}}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                justifyContent: 'space-between',
              }}>
              <Text style={{color: 'black', fontSize: fontSizes.h3}}>
                Sửa trang trí nhà
              </Text>
              <Text style={{color: colors.spentColor, fontSize: fontSizes.h3}}>
                2,000,000
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ThirdPage;
