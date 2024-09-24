import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './navigation/StackNavigation';
import { ContextProviders } from './context/ContextProviders';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <ContextProviders>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </ContextProviders>
      <Toast position="bottom" />
    </>
  );
}
