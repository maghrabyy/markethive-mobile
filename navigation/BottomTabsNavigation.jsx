import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HomeScreen } from '../screens/authenticatedScreens/HomeScreen';
import { StoresScreen } from '../screens/authenticatedScreens/StoresScreen';
import { CategoriesScreen } from '../screens/authenticatedScreens/CategoriesScreen';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { colors } from '../style/colors';
import { StyleSheet } from 'react-native';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabsNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      inactiveColor={colors.light}
      activeColor="white"
      activeIndicatorStyle={{ display: 'none' }}
      barStyle={styles.barTab}
    >
      <Tab.Screen
        name="Stores"
        component={StoresScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Fa5Icon name="store" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FaIcon name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <IonIcon name="grid" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  barTab: {
    backgroundColor: colors.primary,
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: 30,
    bottom: 8,
    marginHorizontal: 8,
  },
});
