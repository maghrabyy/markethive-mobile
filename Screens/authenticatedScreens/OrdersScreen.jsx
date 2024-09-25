import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useFetchOrders } from '../../Custom Hooks/useFetchOrders';
import { Card } from 'react-native-paper';
import { SIZES } from '../../constants/constant';
import { COLORS } from '../../src/constants/theme';
import { EmptyList } from '../../components/EmptyList';
import { useNavigation } from '@react-navigation/native';
import { ScreenLoader } from '../../components/ScreenLoader';
import OrderProductInfo from '../../components/OrderProductInfo';

const OrdersScreen = () => {
  const { order, isOrderLoading } = useFetchOrders();
  const navigation = useNavigation();

  return isOrderLoading ? (
    <ScreenLoader />
  ) : !order[0] ? (
    <EmptyList
      text={
        <>
          There are no orders here. You can go{' '}
          <Text style={{ color: 'blue' }} onPress={() => navigation.goBack()}>
            back
          </Text>
        </>
      }
      type="orders"
    />
  ) : (
    <FlatList
      data={order}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card style={styles.cardContainer}>
          <Card.Title
            titleStyle={styles.title}
            titleNumberOfLines={2}
            title={`Order Placed: ${item.orderHistory[0].date
              .toDate()
              .toLocaleString('en-AU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour12: true,
                minute: 'numeric',
                hour: 'numeric',
              })}`}
          />
          <Card.Content>
            <View style={styles.content}>
              <Text>
                Shipping Fees:{' '}
                <Text style={styles.textSubtitle}>
                  {item.shippingFees === 0 ? 'Free' : item.shippingFees + 'EGP'}
                </Text>
              </Text>
              <Text>
                Total Amount:{' '}
                <Text style={styles.textSubtitle}>
                  {item.totalAmount.toLocaleString()} EGP
                </Text>
              </Text>
              <Text>
                Destination:{' '}
                <Text style={styles.textSubtitle}>
                  {item.destinationAddress.streetAddress},{' '}
                  {item.destinationAddress.city}
                </Text>
              </Text>

              <Text>
                Payment Method:{' '}
                <Text style={styles.textSubtitle}>{item.paymentMethod}</Text>
              </Text>
              <Text>
                Status:{' '}
                <Text style={styles.status}>
                  {item.orderHistory[0].orderStatus}
                </Text>
              </Text>
            </View>
            {item.products.map((prod) => (
              <View key={prod.prodId}>
                <OrderProductInfo
                  productId={prod.prodId}
                  subtotal={prod.subTotal.toLocaleString()}
                  quantity={prod.quantity}
                />
              </View>
            ))}
          </Card.Content>
        </Card>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    marginHorizontal: 7,
  },
  content: {
    gap: 5,
  },
  title: {
    fontSize: SIZES.h2,
    paddingVertical: 10,
  },
  status: {
    fontWeight: '400',
    color: COLORS.primary,
    fontSize: 16,
  },

  textSubtitle: {
    color: 'gray',
  },
});

export default OrdersScreen;
