import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  useWindowDimensions,
  Image,
  SafeAreaView,
  BackHandler,
  Alert,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {colors, fontSizes} from '../../../constraints';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FirstPage, SecondPage, ThirdPage} from '../';
import {
  auth,
  collection,
  db,
  query,
  where,
  getDocs,
  onSnapshot,
} from '../../../firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState({});

  console.log(`Người dùng:  ${JSON.stringify(user)}`);

  const [routes] = useState([
    {key: 'first', title: 'CÁC THÁNG TRƯỚC'},
    {key: 'second', title: 'THÁNG NÀY'},
    {key: 'third', title: 'TƯƠNG LAI'},
  ]);

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        Alert.alert('Thoát', 'Bạn có chắc muốn thoát ứng dụng ?', [
          {
            text: 'Hủy',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Thoát',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      }
    };
    const backHandle = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandle.remove();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, 'users'),
      where('id', '==', auth.currentUser?.uid),
    );
    const unsubcribe = onSnapshot(q, async snapshot => {
      try {
        const infor = new Object();
        let getId = '';
        let getmoneyTotal = '';
        snapshot.docs.map(doc => {
          infor.nameWallet = doc.data().walletName;
          infor.totalMoney = doc.data().moneyTotal;
          getId = doc.id;
          getmoneyTotal = doc.data().moneyTotal;
        });
        setUser(infor);
        await AsyncStorage.setItem('userId', getId);
        await AsyncStorage.setItem('moneyTotal', getmoneyTotal.toString());
      } catch (error) {
        console.log(error);
      }
    });
    return () => {
      unsubcribe();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View //---------------HEADER-----------------
        style={{
          flexDirection: 'row',
          height: 55,
          alignItems: 'center',
          paddingHorizontal: 15,
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}>
        <View style={{flex: 0.15}}>
          <Image
            source={require('../../../assets/wallet_icon.png')}
            style={{width: 35, height: 35}}
          />
        </View>

        <View
          style={{
            flexDirection: 'column',
            flex: 0.7,
          }}>
          <Text style={{color: 'gray'}}>{user.nameWallet}</Text>
          <Text
            style={{
              color: 'black',
              fontSize: fontSizes.h3,
              fontWeight: 'bold',
            }}
            numberOfLines={1}>
            {user.totalMoney} ₫
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 0.15,
            justifyContent: 'space-between',
          }}>
          <Icon name="bell" size={25} color="black" />
          <Icon name="ellipsis-v" size={25} color="black" />
        </View>
      </View>

      <TabView
        style={{flex: 1}}
        navigationState={{index, routes}}
        renderScene={({route, jumpTo}) => {
          switch (route.key) {
            case 'first':
              return <FirstPage navigation={props.navigation} route={route} />;
            case 'second':
              return <SecondPage navigation={props.navigation} route={route} />;
            case 'third':
              return <ThirdPage navigation={props.navigation} route={route} />;
            default:
              return null;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={({route, color, focused}) => (
              <Text
                style={{
                  color: focused ? 'black' : 'gray',
                  textAlign: 'center',
                }}>
                {route.title}
              </Text>
            )}
            indicatorStyle={{
              backgroundColor: 'black',
              height: 1,
            }}
            style={{backgroundColor: 'white'}}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
