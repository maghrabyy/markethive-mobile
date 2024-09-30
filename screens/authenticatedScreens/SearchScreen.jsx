import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { EmptyList } from '../../components/EmptyList';
import { useProductSearch } from '../../Custom Hooks/useProductSearch';
import { resW } from '../../constants/dimensions';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../utils/routes';

export default function SearchScreen() {
  const { navigate } = useNavigation();
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);
  const [loading, setLoading] = useState(false);
  const { searchProducts, getStoreNameFromId, error } =
    useProductSearch(debouncedText);

  // Debounce the search text to avoid excessive API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedText(text);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [text]);

  // Show loading indicator while search is in progress
  useEffect(() => {
    if (text !== debouncedText) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [text, debouncedText]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          autoFocus
          placeholder="Search for Products..."
          onChangeText={setText}
          value={text}
          style={styles.searchInput}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && (
        <Text style={styles.errorText}>
          Failed to load products. Please try again.
        </Text>
      )}

      {!loading && !error && (
        <FlatList
          contentContainerStyle={{ alignItems: 'center' }}
          data={searchProducts}
          ItemSeparatorComponent={() => <View height={8} />}
          ListEmptyComponent={() => <EmptyList text="Nothing is found here." />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigate(routes.productDetails, { prodId: item.id });
              }}
            >
              <View style={styles.itemContainer}>
                <View style={styles.itemContent}>
                  <Image
                    source={{
                      uri:
                        item.images?.[0] || 'https://via.placeholder.com/150',
                    }} // Fallback if no image
                    style={styles.itemImage}
                    accessibilityLabel={item.title}
                  />
                  <Text style={styles.itemTitle} numberOfLines={3}>
                    {item.title}
                  </Text>
                </View>
                <Text style={styles.storeName}>
                  {getStoreNameFromId(item.storeId)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  searchContainer: {
    width: resW(95),
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#C7C8CC',
    color: '#000',
    borderRadius: 8,
    elevation: 3,
  },
  itemContainer: {
    width: resW(95),
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    elevation: 1,
  },
  itemContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    alignItems: 'center',
    width: resW(95),
    marginBottom: 10,
  },
  itemImage: {
    resizeMode: 'contain',
    width: '20%',
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '70%',
  },
  storeName: {
    paddingRight: 10,
    color: '#555',
    fontSize: 14,
    textAlign: 'right',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
