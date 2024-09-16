import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './navigation/StackNavigation';
import { ContextProviders } from './context/ContextProviders';

export default function App() {
  return (
    <ContextProviders>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </ContextProviders>
  );
}
