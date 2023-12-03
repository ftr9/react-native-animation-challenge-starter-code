import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IHeaderWithBtnClick {
  onCloseClick: () => void;
  isBtnDisabled: boolean;
  onBtnClick: () => void;
}

const HeaderWithBtn = ({
  onCloseClick,
  onBtnClick,
  isBtnDisabled,
}: IHeaderWithBtnClick) => {
  return (
    <View style={styles.headerContainer}>
      <Ionicons onPress={onCloseClick} color={'white'} name="close" size={28} />
      <TouchableOpacity
        onPress={onBtnClick}
        style={{
          backgroundColor: isBtnDisabled ? '#495057' : '#212529',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 5,
        }}
        disabled={isBtnDisabled}
      >
        <Text
          style={{
            color: 'white',
          }}
        >
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 1000,
    position: 'absolute',
    top: '2%',
    left: 0,
    padding: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HeaderWithBtn;
