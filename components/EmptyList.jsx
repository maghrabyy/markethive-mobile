import { Text, View } from 'react-native';
import { SIZES } from '../constants/constant';
import { resW, resH } from '../constants/dimensions';
import EmptyListImg from '../assets/empty-default.svg';
import EmptyStoresImg from '../assets/no-stores.svg';
import EmptyProductsImg from '../assets/no-products.svg';
import EmptyOrdersImg from '../assets/no-orders.svg';

export const EmptyList = ({ text, type }) => {
  const renderImage = () => {
    switch (type) {
      case 'stores':
        return <EmptyStoresImg style={{ height: resH(40), width: resW(90) }} />;
      case 'products':
        return (
          <EmptyProductsImg style={{ height: resH(40), width: resW(90) }} />
        );
      case 'orders':
        return <EmptyOrdersImg style={{ height: resH(40), width: resW(90) }} />;
      default:
        return <EmptyListImg style={{ height: resH(40), width: resW(90) }} />;
    }
  };
  return (
    <View style={{ gap: 8 }}>
      {renderImage()}
      <Text
        style={{
          fontSize: SIZES.h1,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {text}
      </Text>
    </View>
  );
};
