import IonIcon from 'react-native-vector-icons/Ionicons';
import { useFetchCategory } from '../Custom Hooks/useFetchCategory';
import { View, Text } from 'react-native';
import { resW } from '../constants/dimensions';
import { SIZES } from '../constants/constant';
import { Avatar } from 'react-native-paper';
import { colors } from '../constants/colors';
import { ProductListActions } from './ProductListActions';

export const StoreHeader = ({ store }) => {
  const { category, isCategoryLoading } = useFetchCategory(store.categoryId);
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        width: resW(95),
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 12,
        gap: 4,
        elevation: 0.4,
      }}
    >
      <Avatar.Image source={{ uri: store.logo }} size={80} />
      <Text style={{ fontWeight: 'bold', fontSize: SIZES.h1 }}>
        {store.name}
      </Text>
      <View
        style={{
          width: '70%',
          borderBottomWidth: 0.8,
          borderBottomColor: colors.lightGray,
          marginVertical: 8,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          gap: 4,
          alignItems: 'center',
          borderWidth: 0.4,
          backgroundColor: 'white',
          borderColor: colors.gray,
          borderRadius: 18,
          paddingVertical: 4,
          paddingHorizontal: 8,
        }}
      >
        <IonIcon name="grid" />
        <Text style={{ fontSize: SIZES.h5 }}>
          {isCategoryLoading ? 'Loading...' : category.categoryName}
        </Text>
      </View>
      <Text style={{ fontSize: SIZES.h3, textAlign: 'center' }}>
        {store.storeDescription}
      </Text>
      <ProductListActions />
    </View>
  );
};
