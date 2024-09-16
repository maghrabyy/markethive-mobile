import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingScreen } from '../screens/unauthenticatedScreens/OnboardingScreen';
import { WelcomeScreen } from '../screens/unauthenticatedScreens/WelcomePage';
import { LoginScreen } from '../screens/unauthenticatedScreens/LoginScreen';
import { RegisterScreen } from '../screens/unauthenticatedScreens/RegisterScreen';
import { BottomTabsNavigation } from './BottomTabsNavigation';
import { ShoppingCartScreen } from '../screens/authenticatedScreens/ShoppingCartScreen';
import { ProfileScreen } from '../screens/authenticatedScreens/ProfileScreen';
import { routes } from '../routes/routes';
import { ScreenLoader } from '../components/ScreenLoader';
import { useIsFirstUsage } from '../context/Context Data/IsFirstUsageContext';
import { CustomAppBar } from '../components/CustomerAppbar';

const Stack = createStackNavigator();

export const StackNavigation = () => {
  const { isFirstUsage, isAsyncStorageLoading } = useIsFirstUsage();
  return isAsyncStorageLoading ? (
    <ScreenLoader />
  ) : (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen
        name={routes.welcomeScreen}
        component={isFirstUsage === null ? OnboardingScreen : WelcomeScreen}
      />
      <Stack.Screen name={routes.loginScreen} component={LoginScreen} />
      <Stack.Screen name={routes.registerScreen} component={RegisterScreen} />
      <Stack.Screen
        name={routes.homeScreen}
        component={BottomTabsNavigation}
        options={({ navigation, route }) => ({
          header: () => <CustomAppBar route={route} navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name={routes.shoppingCart}
        component={ShoppingCartScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomAppBar
              title="Shopping Cart"
              navigation={navigation}
              hideActions
            />
          ),
        })}
      />
      <Stack.Screen
        name={routes.profile}
        component={ProfileScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomAppBar title="Profile" navigation={navigation} hideActions />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
