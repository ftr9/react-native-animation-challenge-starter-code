import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const ShareMyDay = () => {
  return (
    <View
      style={{
        width: '100%',
        position: 'absolute',
        bottom: '5%',
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <Ionicons color={'white'} name="person-circle-outline" size={24} />
        <Text style={{ color: 'white' }}>Privacy</Text>
      </View>
      <TouchableOpacity
        style={{
          paddingHorizontal: 35,
          paddingVertical: 15,
          backgroundColor: '#339af0',
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
          }}
        >
          Share
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareMyDay;

const styles = StyleSheet.create({});
