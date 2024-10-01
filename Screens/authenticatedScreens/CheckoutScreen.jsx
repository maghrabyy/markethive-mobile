import { ScrollView } from 'react-native';
import React from 'react';
import { useCustomerSnapshot } from '../../Custom Hooks/useFetchCustomer';
import { ScreenLoader } from '../../components/ScreenLoader';
import { auth } from '../../firebase';
import PlaceOrder from '../../components/Checkout-Comp/PlaceOrder';

const CheckoutScreen = () => {
  const { customer, isLoading } = useCustomerSnapshot(auth.currentUser.uid);

  return (
    <ScrollView>
      {isLoading ? <ScreenLoader /> : <PlaceOrder customer={customer} />}
    </ScrollView>
  );
};

export default CheckoutScreen;
