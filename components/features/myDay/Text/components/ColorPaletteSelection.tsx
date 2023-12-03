import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import ColorListItem from './ColorListItem';
import ColorListRenderer from './ColorListRenderer';

interface IColorPaletteSelectionProps {
  activeBg: string[];
  setActiveBg: React.Dispatch<React.SetStateAction<string[]>>;
}

const ColorPaletteSelection = ({
  setActiveBg,
  activeBg,
}: IColorPaletteSelectionProps) => {
  const [isColorListVisible, setColorListVisible] = useState(false);

  const activeColorItemClickHandle = () => {
    setColorListVisible(true);
  };

  const closeColorListClickHandle = () => {
    setColorListVisible(false);
  };

  const colorListItemClickHandle = (colors: string[]) => {
    return () => {
      setActiveBg(colors);
    };
  };

  return (
    <>
      {!isColorListVisible ? (
        <View style={styles.colorPaletteContainer}>
          <ColorListItem
            isActive
            color={activeBg}
            onClickHandle={activeColorItemClickHandle}
          />

          <View style={styles.fullRoundedBtn}>
            <Text style={{ textAlign: 'center', color: 'white' }}>simple</Text>
          </View>
        </View>
      ) : (
        <View style={styles.colorPaletteContainer}>
          <ColorListRenderer
            closeColorListHandle={closeColorListClickHandle}
            colorListItemClickHandle={colorListItemClickHandle}
            activeBg={activeBg}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  colorPaletteContainer: {
    width: '100%',
    position: 'absolute',
    bottom: '5%',
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullRoundedBtn: {
    width: 120,
    padding: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
    marginLeft: 25,
  },
});

export default ColorPaletteSelection;
