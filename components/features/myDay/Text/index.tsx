import {
  TextInput,
  Keyboard,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import ColorPaletteSelection from './components/ColorPaletteSelection';
import HeaderWithBtn from './components/HeaderWithBtn';
import HeaderWithoutBtn from './components/HeaderWithoutBtn';
import BgOverlay from './components/BgOverlay';
import { BG_COLORS } from './data';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetActionItem from './components/BottomSheetActionItem';
import { Ionicons } from '@expo/vector-icons';
import GestureWithPinchDragAndRotate from '../components/GestureWithPinchDragAndRotate';
import ShareMyDay from './components/ShareMyDay';

const MyDayWithText = () => {
  const router = useRouter();

  const [activeBg, setActiveBg] = useState(BG_COLORS[0]);
  const [isContentEdited, setIsContendEdited] = useState(false);
  const [isDiscardAlertPopupVisible, setDiscardAlertPopupVisible] =
    useState(false);
  const [txtValue, setTxtValue] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  //FIX: Annoying Typescript Bug while Referencing TextInput Field
  const txtInputRef = useRef<any>(null);

  const inputChangeHandle = (val: string) => {
    setTxtValue(val);
    setIsContendEdited(true);
  };

  const closeMyDayClickHandle = () => {
    if (isContentEdited) {
      setDiscardAlertPopupVisible(true);
    }
  };

  const bottomSheetCloseHandle = () => {
    setDiscardAlertPopupVisible(false);
  };

  const keyboardDidShowHandle = () => {
    setKeyboardVisible(true);
  };
  const keyboardDidHideHandle = () => {
    setKeyboardVisible(false);
    txtInputRef.current.blur();
    if (txtValue.length === 0) {
      router.back();
    }
  };

  const onDoneBtnClick = () => {
    setKeyboardVisible(false);
    txtInputRef.current.blur();
  };

  //Immediately show keyboard when we first enter
  useEffect(() => {
    if (txtInputRef.current) {
      txtInputRef.current.focus();
    }
  }, []);

  //keyboard show event
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShowHandle
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  //keyboardhide event : if there is no inputValue after keyboard is hidden navigate back to main page !!!!
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHideHandle
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, [txtValue]);

  return (
    <LinearGradient
      style={style.mainContainer}
      colors={activeBg}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <StatusBar backgroundColor="black" style="light" />
      {/**Body Part */}
      {isKeyboardVisible ? (
        <HeaderWithBtn
          onBtnClick={onDoneBtnClick}
          isBtnDisabled={txtValue.length === 0}
          onCloseClick={closeMyDayClickHandle}
        />
      ) : (
        <HeaderWithoutBtn onCloseClick={closeMyDayClickHandle} />
      )}
      {/**Body Part */}
      {(isKeyboardVisible || isDiscardAlertPopupVisible) && <BgOverlay />}
      {isKeyboardVisible && (
        <ColorPaletteSelection activeBg={activeBg} setActiveBg={setActiveBg} />
      )}
      {!isKeyboardVisible && <ShareMyDay />}
      <GestureWithPinchDragAndRotate
        disablePanGesture={false}
        disablePinchGesture={false}
        disableRotationGesture={false}
        mainContainerStyle={{
          //backgroundColor: 'blue',
          minHeight: 100,
          justifyContent: 'center',
          alignItems: 'center',
          width: Dimensions.get('screen').width * 2,
        }}
      >
        <TextInput
          ref={txtInputRef}
          style={style.textInput}
          placeholderTextColor={'rgba(214, 214, 214, 0.5)'}
          selectionColor={'white'}
          multiline
          onChangeText={inputChangeHandle}
          placeholder="Start typing"
          value={txtValue}
        />
      </GestureWithPinchDragAndRotate>
      {/**Bottom Sheet */}
      {isDiscardAlertPopupVisible && (
        <BottomSheet
          onClose={bottomSheetCloseHandle}
          enablePanDownToClose
          enableOverDrag
          snapPoints={['32%']}
          style={{
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
            }}
          >
            Discard Story ?
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 10, color: '#868e96' }}>
            You'll lose this story and changes you've made to it.
          </Text>
          <BottomSheetActionItem
            onClick={bottomSheetCloseHandle}
            Icon={<Ionicons name="pencil-sharp" size={18} />}
            text="Keep editing"
          />
          <BottomSheetActionItem
            onClick={() => {
              router.back();
            }}
            Icon={<Ionicons name="trash" size={18} />}
            text="Discard story"
          />
        </BottomSheet>
      )}
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    marginHorizontal: 20,
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '500',
    width: 250,
  },
});

export default MyDayWithText;
