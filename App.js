import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './navigation/StackNavigation';
import { ContextProviders } from './context/ContextProviders';
import Toast from 'react-native-toast-message';
import { StripeProvider } from '@stripe/stripe-react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StripeProvider publishableKey="pk_test_51Q6Bl6044til73YWs2AFxKil3umGNaZb5UqkQJriOhKTDhDwOzvDCZUIwiwq2hvKdMHLDjyekqm7AVoSTfQyrY3Z00I71DxMa8">
        <ContextProviders>
          <NavigationContainer>
            <StatusBar backgroundColor="transparent" />
            <StackNavigation />
          </NavigationContainer>
        </ContextProviders>
      </StripeProvider>
      <Toast position="bottom" />
    </>
  );
}
