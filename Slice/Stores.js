import { FlatList, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { resW } from '../dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CollectionCard, CollectionSkeletonCard } from '../CollectionCards';
import { Searchbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { CatContext } from '../Context/CatContextProvider';

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [isStoresLoading, setStoresLoading] = useState(true);
  const [text, setText] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { categories} =useContext(CatContext)
 


  async function fetchStores() {
    try {
      const storeSnapshot = await getDocs(collection(db, 'Stores'));
      const storeData = storeSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setStores(storeData);
      originalData.current = storeData
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
   let originalData = useRef()
  function handleFilterCategory(value) {
    if(value == 'All') {
      setStores(originalData.current)
    }else  {

      setStores(originalData.current.filter((item)=> item.categoryId == value   ))
    }
  }
  


  


  const filteredStores = stores.filter(item =>
    item.name.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
   <Searchbar
      style={styles.searchInput}
      placeholder="Search..."
      onChangeText={text => setText(text)}
      value={text}
    />

<Picker
        selectedValue={selectedSort}
        style={styles.picker}
        onValueChange={(itemValue) => {
          setSelectedSort(itemValue);
          handleSortBy(itemValue);
        }}
        
      >  
        <Picker.Item label="Sort By" enabled={false}  value="Sort By" />
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
          <Picker.Item label="All"  value="All" />
        {categories.map((item)=>  <Picker.Item key={item.categoryName} label={item.categoryName} value={item.id} />)}
     
      </Picker>
     


    

      {isStoresLoading ? <CollectionSkeletonCard width={resW(90)} /> : (
        <FlatList 
        contentContainerStyle={{ alignItems: 'center' }} 
          data={filteredStores}
          renderItem={({ item }) => (
            <CollectionCard
              title={item.name}
              imageUrl={item.logo}
              width={resW(90)}
            />
          )}
          keyExtractor={item => item.id}
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
  picker: {
    height: 50,
    width: "90%",
    marginBottom: 20,
  },
});
