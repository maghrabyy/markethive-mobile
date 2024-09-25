import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { colors } from '../../constants/colors';

export const QuantitySelector = ({ value, onChange, maxValue }) => {
  const incrementQtyHandler = () => {
    if (value < maxValue) {
      onChange((qty) => (qty = qty + 1));
    }
  };
  const decrementQtyHandler = () => {
    if (value > 1) {
      onChange((qty) => (qty = qty - 1));
    }
  };
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <IconButton
        iconColor={colors.primary}
        icon="minus-box-outline"
        size={30}
        onPress={() => decrementQtyHandler()}
      />
      <Text style={{ fontSize: 20 }}>{value}</Text>
      <IconButton
        iconColor={colors.primary}
        icon="plus-box-outline"
        size={30}
        onPress={() => incrementQtyHandler()}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
