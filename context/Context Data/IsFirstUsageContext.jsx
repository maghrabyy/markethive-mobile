import { createContext, useState, useEffect, useContext } from 'react';
import storage from '../../storage';

const IsFirstUsageContext = createContext();

export const useIsFirstUsage = () => {
  return useContext(IsFirstUsageContext);
};

export const IsFirstUsageProvider = ({ children }) => {
  const [isFirstUsage, setIsFirstUsage] = useState(null);
  const [isAsyncStorageLoading, setIsAsyncStorageLoading] = useState(true);
  useEffect(() => {
    const fetchIsFirstUsageFromStorage = async () => {
      try {
        const asyncStorageData = await storage.load({ key: 'firstUsage' });
        setIsFirstUsage(asyncStorageData);
        setIsAsyncStorageLoading(false);
      } catch (error) {
        setIsAsyncStorageLoading(false);
      }
    };
    fetchIsFirstUsageFromStorage();
  }, []);
  return (
    <IsFirstUsageContext.Provider
      value={{ isFirstUsage, isAsyncStorageLoading, setIsFirstUsage }}
    >
      {children}
    </IsFirstUsageContext.Provider>
  );
};
