import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const SizeSlider = ({
  setPencilStrokeWidth,
  sizeSliderPos,
  setSizeSliderPos,
}: {
  setPencilStrokeWidth: React.Dispatch<React.SetStateAction<number>>;
  sizeSliderPos: number;
  setSizeSliderPos: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const sharedYValue = useSharedValue(0);

  //SET pencilStroke when component mounts because when component re-rerenders all the position is lost....
  useEffect(() => {
    sharedYValue.value = sizeSliderPos;
    return () => {
      setSizeSliderPos(sharedYValue.value);
    };
  }, []);

  const updatePencilStrokeWith = (width: number) => {
    setPencilStrokeWidth(width);
  };

  const panGesture = Gesture.Pan().onUpdate(e => {
    if (e.y >= 15 && e.y <= 150) {
      //FIX: might raise a bug !!!
      runOnJS(updatePencilStrokeWith)((150 / e.y) * 3.5);
      sharedYValue.value = e.y - 150;
    }
  });

  const animatedYPos = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: sharedYValue.value }],
    };
  });

  const animatedYPosAndScale = useAnimatedStyle(() => {
    const scale = interpolate(sharedYValue.value, [0, -135], [0.5, 2.5]);

    return {
      transform: [{ translateY: sharedYValue.value }, { scale: scale }],
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
          style={{
            position: 'absolute',
            height: 150,
            width: 15,
            backgroundColor: 'orange',
          }}
        ></Animated.View>
      </GestureDetector>

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

      <Animated.View
        style={[
          {
            position: 'absolute',
            height: 20,
            left: '-350%',
            bottom: '0%',
            width: 20,
            backgroundColor: 'white',
            borderRadius: 100,
          },
          animatedYPosAndScale,
        ]}
      ></Animated.View>
    </View>
  );
};

export default SizeSlider;

const styles = StyleSheet.create({});
