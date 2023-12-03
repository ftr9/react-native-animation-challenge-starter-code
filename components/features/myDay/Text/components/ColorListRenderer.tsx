import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BG_COLORS } from '../data';
import { Ionicons } from '@expo/vector-icons';
import ColorListItem from './ColorListItem';

interface IColorListRenderer {
  closeColorListHandle: () => void;
  colorListItemClickHandle: (colors: string[]) => () => void;
  activeBg: string[];
}

const ColorListRenderer = ({
  closeColorListHandle,
  colorListItemClickHandle,
  activeBg,
}: IColorListRenderer) => {
  return (
    <>
      <Ionicons
        onPress={closeColorListHandle}
        color={'white'}
        name="close-circle-outline"
        size={35}
      />
      {BG_COLORS.map(colors => {
        return (
          <View key={colors.join('')} style={{ marginHorizontal: 5 }}>
            <ColorListItem
              onClickHandle={colorListItemClickHandle(colors)}
              color={colors}
              isActive={activeBg[0] === colors[0] && activeBg[1] === colors[1]}
            />
          </View>
        );
      })}
    </>
  );
};

export default ColorListRenderer;

const styles = StyleSheet.create({});
