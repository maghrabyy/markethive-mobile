import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { CollectionCard } from '../../components/CollectionCard';
import { CollectionSkeletonCard } from '../../components/CardSkeleton';
import { resW } from '../../constants/dimensions';
import { Searchbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useFetchCategories } from '../../Custom Hooks/useFetchCategories';
import { EmptyList } from '../../components/EmptyList';

export const StoresScreen = () => {
  const [stores, setStores] = useState([]);
  const [isStoresLoading, setStoresLoading] = useState(true);
  const [text, setText] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { categories, isCategoriesLoading } = useFetchCategories();
  const originalData = useRef();

  useEffect(() => {
    setSelectedSort('');
  }, [selectedCategory]);

  async function fetchStores() {
    try {
      const storeSnapshot = await getDocs(collection(db, 'Stores'));
      const storeData = storeSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStores(storeData);
      originalData.current = storeData;
      setStoresLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchStores();
  }, []);

  const handleSortBy = (value) => {
    setStores((store) => {
      const sortedStores = [...store].sort((a, b) => {
        switch (value) {
          case 'NewToOld':
            return b.creationDate - a.creationDate;
          case 'OldToNew':
            return a.creationDate - b.creationDate;
          case 'mostProducts':
            return b.products.length - a.products.length;
          case 'leastProducts':
            return a.products.length - b.products.length;
          default:
            return 0;
        }
      });
      return sortedStores;
    });
  };

  function handleFilterCategory(value) {
    if (value == 'All') {
      setStores(originalData.current);
    } else {
      setStores(
        originalData.current.filter((item) => item.categoryId == value),
      );
    }
  }

  const filteredStores = stores.filter((item) =>
    item.name.toLowerCase().includes(text.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={(text) => setText(text)}
        value={text}
      />
      {isStoresLoading ? (
        Array.from(Array(4)).map((_, index) => (
          <CollectionSkeletonCard key={index} width={resW(95)} />
        ))
      ) : (
        <FlatList
          contentContainerStyle={{ alignItems: 'center' }}
          data={filteredStores}
          ListEmptyComponent={() => (
            <EmptyList text="Nothing is found here." type="stores" />
          )}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingHorizontal: 10,
                paddingBottom: 8,
                justifyContent: 'space-between',
              }}
            >
              <Picker
                selectedValue={selectedSort}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  setSelectedSort(itemValue);
                  handleSortBy(itemValue);
                }}
              >
                <Picker.Item label="Sort By" enabled={false} value="Sort By" />
                <Picker.Item label="New to Old" value="NewToOld" />
                <Picker.Item label="Old to New" value="OldToNew" />
                <Picker.Item label="Most Products" value="mostProducts" />
                <Picker.Item label="Least Products" value="leastProducts" />
              </Picker>
              <Picker
                selectedValue={selectedCategory}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  setSelectedCategory(itemValue);
                  handleFilterCategory(itemValue);
                }}
              >
                <Picker.Item
                  label={isCategoriesLoading ? 'Loading..' : 'All'}
                  value={isCategoriesLoading ? '' : 'All'}
                />
                {categories.map((item) => (
                  <Picker.Item
                    key={item.categoryName}
                    label={item.categoryName}
                    value={item.id}
                  />
                ))}
              </Picker>
            </View>
          )}
          ItemSeparatorComponent={() => <View height={8} />}
          renderItem={({ item }) => (
            <CollectionCard
              title={item.name}
              imageUrl={item.logo}
              width={resW(95)}
              params={{
                collectionName: item.name,
                store: item,
              }}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    paddingTop: 8,
  },
  searchInput: {
    backgroundColor: '#C7C8CC',
    color: '#000',
    borderRadius: 8,
    width: resW(95),
  },
  picker: {
    height: 50,
    backgroundColor: '#fffff4',
    width: '49%',
  },
});
