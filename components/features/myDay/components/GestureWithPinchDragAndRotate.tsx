import { StyleSheet, Dimensions, ViewStyle, StyleProp } from 'react-native';
import React from 'react';
import { useSharedValue } from 'react-native-reanimated';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const GestureWithPinchDragAndRotate = ({
  children,
  mainContainerStyle,
  disablePanGesture,
  disablePinchGesture,
  disableRotationGesture,
}: {
  children: React.ReactNode;
  mainContainerStyle: StyleProp<ViewStyle>;
  disablePanGesture: boolean;
  disablePinchGesture: boolean;
  disableRotationGesture: boolean;
}) => {
  const xSharedValue = useSharedValue(0);
  const ySharedValue = useSharedValue(0);
  const finalXSharedValue = useSharedValue(0);
  const finalYSharedValue = useSharedValue(0);
  const scaleSharedValue = useSharedValue(1);
  const rotationSharedValue = useSharedValue(0);
  const finalRotationSharedValue = useSharedValue(0);

  const animatedXAndYPosWithRotationAndScale = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: xSharedValue.value },
        { translateY: ySharedValue.value },
        { scale: scaleSharedValue.value },
        { rotate: `${rotationSharedValue.value}deg` },
      ],
    };
  });

  const panGesture = Gesture.Pan()
    .onChange(e => {
      xSharedValue.value = e.translationX + finalXSharedValue.value;
      ySharedValue.value = e.translationY + finalYSharedValue.value;
    })
    .onEnd(e => {
      finalXSharedValue.value = xSharedValue.value;
      finalYSharedValue.value = ySharedValue.value;
    })
    .enabled(false);

  const pinchGesture = Gesture.Pinch().onChange(e => {
    scaleSharedValue.value = e.scale;
  });

  const rotationGesture = Gesture.Rotation()
    .onChange(e => {
      rotationSharedValue.value =
        e.rotation * 100 + finalRotationSharedValue.value;
    })
    .onEnd(e => {
      finalRotationSharedValue.value = rotationSharedValue.value;
    });

  return (
    <GestureDetector
      gesture={Gesture.Simultaneous(
        disablePanGesture
          ? panGesture.enabled(false)
          : panGesture.enabled(true),
        disablePinchGesture
          ? pinchGesture.enabled(false)
          : pinchGesture.enabled(true),
        disableRotationGesture
          ? rotationGesture.enabled(false)
          : rotationGesture.enabled(true)
      )}
    >
      <Animated.View
        style={[animatedXAndYPosWithRotationAndScale, mainContainerStyle]}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export default GestureWithPinchDragAndRotate;

const styles = StyleSheet.create({});
