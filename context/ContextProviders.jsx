import { IsFirstUsageProvider } from './Context Data/IsFirstUsageContext';

export const ContextProviders = ({ children }) => {
  return <IsFirstUsageProvider>{children}</IsFirstUsageProvider>;
};
