import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IHeaderWithoutBtn {
  onCloseClick: () => void;
}

const HeaderWithoutBtn = ({ onCloseClick }: IHeaderWithoutBtn) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onCloseClick}>
        <Ionicons color={'white'} name="close" size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderWithoutBtn;

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
