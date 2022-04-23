import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  useWindowDimensions,
  Image,
  SafeAreaView,
  BackHandler,
  Alert,
  StyleSheet,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {fontSizes} from '../../../constraints';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FirstPage, SecondPage, ThirdPage} from '../';
import {
  auth,
  collection,
  db,
  query,
  where,
  onSnapshot,
} from '../../../firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {formatMoney} from '../../../utils/validations';

const HomeScreen = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(1);
  const [user, setUser] = useState({});

  const [routes] = useState([
    {key: 'first', title: 'CÁC THÁNG TRƯỚC'},
    {key: 'second', title: 'THÁNG NÀY'},
    {key: 'third', title: 'TƯƠNG LAI'},
  ]);

  //---------------- Hardware Back Button -----------------
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

  //--------------------- GET USER ------------------------
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
          infor.totalMoney = formatMoney(doc.data().moneyTotal);
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
      unsubcribe;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View //---------------HEADER-----------------
        style={styles.headerView}>
        <View style={styles.imgView}>
          <Image
            source={require('../../../assets/wallet_icon.png')}
            style={styles.imgIcon}
          />
        </View>

        <View style={styles.totalMoneyView}>
          <Text style={styles.totalMoneyText}>{user.nameWallet}</Text>
          <Text style={styles.totalMoney} numberOfLines={1}>
            {user.totalMoney} ₫
          </Text>
        </View>
        <View style={styles.iconRightView}>
          <Icon name="bell" size={25} color="black" />
          <Icon name="ellipsis-v" size={25} color="black" />
        </View>
      </View>

      <TabView
        style={styles.tabView}
        navigationState={{index, routes}}
        renderScene={({route, jumpTo}) => {
          switch (route.key) {
            case 'first':
              return (
                <FirstPage
                  navigation={props.navigation}
                  route={route}
                  nameWallet={user.nameWallet}
                />
              );
            case 'second':
              return (
                <SecondPage
                  navigation={props.navigation}
                  route={route}
                  nameWallet={user.nameWallet}
                />
              );
            case 'third':
              return (
                <ThirdPage
                  navigation={props.navigation}
                  route={route}
                  nameWallet={user.nameWallet}
                />
              );
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
                style={[
                  styles.tabBarText,
                  {color: focused ? 'black' : 'gray'},
                ]}>
                {route.title}
              </Text>
            )}
            indicatorStyle={{
              backgroundColor: 'black',
              height: 1,
            }}
            style={styles.tabBar}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  headerView: {
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  imgIconView: {flex: 0.15},
  imgIcon: {width: 35, height: 35},
  totalMoneyView: {
    flexDirection: 'column',
    flex: 0.7,
  },
  totalMoneyText: {color: 'gray'},
  totalMoney: {
    color: 'black',
    fontSize: fontSizes.h3,
    fontWeight: 'bold',
  },
  iconRightView: {
    flexDirection: 'row',
    flex: 0.15,
    justifyContent: 'space-between',
  },
  tabView: {flex: 1},
  tabBarText: {
    textAlign: 'center',
  },
  tabBar: {backgroundColor: 'white'},
});

export default HomeScreen;
