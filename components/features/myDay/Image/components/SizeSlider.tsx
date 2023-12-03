import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const SizeSlider = () => {
  const sharedYValue = useSharedValue(0);
  const finalYShared = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      console.log(e.translationY);
      sharedYValue.value = e.translationY + finalYShared.value;
    })
    .onFinalize(e => {
      finalYShared.value = sharedYValue.value;
    });

  const animatedYPos = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: sharedYValue.value }],
    };
  });

  return (
    <View
      style={{
        position: 'absolute',
        right: '8%',
        top: '30%',
        height: 150,
        width: 15,
        backgroundColor: 'red',
      }}
    >
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: '0%',
              height: 15,
              width: 15,
              borderRadius: 1000,
              backgroundColor: 'white',
            },
            animatedYPos,
          ]}
        ></Animated.View>
      </GestureDetector>

      <Animated.View
        style={[
          {
            position: 'absolute',
            height: 20,
            left: '-250%',
            bottom: '0%',
            width: 20,
            backgroundColor: 'white',
            borderRadius: 100,
          },
          animatedYPos,
        ]}
      ></Animated.View>
    </View>
  );
};

export default SizeSlider;

const styles = StyleSheet.create({});
