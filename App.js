import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import OnboardingScreen from './Screens/OnboardingScreen';

export default function App() {
  const [showHomePage, setShowHomePage] = useState(false);

  if (!showHomePage) {
    return <OnboardingScreen setShowHomePage={setShowHomePage} />;
  }

  return (
    <View style={styles.container}>
      <Text> Home Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
