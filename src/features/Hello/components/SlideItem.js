import React, {useState} from 'react';
import {Text, View, Image, useWindowDimensions, StyleSheet} from 'react-native';
import {colors, fontSizes} from '../../../constraints';

const SlideItem = props => {
  const {width} = useWindowDimensions();
  const {img, title} = props.item;

  return (
    <View style={[styles.containerItem, {width: width}]}>
      <Image
        source={img}
        style={[styles.slideItemImg, {width, resizeMode: 'contain'}]}
      />
      <View style={styles.slideItemView}>
        <Text style={styles.slideItemText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideItemImg: {flex: 0.75},
  slideItemView: {flex: 0.25},
  slideItemText: {
    paddingHorizontal: 20,
    color: 'black',
    fontSize: fontSizes.h2,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SlideItem;
