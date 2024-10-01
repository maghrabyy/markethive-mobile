import { Text, ScrollView, StyleSheet, View } from 'react-native';
import { EmptyList } from '../../components/EmptyList';
import { ScreenLoader } from '../../components/ScreenLoader';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../utils/routes';
import { COLORS } from '../../src/constants/theme';
import { useFetchCartItems } from '../../Custom Hooks/useFetchCartItems';
import CartItem from '../../components/CartItem';
import OrderSummary from '../../components/OrderSummary';

export const ShoppingCartScreen = () => {
  const { cartItems, isCartLoading } = useFetchCartItems();
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {isCartLoading ? (
        <ScreenLoader />
      ) : cartItems[0] ? (
        cartItems.map((item) => (
          <View style={{ flex: 1 }}>
            <CartItem
              key={item.prodId}
              prodId={item.prodId}
              cartItemId={item.id}
              subTotal={item.subTotal}
            />
          </View>
        ))
      ) : (
        <EmptyList
          text={
            <>
              There are no items here.{' '}
              <Text
                style={{ color: COLORS.primary }}
                onPress={() => navigation.navigate(routes.homeScreen)}
              >
                Continue Shopping
              </Text>
            </>
          }
          type="shoppingCart"
        />
      )}
      {cartItems[0] && <OrderSummary cartItems={cartItems} />}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    minHeight: '100%',
  },
});
