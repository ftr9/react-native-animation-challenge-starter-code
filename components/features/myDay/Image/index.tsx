import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import useMyDayImageStore from './store/useMyDayImage.store';
import GestureWithPinchDragAndRotate from '../components/GestureWithPinchDragAndRotate';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import StickersRenderer from './components/StickersRenderer';
import { Canvas, Circle } from '@shopify/react-native-skia';
import DrawingBoard from './components/DrawingBoard';

const ImageMyDay = () => {
  const [
    activeSelectedImage,
    isStickersPortalOpen,
    closeSelectStickerPortal,
    openSelectStickerPortal,
    activeSelectedStickers,
    isDrawingEnabled,
    setDrawingEnabled,
  ] = useMyDayImageStore(store => [
    store.activeSelectedImage,
    store.isSelectStickerPortalOpen,
    store.closeSelectStickerPortal,
    store.openSelectStickerPortal,
    store.activeSelectedStickers,
    store.isDrawingEnabled,
    store.setDrawingEnabled,
  ]);

  useEffect(() => {
    const backPressHandle = () => {
      if (isStickersPortalOpen) {
        closeSelectStickerPortal();
        return true;
      }

      return false;
    };
    BackHandler.addEventListener('hardwareBackPress', backPressHandle);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backPressHandle);
    };
  }, [isStickersPortalOpen]);

  return (
    <LinearGradient
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
      colors={['#212529', '#adb5bd']}
    >
      <StatusBar backgroundColor={'#212529'} barStyle={'light-content'} />

      <Image
        resizeMode="cover"
        style={{
          height: Dimensions.get('screen').height,
          width: Dimensions.get('screen').width,
        }}
        source={{
          uri: activeSelectedImage,
        }}
      />

      <DrawingBoard isEnabled={isDrawingEnabled} />

      {activeSelectedStickers.map((sticker, index) => {
        return (
          <GestureWithPinchDragAndRotate
            disablePanGesture={false}
            disablePinchGesture={false}
            disableRotationGesture={false}
            key={index}
            mainContainerStyle={{
              height: 80,
              width: 80,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{ translateX: -40 }, { translateY: -40 }],
            }}
          >
            <Image
              style={{
                height: '100%',
                width: '100%',
              }}
              source={{ uri: sticker }}
            />
          </GestureWithPinchDragAndRotate>
        );
      })}

      {!isDrawingEnabled && (
        <View
          style={{
            position: 'absolute',
            right: '2%',
            top: '3%',
          }}
        >
          <TouchableOpacity
            onPress={openSelectStickerPortal}
            style={styles.addonContainer}
          >
            <Text style={styles.addonText}>Stickers</Text>
            <Ionicons name="happy-outline" color={'white'} size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addonContainer}>
            <Text style={styles.addonText}>Text</Text>
            <Ionicons name="star-outline" size={24} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addonContainer}>
            <Text style={styles.addonText}>Music</Text>
            <Ionicons name="musical-notes-outline" size={24} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addonContainer}>
            <Text style={styles.addonText}>Effects</Text>
            <Ionicons name="star-outline" size={24} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDrawingEnabled(true)}
            style={styles.addonContainer}
          >
            <Text style={styles.addonText}>Draw</Text>
            <Ionicons
              name="git-pull-request-outline"
              size={24}
              color={'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addonContainer}>
            <Text style={styles.addonText}>Tag People</Text>
            <Ionicons name="person-outline" size={24} color={'white'} />
          </TouchableOpacity>
        </View>
      )}

      {isStickersPortalOpen && <StickersRenderer />}
    </LinearGradient>
  );
};

export default ImageMyDay;

const styles = StyleSheet.create({
  addonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addonText: {
    marginRight: 5,
    color: 'white',
    fontSize: 14,
  },
});
