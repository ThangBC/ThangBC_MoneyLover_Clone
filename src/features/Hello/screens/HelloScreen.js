import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {colors, fontSizes} from '../../../constraints';
import slides from '../components/slides';
import SlideItem from '../components/SlideItem';
import {auth, onAuthStateChanged} from '../../../firebase/firebase';

const HelloScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  const [imgActive, setImgActive] = useState(0);

  const onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setImgActive(slide);
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        navigate('UITab');
      }
    });
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View //-------------HEADER---------------
        style={{
          padding: 10,
          flex: 0.1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Image
          source={require('../../../assets/logo_horizontal.png')}
          style={{width: 145, height: 30, marginLeft: 10}}
          resizeMode={'center'}
        />
        <TouchableOpacity
          onPress={() => {
            alert('Tính năng đang được phát triển');
          }}>
          <Text
            style={{
              backgroundColor: colors.blurColorBlack,
              color: colors.primaryColor,
              paddingHorizontal: 10,
              paddingVertical: 5,
              fontSize: fontSizes.h4,
              fontWeight: 'bold',
              borderRadius: 10,
            }}>
            Tiếng Việt
          </Text>
        </TouchableOpacity>
      </View>

      <View //----------BODY------------
        style={{
          flex: 0.65,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 0.95}}>
          <FlatList
            data={slides}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            renderItem={({item, index}) => {
              return <SlideItem item={item} key={item.id} index={index} />;
            }}
            onScroll={({nativeEvent}) => {
              onchange(nativeEvent);
            }}
          />
        </View>
        <View
          style={{
            flex: 0.05,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {slides.map((item, index) => {
            return (
              <View
                key={item.id}
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor:
                    imgActive == index
                      ? colors.primaryColor
                      : colors.blurColorBlack,
                  borderRadius: 20,
                  marginHorizontal: 5,
                }}
              />
            );
          })}
        </View>
      </View>
      <View //----------FOOTER------------
        style={{alignItems: 'center', flex: 0.25, padding: 10}}>
        <TouchableOpacity
          onPress={() => {
            navigate('RegisterScreen');
          }}
          style={{
            backgroundColor: colors.primaryColor,
            width: '90%',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              padding: 12,
              color: 'white',
              fontWeight: 'bold',
              fontSize: fontSizes.h4,
            }}>
            Đăng ký miễn phí
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate('LoginScreen');
          }}
          style={{
            backgroundColor: colors.blurColorBlack,
            width: '90%',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text
            style={{
              padding: 12,
              color: colors.primaryColor,
              fontWeight: 'bold',
              fontSize: fontSizes.h4,
            }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <Text
          style={{color: 'gray', marginVertical: 20, fontSize: fontSizes.h5}}>
          Bui Cong Thang 123
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HelloScreen;
