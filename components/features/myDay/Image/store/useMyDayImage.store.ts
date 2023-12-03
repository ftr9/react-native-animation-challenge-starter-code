import { create } from 'zustand';

interface IUseMyDayStore {
  activeSelectedImage: string;
  setActiveSelectedImage: (imageUrl: string) => void;

  activeSelectedStickers: string[];
  setActiveSelectedSticker: (imageUrl: string) => void;

  isSelectStickerPortalOpen: boolean;
  openSelectStickerPortal: () => void;
  closeSelectStickerPortal: () => void;

  isDrawingEnabled: boolean;
  setDrawingEnabled: (status: boolean) => void;
}

const useMyDayImageStore = create<IUseMyDayStore>(set => {
  return {
    activeSelectedImage: '',
    setActiveSelectedImage: imageUrl => {
      set(prevState => {
        const newState = { ...prevState };
        newState.activeSelectedImage = imageUrl;
        return newState;
      });
    },

    activeSelectedStickers: [],
    setActiveSelectedSticker: imageUrl => {
      set(prevState => {
        const newState = { ...prevState };
        newState.activeSelectedStickers.push(imageUrl);
        return prevState;
      });
    },

    isSelectStickerPortalOpen: false,
    openSelectStickerPortal: () => {
      set(prevState => {
        const newState = { ...prevState };
        newState.isSelectStickerPortalOpen = true;
        return newState;
      });
    },
    closeSelectStickerPortal: () => {
      set(prevState => {
        const newState = { ...prevState };
        newState.isSelectStickerPortalOpen = false;
        return newState;
      });
    },

    isDrawingEnabled: false,
    setDrawingEnabled(status) {
      set(state => {
        const newState = { ...state };
        newState.isDrawingEnabled = status;
        return newState;
      });
    },
  };
});

export default useMyDayImageStore;
