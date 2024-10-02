import { View } from 'react-native';
import { useCustomerSnapshot } from '../../Custom Hooks/useFetchCustomer';
import { useFetchProduct } from '../../Custom Hooks/useFetchProduct';
import { ProductSkeletonCard } from '../../components/CardSkeleton';
import { EmptyList } from '../../components/EmptyList';
import { auth } from '../../firebase';
import { ProductCard } from '../../components/ProductCard';
import { FlatList } from 'react-native-gesture-handler';
import { ScreenLoader } from '../../components/ScreenLoader';

export const WishlistScreen = () => {
  const { customer, isLoading } = useCustomerSnapshot(auth.currentUser.uid);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {isLoading ? (
        <ScreenLoader />
      ) : (
        <FlatList
          contentContainerStyle={{ alignItems: 'center', paddingVertical: 8 }}
          data={customer.wishlist.reverse()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View height={10} />}
          renderItem={({ item }) => <WishlistItem id={item} />}
          keyExtractor={(item) => item.toString()}
          ListEmptyComponent={() => (
            <EmptyList text="Your wishlist is empty." />
          )}
        />
      )}
    </View>
  );
};

function WishlistItem({ id }) {
  const { product, isProductLoading } = useFetchProduct(id);

  return isProductLoading ? (
    <ProductSkeletonCard />
  ) : (
    <ProductCard product={product} />
  );
}
