import React from 'react';
import {
  Text,
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {colors, fontSizes} from '../../../constraints';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {FirstPage, SecondPage, ThirdPage} from '..';

const renderScene = SceneMap({
  first: FirstPage,
  second: SecondPage,
  third: ThirdPage,
});

const HomeScreen = props => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'CÁC THÁNG TRƯỚC'},
    {key: 'second', title: 'THÁNG NÀY'},
    {key: 'third', title: 'TƯƠNG LAI'},
  ]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View //------------HEADER------------------
        style={{
          flexDirection: 'row',
          flex: 0.1,
          alignItems: 'center',
          paddingHorizontal: 15,
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 0.2}}>
          <Image
            source={require('../../../assets/wallet_icon.png')}
            style={{width: 35, height: 35}}
          />
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            flex: 0.6,
          }}>
          <Text style={{color: 'gray'}}>Tiền mặt</Text>
          <Text
            style={{
              color: 'black',
              fontSize: fontSizes.h3,
              fontWeight: 'bold',
            }}
            numberOfLines={1}>
            999,999,999,999
            <Text style={{textDecorationLine: 'underline'}}> đ</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 0.2,
            justifyContent: 'space-between',
          }}>
          <Icon name="bell" size={25} color="black" />
          <Icon name="ellipsis-v" size={25} color="black" />
        </View>
      </View>
      <TabView
        style={{flex: 0.9}}
        navigationState={{index, routes}}
        renderScene={renderScene}
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