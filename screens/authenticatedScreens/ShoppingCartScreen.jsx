import { Text, StyleSheet, FlatList } from 'react-native';
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

  return isCartLoading ? (
    <ScreenLoader />
  ) : (
    <FlatList
      data={cartItems}
      contentContainerStyle={styles.contentContainer}
      ListFooterComponentStyle={{ marginTop: 'auto' }}
      renderItem={({ item }) => (
        <CartItem
          prodId={item.prodId}
          cartItemId={item.id}
          subTotal={item.subTotal}
        />
      )}
      ListEmptyComponent={() => (
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
      ListFooterComponent={() =>
        cartItems[0] && <OrderSummary cartItems={cartItems} />
      }
    />
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    minHeight: '100%',
  },
});
