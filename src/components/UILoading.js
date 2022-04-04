import React, {useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../constraints/';

const UILoading = props => {
  const {isModalVisible} = props;
  return (
    <Modal isVisible={isModalVisible} animationType="slide">
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 20,
          width: '50%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={colors.primaryColor} />
        <Text style={{color: 'black', marginTop: 10}}>Vui lòng đợi...</Text>
      </View>
    </Modal>
  );
};

export default UILoading;
