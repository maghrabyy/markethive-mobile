import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Divider } from 'react-native-paper';
import { COLORS } from '../src/constants/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { routes } from '../utils/routes';
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useFetchCustomer } from '../Custom Hooks/useFetchCustomer';
import Toast from 'react-native-toast-message';
import { CardCheckoutForm } from './Checkout-Comp/CardCheckoutForm';

const OrderSummary = ({ cartItems, paymentMethod }) => {
  const route = useRoute();
  const { customer } = useFetchCustomer(auth.currentUser.uid);
  const [isPlaceOrderLoading, setIsPlaceOrderLoading] = useState(false);
  const navigation = useNavigation();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.subTotal, 0);
  const shippingFees = 0;
  const totalAmount = subtotal + shippingFees;

  const emptyShoppingCart = () => {
    cartItems.forEach(async (cartItem) => {
      await deleteDoc(doc(db, 'ShoppingCart', cartItem.id));
    });
  };

  const updateStoresDocWithNewOrderData = (orderId) => {
    cartItems.forEach(async (cartItem) => {
      const store = await getDoc(doc(db, 'Products', cartItem.prodId));
      const storeId = store.data().storeId;
      await updateDoc(doc(db, 'Stores', storeId), {
        orders: arrayUnion(orderId),
        customers: arrayUnion(auth.currentUser.uid),
      });
    });
  };

  const updateCustomerDocWithNewOrder = async (orderId) => {
    await updateDoc(doc(db, 'Customers', auth.currentUser.uid), {
      orders: arrayUnion(orderId),
    });
    cartItems.forEach(async (cartItem) => {
      await updateDoc(doc(db, 'Customers', auth.currentUser.uid), {
        purchasedProducts: arrayUnion(cartItem.prodId),
      });
    });
  };

  const placeOrderHandler = async () => {
    try {
      setIsPlaceOrderLoading(true);
      const order = await addDoc(collection(db, 'Orders'), {
        customerId: auth.currentUser?.uid,
        products: cartItems.map((cartItem) => ({
          prodId: cartItem.prodId,
          quantity: cartItem.quantity,
          subTotal: cartItem.subTotal,
        })),
        shippingFees,
        totalAmount,
        orderHistory: [{ orderStatus: 'pending', date: new Date() }],
        destinationAddress: customer.address,
        paymentMethod: paymentMethod.title,
      });

      updateStoresDocWithNewOrderData(order.id);
      updateCustomerDocWithNewOrder(order.id);
      emptyShoppingCart();
      navigation.replace(routes.orders);
      setIsPlaceOrderLoading(false);
    } catch (error) {
      setIsPlaceOrderLoading(false);
      console.log(error);
      console.warn(error);
    }
  };

  return (
    <View style={{ marginHorizontal: 5, marginVertical: 10 }}>
      <Card>
        <Card.Title title="Order Summery" titleVariant="headlineSmall" />
        <Card.Content>
          <View style={styles.orderSummerySubTotal}>
            <Text>
              Subtotal ({totalItems} {totalItems == 1 ? 'Item' : 'Items'})
            </Text>
            <Text>{subtotal.toLocaleString()} EGP</Text>
          </View>
          <View style={styles.orderSummeryShippingFees}>
            <Text>Shipping Fees </Text>
            <Text style={{ color: 'green', fontSize: 16, fontWeight: 500 }}>
              {shippingFees == 0 ? 'Free' : shippingFees + ' ' + 'EGP'}
            </Text>
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View style={styles.orderSummerySubTotal}>
            <Text style={styles.totalText}>Total </Text>
            <Text style={styles.totalText}>
              {totalAmount.toLocaleString()} EGP
            </Text>
          </View>
          {paymentMethod?.value === 'debitNCredit' ? (
            <CardCheckoutForm
              totalAmount={totalAmount}
              placeOrderHandler={placeOrderHandler}
            />
          ) : (
            <Button
              disabled={paymentMethod?.value === 'valu'}
              loading={isPlaceOrderLoading}
              mode={route.name == 'shoppingCart' ? 'outlined' : 'contained'}
              textColor={
                route.name == 'shoppingCart' ? COLORS.primary : 'white'
              }
              style={[
                {
                  marginVertical: 10,
                  borderWidth: 1,
                  borderRadius: 8,
                },
                route.name == 'shoppingCart'
                  ? styles.checkoutBtn
                  : styles.placeOrderBtn,
              ]}
              onPress={() =>
                route.name == 'shoppingCart'
                  ? navigation.navigate(routes.checkout)
                  : paymentMethod === null
                    ? Toast.show({
                        type: 'info',
                        text1: 'You must select payment method',
                      })
                    : Alert.alert(
                        'Confirm Order',
                        `Are you sure you want to place order of amount ${totalAmount.toLocaleString()}EGP?`,
                        [
                          {
                            text: 'Cancel',
                          },
                          {
                            text: 'Confirm',
                            onPress: placeOrderHandler,
                          },
                        ],
                      )
              }
            >
              {route.name == 'shoppingCart' ? 'Checkout' : 'Place Order'}
            </Button>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  orderSummerySubTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderSummeryShippingFees: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '500',
  },
  checkoutBtn: {
    borderColor: COLORS.primary,
  },
  placeOrderBtn: {
    backgroundColor: COLORS.primary,
  },
});

export default OrderSummary;
