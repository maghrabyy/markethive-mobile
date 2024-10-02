import { View } from 'react-native';
import { ProductListActions } from './ProductListActions';
import { resW } from '../constants/dimensions';

export const CategoryHeader = () => {
  return (
    <View
      style={{
        width: resW(95),
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 12,
        elevation: 0.4,
      }}
    >
      <ProductListActions />
    </View>
  );
};
