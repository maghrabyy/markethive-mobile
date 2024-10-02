import { View, Text, Image } from 'react-native';
import { useCustomerSnapshot } from '../../Custom Hooks/useFetchCustomer';
import { useFetchProduct } from '../../Custom Hooks/useFetchProduct';
import { ProductSkeletonCard } from '../../components/CardSkeleton';
import { EmptyList } from '../../components/EmptyList';
import { auth } from '../../firebase';
import { ProductCard } from '../../components/ProductCard';
import { FlatList } from 'react-native-gesture-handler';
import { resH, resW } from '../../constants/dimensions';
import { ScreenLoader } from '../../components/ScreenLoader';
import EmptyImage from '../../assets/empty-default.svg';

export const WishlistScreen = () => {
  const { customer, isLoading } = useCustomerSnapshot(auth.currentUser.uid);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {isLoading ? (
        <ScreenLoader />
      ) : (
        <FlatList
          contentContainerStyle={{ alignItems: 'center', paddingVertical: 8 }}
          data={customer.wishlist.slice().reverse()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View height={10} />}
          renderItem={({ item }) => <WishlistItem id={item} />}
          keyExtractor={(item) => item.toString()}
          ListEmptyComponent={() =>
            customer.wishlist.length === 0 ? (
              <View style={{ marginTop: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>
                  Nothing is in here. You can go back
                </Text>
                <EmptyImage width={resW(90)} height={400} />
              </View>
            ) : (
              <EmptyList text="Nothing is found here." />
            )
          }
        />
      )}
    </View>
  );
};

function WishlistItem({ id }) {
  const { product, isProductLoading } = useFetchProduct(id);

  return (
    <>
      {isProductLoading ? (
        <ProductSkeletonCard />
      ) : (
        <ProductCard product={product} />
      )}
    </>
  );
}
