import { View, FlatList } from 'react-native';
import {
  ProductCard,
  TwpColumnProductCard,
} from '../../components/ProductCard';
import { ProductSkeletonCard } from '../../components/CardSkeleton';
import { EmptyList } from '../../components/EmptyList';
import { StoreHeader } from '../../components/StoreHeader';
import { useProductListLayout } from '../../context/Context Data/ProductlistLayoutContext';
import { useRoute } from '@react-navigation/native';
import { useProductsList } from '../../context/Context Data/ProductListContext';
import { ProductListActions } from '../../components/ProductListActions';
import { useCallback } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { FilterAndSort } from '../../components/ProductListActions';

export const bottomSheetRef = { current: null };

export const ProductsScreen = () => {
  const route = useRoute();
  const { store } = route.params;
  const { prodListLayout } = useProductListLayout();
  const { isProductsLoading } = useProductsList();
  return (
    <View>
      {isProductsLoading ? (
        <View style={{ paddingVertical: 8 }}>
          {Array.from(Array(4)).map((_, index) => (
            <ProductSkeletonCard key={index} />
          ))}
        </View>
      ) : prodListLayout === 'column' ? (
        <TwoColumnsProductsList store={store} />
      ) : (
        <OneColumnProductsList store={store} />
      )}
      <BottomSheet ref={bottomSheetRef} snapPoints={[1, '25%', '40%']}>
        <BottomSheetView style={{ flex: 1, alignItems: 'center' }}>
          <FilterAndSort />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

const TwoColumnsProductsList = ({ store }) => {
  const { products } = useProductsList();
  const ListHeaderComponent = useCallback(() => {
    return store ? (
      <StoreHeader store={store} />
    ) : (
      <ProductListActions paddingHorizontal={8} />
    );
  }, [store]);
  return (
    <View style={{ alignItems: 'center' }}>
      <FlatList
        data={products}
        renderItem={({ item: product }) => (
          <TwpColumnProductCard product={product} showStore={!store} />
        )}
        columnWrapperStyle={{ gap: 4 }}
        numColumns={2}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={() => (
          <EmptyList text="No products in here." type="products" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'flex-start',
          paddingVertical: 8,
          gap: 6,
        }}
      />
    </View>
  );
};
const OneColumnProductsList = ({ store }) => {
  const { products } = useProductsList();
  const ListHeaderComponent = useCallback(() => {
    return store ? (
      <StoreHeader store={store} />
    ) : (
      <ProductListActions paddingHorizontal={8} />
    );
  }, [store]);
  return (
    <FlatList
      data={products}
      renderItem={({ item: product }) => (
        <ProductCard product={product} showStore={!store} />
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={() => (
        <EmptyList text="No products in here." type="products" />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
        paddingVertical: 8,
        gap: 6,
      }}
    />
  );
};
