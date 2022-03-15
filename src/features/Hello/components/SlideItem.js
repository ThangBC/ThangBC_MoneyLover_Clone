import React, {useState} from 'react';
import {Text, View, Image, useWindowDimensions} from 'react-native';
import {colors, fontSizes} from '../../../constraints';

const SlideItem = props => {
  const {width} = useWindowDimensions();
  const {img, title} = props.item;

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
        },
      ]}>
      <Image
        source={img}
        style={[{flex: 0.75}, {width, resizeMode: 'contain'}]}
      />
      <View style={{flex: 0.25}}>
        <Text
          style={{
            paddingHorizontal: 20,
            color: 'black',
            fontSize: fontSizes.h2,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};
export default SlideItem;
