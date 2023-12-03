import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const PrimaryBtn = ({
  children,
  onClick,
}: {
  onClick: () => void;
  children: string;
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        backgroundColor: '#212529',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          color: 'white',
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryBtn;

const styles = StyleSheet.create({});
