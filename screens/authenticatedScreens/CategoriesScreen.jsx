import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import { resW } from '../../constants/dimensions';
import { CollectionCard } from '../../components/CollectionCard';
import { CollectionSkeletonCard } from '../../components/CardSkeleton';
import { Searchbar } from 'react-native-paper';
import { useFetchCategories } from '../../Custom Hooks/useFetchCategories';
import { EmptyList } from '../../components/EmptyList';

export const CategoriesScreen = () => {
  const { categories, isCategoriesLoading } = useFetchCategories();
  const [text, setText] = useState('');

  const filteredCategories = categories.filter((item) =>
    item.categoryName.toLowerCase().includes(text.toLowerCase()),
  );
  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchInput}
        placeholder="Search for categories.."
        onChangeText={(text) => setText(text)}
        value={text}
      />

      {isCategoriesLoading ? (
        <CollectionSkeletonCard width={resW(95)} />
      ) : (
        <FlatList
          contentContainerStyle={{ alignItems: 'center' }}
          data={filteredCategories}
          ItemSeparatorComponent={() => <View height={8} />}
          ListEmptyComponent={() => <EmptyList text="Nothing is found here." />}
          renderItem={({ item }) => (
            <CollectionCard
              title={item.categoryName}
              imageUrl={item.categoryImage}
              width={resW(95)}
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
    paddingVertical: 8,
  },
  searchInput: {
    backgroundColor: '#C7C8CC',
    color: '#000',
    borderRadius: 8,
    width: resW(95),
  },
});
