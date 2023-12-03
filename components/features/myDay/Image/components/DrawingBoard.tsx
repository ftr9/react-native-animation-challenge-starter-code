import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Canvas, Group, Path } from '@shopify/react-native-skia';
import { runOnJS } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import PencilColorsRenderer from './PencilColorsRenderer';
import useMyDayImageStore from '../store/useMyDayImage.store';
import PrimaryBtn from './PrimaryBtn';
import SizeSlider from './SizeSlider';

interface IPath {
  segments: string[];
  color: string;
}

enum DRAWINGMODE {
  PENCIL = 'pencil',
  ERASER = 'eraser',
}

const DrawingBoard = ({ isEnabled }: { isEnabled: boolean }) => {
  const [path, setPaths] = useState<IPath[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingMode, setDrawingMode] = useState(DRAWINGMODE.PENCIL);
  const [activeColor, setActiveColor] = useState('#f8f9fa');

  //BOOELAN
  const isInDrawingMode = drawingMode === DRAWINGMODE.PENCIL;
  const isInErasingMode = drawingMode === DRAWINGMODE.ERASER;

  const setDrawingEnabled = useMyDayImageStore(
    state => state.setDrawingEnabled
  );

  const makeNewPathPoint = (xCoord: number, yCoord: number) => {
    const newPath = [...path];
    newPath.unshift({
      segments: [`M ${xCoord} ${yCoord}`],
      color: activeColor,
    });
    setPaths(newPath);
    setIsDrawing(true);
  };

  const drawPathFromNewPoint = (xCoord: number, yCoord: number) => {
    const newPath = [...path];
    if (newPath[0]?.segments) {
      newPath[0].segments.push(`L ${xCoord} ${yCoord}`);
      setPaths(newPath);
    }
  };

  const makeIsDrawingFalse = () => {
    setIsDrawing(false);
  };

  const panGesture = Gesture.Pan()
    .onBegin(e => {
      runOnJS(makeNewPathPoint)(e.x, e.y);
    })
    .onUpdate(e => {
      runOnJS(drawPathFromNewPoint)(e.x, e.y);
    })
    .onFinalize(e => {
      runOnJS(makeIsDrawingFalse)();
    })
    .enabled(isEnabled);

  const undoClickHandle = () => {
    if (path.length !== 0) {
      const newPath = [...path];
      newPath.shift();
      setPaths(newPath);
    }
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        //backgroundColor: 'black',
        left: 0,
      }}
    >
      <GestureDetector gesture={panGesture}>
        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            //backgroundColor: 'black',
            left: 0,
          }}
        >
          <Canvas
            style={{
              height: '100%',
              width: '100%',
            }}
          >
            <Group blendMode={'clear'}>
              {path.map((loc, idx) => {
                return (
                  <Path
                    blendMode={'overlay'}
                    key={idx}
                    path={loc.segments.join(' ')}
                    strokeWidth={5}
                    style={'stroke'}
                    color={loc.color}
                  />
                );
              })}
            </Group>
          </Canvas>
        </View>
      </GestureDetector>
      {isEnabled && !isDrawing && (
        <PencilColorsRenderer
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
      )}
      {isEnabled && !isDrawing && <SizeSlider />}
      {isEnabled && !isDrawing && (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: '2%',
            width: '100%',
            paddingHorizontal: 10,
            left: 0,
            justifyContent: 'space-between',
            zIndex: 100,
          }}
        >
          <PrimaryBtn onClick={undoClickHandle}>Undo</PrimaryBtn>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setDrawingMode(DRAWINGMODE.PENCIL);
              }}
              style={[styles.roundedBtn, isInDrawingMode && styles.activeBg]}
            >
              <Ionicons
                name="trending-up-outline"
                color={isInDrawingMode ? 'black' : 'white'}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDrawingMode(DRAWINGMODE.ERASER);
              }}
              style={[styles.roundedBtn, isInErasingMode && styles.activeBg]}
            >
              <Ionicons
                name="clipboard-outline"
                size={24}
                color={isInErasingMode ? 'black' : 'white'}
              />
            </TouchableOpacity>
            <PrimaryBtn onClick={() => setDrawingEnabled(false)}>
              Done
            </PrimaryBtn>
          </View>
        </View>
      )}
    </View>
  );
};

export default DrawingBoard;

const styles = StyleSheet.create({
  roundedBtn: {
    height: 40,
    width: 40,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 1000,
  },
  activeBg: {
    backgroundColor: 'white',
  },
});
