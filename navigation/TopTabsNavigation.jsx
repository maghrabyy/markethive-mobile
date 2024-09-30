import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { HomeScreen } from '../screens/authenticatedScreens/HomeScreen';
import { StoresScreen } from '../screens/authenticatedScreens/StoresScreen';
import { CategoriesScreen } from '../screens/authenticatedScreens/CategoriesScreen';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';
import { StyleSheet } from 'react-native';
import { resH } from '../constants/dimensions';
import SearchScreen from '../screens/authenticatedScreens/SearchScreen';

const Tab = createMaterialTopTabNavigator();

export const TopTabsNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarPosition="bottom"
      backBehavior="initialRoute"
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.dark,
        tabBarStyle: styles.barTab,
      }}
    >
      <Tab.Screen
        name="Stores"
        component={StoresScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Fa5Icon name="store" color={color} size={20} />
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
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <IonIcon name="search" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  barTab: {
    marginTop: resH(0.5),
  },
});
