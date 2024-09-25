import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useFetchProduct } from '../Custom Hooks/useFetchProduct';
import { Divider } from 'react-native-paper';
import { Badge } from 'react-native-paper';
import { COLORS, SIZES } from '../src/constants/theme';
import { OrderSkeletonCard } from './CardSkeleton';
import { resW } from '../constants/dimensions';

const OrderProductInfo = ({ productId, subtotal, quantity }) => {
  const { product, isProductLoading, store } = useFetchProduct(productId);

  return (
    <View>
      {isProductLoading ? (
        <OrderSkeletonCard height={120} width={resW(100)} />
      ) : (
        <View>
          <Divider style={styles.divider} />
          <View style={styles.container}>
            <View style={{ width: '40%' }}>
              <Image source={{ uri: product.images[0] }} style={styles.image} />
              <Badge style={styles.badge} size={22}>
                {quantity}X
              </Badge>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.subtotal}>{subtotal} EGP</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 7 },
  textContainer: {
    gap: 5,
  },
  badge: {
    position: 'absolute',
    backgroundColor: COLORS.primary,
    right: 3,
    top: 3,
  },
  divider: { marginVertical: 20 },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    // resizeMode: 'center',
  },
  title: { width: '90%', fontSize: SIZES.h4, fontWeight: '400' },
  storeName: {
    color: 'gray',
  },
  subtotal: {
    color: 'gray',
  },
});

export default OrderProductInfo;
