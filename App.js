import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const fetchCustomers = async () => {
      const snapshot = await getDoc(
        doc(db, 'Customers', '1yg1N0hkrRZZJI1eoKDhej04vGk1'),
      );
      console.log(snapshot.data());
    };
    fetchCustomers();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
