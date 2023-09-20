import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/Colors';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const MainPage = () => {
  const translationYSharedValue = useSharedValue(0);
  const translationXSharedValue = useSharedValue(0);
  const lastPositionY = useSharedValue(0);
  const lastPostitionX = useSharedValue(0);

  const translationAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translationYSharedValue.value },
        { translateX: translationXSharedValue.value },
      ],
    };
  });

  const panGesture = Gesture.Pan()

    .onChange(e => {
      translationYSharedValue.value = lastPositionY.value + e.translationY;
      translationXSharedValue.value = lastPostitionX.value + e.translationX;
    })
    .onFinalize(e => {
      lastPositionY.value = translationYSharedValue.value;
      lastPostitionX.value = translationXSharedValue.value;
    });

  return (
    <View>
      <Text
        style={{
          fontWeight: '800',
          fontSize: 30,
        }}
      >
        REACT NATIVE
      </Text>
      <Ionicons name={'logo-react'} size={30} />

      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 36,
        }}
      >
        REACT NATIVE
      </Text>
      <Ionicons name={'logo-react'} size={36} />

      {/**Gesture detector */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            {
              height: 100,
              width: 100,
              backgroundColor: 'red',
            },
            translationAnimatedStyle,
          ]}
        >
          <Text>Long press me and move </Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({});
