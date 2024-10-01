import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OrderSummary from '../../components/OrderSummary';
import { useFetchCartItems } from '../../Custom Hooks/useFetchCartItems';
import { useRoute } from '@react-navigation/native';

const PlaceOrderScreen = () => {
  const { cartItems, isCartLoading } = useFetchCartItems();

  return (
    <View>
      <OrderSummary cartItems={cartItems} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PlaceOrderScreen;
