import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import useMyDayImageStore from '../store/useMyDayImage.store';

const stickers = [
  'https://cdn-icons-png.flaticon.com/256/7650/7650334.png',
  'https://cdn-icons-png.flaticon.com/256/7650/7650331.png',
  'https://cdn-icons-png.flaticon.com/256/6133/6133450.png',
  'https://cdn-icons-png.flaticon.com/256/9472/9472994.png',
  'https://cdn-icons-png.flaticon.com/256/6663/6663880.png',
  'https://cdn-icons-png.flaticon.com/256/11010/11010901.png',
  'https://cdn-icons-png.flaticon.com/256/6381/6381582.png',
  'https://cdn-icons-png.flaticon.com/256/6381/6381566.png',
  'https://cdn-icons-png.flaticon.com/256/6381/6381564.png',
  'https://cdn-icons-png.flaticon.com/256/6381/6381554.png',
  'https://cdn-icons-png.flaticon.com/256/9616/9616996.png',
  'https://cdn-icons-png.flaticon.com/256/11807/11807650.png',
  'https://cdn-icons-png.flaticon.com/256/6717/6717616.png',
  'https://cdn-icons-png.flaticon.com/256/6032/6032440.png',
  'https://cdn-icons-png.flaticon.com/256/4651/4651969.png',
  'https://cdn-icons-png.flaticon.com/256/4681/4681642.png',
  'https://cdn-icons-png.flaticon.com/256/4433/4433152.png',
  'https://cdn-icons-png.flaticon.com/256/4359/4359712.png',
  'https://cdn-icons-png.flaticon.com/256/4359/4359999.png',
  'https://cdn-icons-png.flaticon.com/256/6519/6519539.png',
  'https://cdn-icons-png.flaticon.com/256/7603/7603379.png',
  'https://cdn-icons-png.flaticon.com/256/7504/7504031.png',
];

const StickersRenderer = () => {
  const [setActiveSelectedSticker, closeSelectStickerPortal] =
    useMyDayImageStore(store => [
      store.setActiveSelectedSticker,
      store.closeSelectStickerPortal,
    ]);

  const onStickerItemClick = (imageUrl: string) => {
    setActiveSelectedSticker(imageUrl);
    closeSelectStickerPortal();
  };

  return (
    <View
      style={{
        position: 'absolute',
        height: '85%',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        bottom: 0,
        backgroundColor: 'black',
        paddingVertical: 20,
        paddingHorizontal: 10,
      }}
    >
      <FlatList
        style={{
          flex: 1,
        }}
        numColumns={3}
        data={stickers}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => onStickerItemClick(item)}
              style={{
                width: '33.3%',
                height: 100,
              }}
            >
              <Image
                source={{
                  uri: item,
                }}
                style={{
                  height: '80%',
                  width: '80%',
                  resizeMode: 'contain',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              ></Image>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default StickersRenderer;

const styles = StyleSheet.create({});
