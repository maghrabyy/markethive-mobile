import { FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { resW } from '../dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CollectionCard, CollectionSkeletonCard } from '../CollectionCards';
import { Searchbar } from 'react-native-paper';
import { CatContext } from '../Context/CatContextProvider';


export default function Stores() {
  const { categories ,isCategoriesLoading } =useContext(CatContext)
  const [text, setText] = useState('');



  const filteredCategories = categories.filter(item =>
    item.categoryName.toLowerCase().includes(text.toLowerCase())
  );

  
  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={text => setText(text)}
        value={text}
      />

    

      {isCategoriesLoading ? (
        <CollectionSkeletonCard width={resW(90)} />
      ) : (
        <FlatList
          contentContainerStyle={{ alignItems: 'center' }}
          data={filteredCategories}
          renderItem={({ item }) => (
            <CollectionCard
              title={item.categoryName}
              imageUrl={item.categoryImage}
              width={resW(90)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  searchInput: {
    backgroundColor: '#C7C8CC',
    color: '#000',
    marginHorizontal: 20,
    paddingLeft: 10,
    marginBottom: 10,
  },
 
});
