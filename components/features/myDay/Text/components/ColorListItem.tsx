import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
interface IColorListItemProps {
  color: string[];
  onClickHandle: () => void;
  isActive: boolean;
}

const ColorListItem = ({
  color,
  onClickHandle,
  isActive,
}: IColorListItemProps) => {
  return (
    <TouchableOpacity onPress={onClickHandle}>
      <LinearGradient
        colors={color}
        style={{
          height: 35,
          width: 35,
          borderRadius: 100,
          backgroundColor: 'red',
          borderWidth: 5,
          borderColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isActive && (
          <View
            style={{
              height: 5,
              width: 5,
              borderRadius: 100,
              backgroundColor: 'white',
            }}
          ></View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ColorListItem;

const styles = StyleSheet.create({});
