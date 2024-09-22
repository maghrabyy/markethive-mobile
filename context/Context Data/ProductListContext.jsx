import { useContext, createContext, useState, useEffect, useRef } from 'react';
import { fetchProducts } from '../../utils/fetchProducts';

const ProductListContext = createContext();

export const useProductsList = () => {
  const productsListContext = useContext(ProductListContext);
  return {
    products: productsListContext.products,
    setProducts: productsListContext.setProducts,
    isProductsLoading: productsListContext.isProductsLoading,
    allProducts: productsListContext.allProducts,
  };
};

export const ProductsListProvider = ({ children, route }) => {
  const { store, categoryId } = route.params;
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const allProducts = useRef();
  useEffect(() => {
    const fetchProductsFromCollectionId = async () => {
      if (store?.id) {
        const fetchedStoreProducts = await fetchProducts('storeId', store.id);
        setProducts(fetchedStoreProducts);
        allProducts.current = fetchedStoreProducts;
        setIsProductsLoading(false);
      }
      if (categoryId) {
        const fetchedCategoryProducts = await fetchProducts(
          'categoryId',
          categoryId,
        );
        setProducts(fetchedCategoryProducts);
        allProducts.current = fetchedCategoryProducts;
        setIsProductsLoading(false);
      }
    };
    fetchProductsFromCollectionId();
  }, []);
  return (
    <ProductListContext.Provider
      value={{
        products,
        setProducts,
        allProducts,
        isProductsLoading,
      }}
    >
      {children}
    </ProductListContext.Provider>
  );
};
