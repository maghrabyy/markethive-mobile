import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useFetchProduct } from '../../Custom Hooks/useFetchProduct';
import { ProductDetails } from '../../components/ProductDetails-Comp/ProductDetails';
import { ReviewForm } from '../../components/ProductDetails-Comp/ReviewForm';
import { auth } from '../../firebase';
import { CustomerReviews } from '../../components/ProductDetails-Comp/CustomerReviews';
import { useFetchCustomer } from '../../Custom Hooks/useFetchCustomer';
import { ScreenLoader } from '../../components/ScreenLoader';

function ProductDetailsScreen() {
  const route = useRoute();
  const { prodId } = route.params;
  const { product, store, category, productReviews, isProductLoading } =
    useFetchProduct(prodId);
  const { customer } = useFetchCustomer(auth.currentUser.uid);
  return isProductLoading ? (
    <ScreenLoader />
  ) : (
    <>
      <ScrollView>
        <ProductDetails
          product={product}
          store={store}
          reviews={productReviews}
        />
        {customer.purchasedProducts.includes(prodId) && (
          <ReviewForm productId={prodId} />
        )}
        <CustomerReviews reviews={productReviews} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});

export default ProductDetailsScreen;
