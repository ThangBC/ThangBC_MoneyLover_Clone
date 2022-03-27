import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
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
    <SafeAreaView style={styles.container}>
      <View //-------------HEADER---------------
        style={styles.header}>
        <Image
          source={require('../../../assets/logo_horizontal.png')}
          style={styles.logoHeader}
          resizeMode={'center'}
        />
        <TouchableOpacity
          onPress={() => {
            alert('Tính năng đang được phát triển');
          }}>
          <Text style={styles.textHeader}>Tiếng Việt</Text>
        </TouchableOpacity>
      </View>
      <View //----------BODY------------
        style={styles.body}>
        <View style={styles.bodyView1}>
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
        <View style={styles.bodyView2}>
          {slides.map((item, index) => {
            return (
              <View
                key={item.id}
                style={[
                  styles.slide,
                  {
                    backgroundColor:
                      imgActive == index
                        ? colors.primaryColor
                        : colors.blurColorBlack,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
      <View //----------FOOTER------------
        style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            navigate('RegisterScreen');
          }}
          style={styles.buttonRes}>
          <Text style={styles.textBtnRes}>Đăng ký miễn phí</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate('LoginScreen');
          }}
          style={styles.buttonLogin}>
          <Text style={styles.textBtnLogin}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={styles.textFooter}>Clone By Bui Cong Thang</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    padding: 10,
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoHeader: {width: 145, height: 30, marginLeft: 10},
  textHeader: {
    backgroundColor: colors.blurColorBlack,
    color: colors.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: fontSizes.h4,
    fontWeight: 'bold',
    borderRadius: 10,
  },
  body: {
    flex: 0.65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyView1: {flex: 0.95},
  bodyView2: {
    flex: 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  slide: {
    width: 10,
    height: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  footer: {alignItems: 'center', flex: 0.25, padding: 10},
  buttonRes: {
    backgroundColor: colors.primaryColor,
    width: '90%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtnRes: {
    padding: 12,
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSizes.h4,
  },
  buttonLogin: {
    backgroundColor: colors.blurColorBlack,
    width: '90%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  textBtnLogin: {
    padding: 12,
    color: colors.primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizes.h4,
  },
  textFooter: {color: 'gray', marginVertical: 20, fontSize: fontSizes.h5},
});

export default HelloScreen;
