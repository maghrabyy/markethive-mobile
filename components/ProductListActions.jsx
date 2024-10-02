import Octicon from 'react-native-vector-icons/Octicons';
import { useProductListLayout } from '../context/Context Data/ProductlistLayoutContext';
import { View, Pressable } from 'react-native';
import { colors } from '../constants/colors';
import { useProductsList } from '../context/Context Data/ProductListContext';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { IconButton } from 'react-native-paper';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import { useBottomSheetRef } from '../context/Context Data/BottomSheetRefContext';

export const ProductListActions = ({ paddingVertical, paddingHorizontal }) => {
  const { prodListLayout, setProdListLayout } = useProductListLayout();
  const { bottomSheetRef } = useBottomSheetRef();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal,
        paddingVertical,
      }}
    >
      <IconButton
        style={{ margin: 0, borderRadius: 8 }}
        containerColor={colors.primary}
        icon={() => <FaIcon name="sliders" size={24} color="white" />}
        onPress={() => {
          bottomSheetRef.current.snapToIndex(1);
        }}
      />
      <View style={{ flexDirection: 'row', gap: 4 }}>
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: pressed
              ? colors.lightGray
              : prodListLayout === 'column'
                ? colors.primary
                : colors.gray,
            padding: 6,
            borderRadius: 8,
          })}
          onPress={() => setProdListLayout('column')}
        >
          <Octicon name="columns" size={18} color="white" />
        </Pressable>
        <Pressable
          style={({ pressed }) => ({
            backgroundColor: pressed
              ? colors.lightGray
              : prodListLayout === 'row'
                ? colors.primary
                : colors.gray,
            padding: 6,
            borderRadius: 8,
          })}
          onPress={() => setProdListLayout('row')}
        >
          <Octicon name="rows" size={18} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export const FilterAndSort = () => {
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { setProducts, allProducts } = useProductsList();

  useEffect(() => {
    setSelectedSort('');
  }, [selectedFilter]);
  function handleFilter(value) {
    setSelectedFilter(value);
    if (value === 'all') {
      setProducts(allProducts.current);
    }
    if (value === 'discount') {
      setProducts([...allProducts.current.filter((prod) => prod.discount > 0)]);
    }
    if (value === 'availability') {
      setProducts([
        ...allProducts.current.filter((prod) => prod.stockQuantity > 0),
      ]);
    }
  }

  function handleSort(value) {
    setSelectedSort(value);
    setProducts((prods) => [
      ...prods.sort((a, b) => {
        const aPrice = a.discount ? a.price - a.price * a.discount : a.price;
        const bPrice = b.discount ? b.price - b.price * b.discount : b.price;
        switch (value) {
          case 'priceAsc':
            return aPrice - bPrice;
          case 'priceDesc':
            return bPrice - aPrice;
          case 'nameAsc':
            return a.title.localeCompare(b.title);
          case 'nameDesc':
            return b.title.localeCompare(a.title);
          case 'newToOld':
            return b.creationDate - a.creationDate;
          case 'oldToNew':
            return a.creationDate - b.creationDate;
          case 'highRate':
            return b.reviews.length - a.reviews.length;
          case 'lowRate':
            return a.reviews.length - b.reviews.length;
          default:
            return 0;
        }
      }),
    ]);
  }
  return (
    <View style={{ gap: 5, width: '100%', padding: 8 }}>
      <View style={{ overflow: 'hidden', borderRadius: 12 }}>
        <Picker
          style={{
            backgroundColor: colors.primary,
            color: 'white',
          }}
          selectedValue={selectedFilter}
          placeholder="Filter"
          onValueChange={handleFilter}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Discount" value="discount" />
          <Picker.Item label="Available" value="availability" />
        </Picker>
      </View>
      <View style={{ overflow: 'hidden', borderRadius: 12 }}>
        <Picker
          placeholder="Sort by"
          style={{
            backgroundColor: colors.primary,
            color: 'white',
          }}
          selectedValue={selectedSort}
          onValueChange={handleSort}
        >
          <Picker.Item label="Sort By" value="" />
          <Picker.Item label="Price - Low to High" value="priceAsc" />
          <Picker.Item label="Price - High to Low" value="priceDesc" />
          <Picker.Item label="Alphabetically - A to Z" value="nameAsc" />
          <Picker.Item label="Alphabetically -  Z to A" value="nameDesc" />
          <Picker.Item label="Most Recent" value="newToOld" />
          <Picker.Item label="Old Products" value="oldToNew" />
          <Picker.Item label="Highest Rate" value="highRate" />
          <Picker.Item label="Lowest Rate" value="lowRate" />
        </Picker>
      </View>
    </View>
  );
};
