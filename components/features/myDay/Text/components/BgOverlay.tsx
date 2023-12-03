import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';

const BgOverlay = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
      }}
    ></View>
  );
};

export default BgOverlay;

const styles = StyleSheet.create({});
