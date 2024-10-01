import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFetchProduct } from '../Custom Hooks/useFetchProduct';
import { Button, Card } from 'react-native-paper';
import { ScreenLoader } from './ScreenLoader';
import { COLORS, SIZES } from '../src/constants/theme';
import { Picker } from '@react-native-picker/picker';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { resH, resW } from '../constants/dimensions';
import { OrderSkeletonCard } from './CardSkeleton';

const CartItem = ({ prodId, subTotal, cartItemId }) => {
  const { product, isProductLoading, store } = useFetchProduct(prodId);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const updateQuantity = async (itemId, newQuantity) => {
    const itemRef = doc(db, 'ShoppingCart', itemId);
    const newSubtotal = product.price * newQuantity;
    await updateDoc(itemRef, {
      quantity: newQuantity,
      subTotal: newSubtotal,
    });
  };

  const removeItem = async (itemId) => {
    await deleteDoc(doc(db, 'ShoppingCart', itemId));
  };

  return (
    <View style={{ paddingHorizontal: 5 }}>
      {isProductLoading ? (
        <Card style={{ marginVertical: 5 }}>
          <Card.Content>
            <OrderSkeletonCard />
          </Card.Content>
        </Card>
      ) : (
        <Card style={{ marginVertical: 5 }}>
          <Card.Content>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Image source={{ uri: product.images[0] }} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text numberOfLines={4} style={styles.title}>
                  {product.title}
                </Text>
                <Text style={styles.storeName}>Store: {store.name}</Text>
                <Text style={styles.price}>
                  Price: {subTotal.toLocaleString()} EGP
                </Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedQuantity}
                    onValueChange={(itemValue) => {
                      setSelectedQuantity(itemValue);
                      updateQuantity(cartItemId, itemValue);
                    }}
                    style={styles.picker}
                  >
                    {Array.from({ length: product.stockQuantity }, (_, i) => (
                      <Picker.Item
                        key={i}
                        label={(i + 1).toString()}
                        value={i + 1}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
            <Button
              textColor="red"
              style={{
                backgroundColor: 'transparent',
                marginVertical: 10,
                borderColor: 'red',
                borderWidth: 1,
              }}
              onPress={() => removeItem(cartItemId)}
            >
              Remove
            </Button>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: resW(40),
    height: resH(20),
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: { width: '95%', fontSize: SIZES.h4, fontWeight: '400' },

  storeName: {
    color: 'gray',
    marginTop: 8,
  },
  price: {
    color: 'gray',
    marginVertical: 5,
  },
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 100,
    backgroundColor: 'transparent',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#c1c1c1',
  },
  picker: {
    width: '100%',
    height: 40,
  },
});

export default CartItem;
