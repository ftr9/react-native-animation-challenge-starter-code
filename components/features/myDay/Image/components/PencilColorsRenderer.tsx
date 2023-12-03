import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const availablePencilColors = [
  '#f8f9fa',
  '#212529',
  '#82c91e',
  '#ffd43b',
  '#ffa94d',
  '#22b8cf',
  '#339af0',
  '#4c6ef5',
  '#cc5de8',
  '#e64980',
];
const PencilColorsRenderer = React.memo(
  ({
    activeColor,
    setActiveColor,
  }: {
    activeColor: string;
    setActiveColor: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const onPencilItemClick = (color: string) => {
      return () => {
        setActiveColor(color);
      };
    };

    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
          zIndex: 100,
          bottom: '5%',
          left: '0%',
        }}
      >
        <FlatList
          horizontal
          data={availablePencilColors}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({ item }) => {
            return (
              <PencilColorItem
                onClick={onPencilItemClick(item)}
                isActive={activeColor === item}
                background={item}
              />
            );
          }}
        />
      </View>
    );
  }
);

const PencilColorItem = ({
  isActive,
  background,
  onClick,
}: {
  isActive: boolean;
  background: string;
  onClick: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.colorItem, { backgroundColor: background }]}
    >
      {isActive && (
        <View
          style={{
            height: 10,
            width: 10,
            backgroundColor: 'white',
            borderRadius: 100,
          }}
        ></View>
      )}
    </TouchableOpacity>
  );
};

export default PencilColorsRenderer;

const styles = StyleSheet.create({
  colorItem: {
    height: 30,
    width: 30,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
});
