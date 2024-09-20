
import { StyleSheet, Text, View } from 'react-native';

import Stores from './Slice/Stores';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Categories from './Slice/Categories';
import { NavigationContainer } from '@react-navigation/native';
import { CatContextProvider } from './Context/CatContextProvider';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <CatContextProvider >
    <NavigationContainer>
    <Tab.Navigator>
    <Tab.Screen name="categories" component={Categories} />
    <Tab.Screen name="stores" component={Stores} />
  </Tab.Navigator>
  </NavigationContainer>
  </CatContextProvider>
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
