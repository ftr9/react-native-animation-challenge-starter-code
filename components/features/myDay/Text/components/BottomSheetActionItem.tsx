import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface IBottomSheetActionItemProps {
  Icon: React.JSX.Element;
  text: string;
  onClick: () => void;
}

const BottomSheetActionItem = ({
  Icon,
  text,
  onClick,
}: IBottomSheetActionItemProps) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        paddingVertical: 2,
      }}
    >
      <View
        style={{
          height: 40,
          width: 40,
          backgroundColor: '#e9ecef',
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {Icon}
      </View>
      <Text
        style={{
          marginLeft: 10,
          fontSize: 16,
          fontWeight: '500',
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default BottomSheetActionItem;

const styles = StyleSheet.create({});
