import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import IonIcons from '@expo/vector-icons/Ionicons';

const CreateStoryHeader = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
        marginBottom: 25,
      }}
    >
      <IonIcons name="close" size={24} />
      <Text
        style={{
          fontSize: 18,
          fontWeight: '500',
        }}
      >
        Create Story
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <IonIcons name="settings" size={21} />
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/733416/pexels-photo-733416.jpeg?auto=compress&cs=tinysrgb&w=600',
          }}
          style={{
            height: 30,
            width: 30,
            marginLeft: 12,
            borderRadius: 1000,
          }}
        />
      </View>
    </View>
  );
};

export default CreateStoryHeader;

const styles = StyleSheet.create({});
