import { createContext, useContext, useRef } from 'react';

const BottomSheetRefContext = createContext();

export const useBottomSheetRef = () => {
  const { bottomSheetRef } = useContext(BottomSheetRefContext);
  return { bottomSheetRef };
};

export const BottomSheetRefProvider = ({ children }) => {
  const bottomSheetRef = useRef();
  return (
    <BottomSheetRefContext.Provider value={{ bottomSheetRef }}>
      {children}
    </BottomSheetRefContext.Provider>
  );
};
