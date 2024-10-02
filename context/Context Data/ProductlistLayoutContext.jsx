import { createContext, useContext, useState } from 'react';

const ProductListLayoutContext = createContext();

export const useProductListLayout = () => {
  const productListLayoutContext = useContext(ProductListLayoutContext);
  return {
    prodListLayout: productListLayoutContext.prodListLayout,
    setProdListLayout: productListLayoutContext.setProdListLayout,
  };
};

export const ProductListLayoutProvider = ({ children }) => {
  const [prodListLayout, setProdListLayout] = useState('row');
  return (
    <ProductListLayoutContext.Provider
      value={{ prodListLayout, setProdListLayout }}
    >
      {children}
    </ProductListLayoutContext.Provider>
  );
};
