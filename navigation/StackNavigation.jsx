import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingScreen } from '../screens/unauthenticatedScreens/OnboardingScreen';
import WelcomeScreen from '../screens/unauthenticatedScreens/WelcomeScreen';
import LoginScreen from '../screens/unauthenticatedScreens/LoginScreen';
import RegisterScreen from '../screens/unauthenticatedScreens/RegisterScreen';
import { TopTabsNavigation } from './TopTabsNavigation';
import { ShoppingCartScreen } from '../screens/authenticatedScreens/ShoppingCartScreen';
import { ProfileScreen } from '../screens/authenticatedScreens/ProfileScreen';
import { ProductsScreen } from '../screens/authenticatedScreens/ProductsScreen';
import { routes } from '../utils/routes';
import { ScreenLoader } from '../components/ScreenLoader';
import { useIsFirstUsage } from '../context/Context Data/IsFirstUsageContext';
import { CustomAppBar } from '../components/CustomerAppbar';
import { useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ProductDetailsScreen from '../screens/authenticatedScreens/ProductDetailsScreen';
import OrdersScreen from '../screens/authenticatedScreens/OrdersScreen';
import { ProductListLayoutProvider } from '../context/Context Data/ProductlistLayoutContext';
import { ProductsListProvider } from '../context/Context Data/ProductListContext';
import { BottomSheetRefProvider } from '../context/Context Data/BottomSheetRefContext';
import { WishlistScreen } from '../screens/authenticatedScreens/WishlistScreen';
import PlaceOrderScreen from '../screens/authenticatedScreens/PlaceOrderScreen';

const Stack = createStackNavigator();

export const StackNavigation = () => {
  const { isFirstUsage, isAsyncStorageLoading } = useIsFirstUsage();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  onAuthStateChanged(auth, () => {
    setIsAuthLoading(false);
  });
  return isAsyncStorageLoading || isAuthLoading ? (
    <ScreenLoader />
  ) : (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName={
        auth.currentUser !== null ? routes.homeScreen : routes.welcomeScreen
      }
    >
      <Stack.Screen
        name={routes.welcomeScreen}
        component={isFirstUsage === null ? OnboardingScreen : WelcomeScreen}
      />
      <Stack.Screen name={routes.loginScreen} component={LoginScreen} />
      <Stack.Screen name={routes.registerScreen} component={RegisterScreen} />
      <Stack.Screen
        name={routes.homeScreen}
        component={TopTabsNavigation}
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
        name={routes.wishlist}
        component={WishlistScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomAppBar
              title="Wishlist"
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
      <Stack.Screen
        name={routes.productDetails}
        component={ProductDetailsScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomAppBar title="Details" navigation={navigation} hideActions />
          ),
        })}
      />
      <Stack.Screen
        name={routes.orders}
        component={OrdersScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomAppBar title="Orders" navigation={navigation} hideActions />
          ),
        })}
      />
      <Stack.Screen
        name={routes.placeOrder}
        component={PlaceOrderScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomAppBar
              title="PlaceOrder"
              navigation={navigation}
              hideActions
            />
          ),
        })}
      />
      <Stack.Screen
        name={routes.products}
        options={({ navigation, route }) => ({
          header: () => (
            <CustomAppBar
              title={route.params.collectionName}
              navigation={navigation}
            />
          ),
        })}
      >
        {({ route }) => (
          <ProductsListProvider route={route}>
            <ProductListLayoutProvider>
              <BottomSheetRefProvider>
                <ProductsScreen />
              </BottomSheetRefProvider>
            </ProductListLayoutProvider>
          </ProductsListProvider>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
