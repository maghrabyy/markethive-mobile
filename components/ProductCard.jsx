import { View, Text, Image } from 'react-native';
import { IconButton, Avatar, MD3Colors } from 'react-native-paper';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../constants/colors';
import { useFetchStore } from '../Custom Hooks/useFetchStore';
import { resW } from '../constants/dimensions';
import { useFetchWishList } from '../Custom Hooks/useFetchWishList';
import { useAddToCart } from '../Custom Hooks/useAddToCart';

export const ProductCard = ({ product, showStore = true }) => {
  const productPrice = product.discount
    ? product.price - product.price * product.discount
    : product.price;
  const { handleAddToCart } = useAddToCart(product, 1, productPrice);
  const { wishlistHandler, isLoading, isAddedToWishlist } = useFetchWishList(
    product.id,
  );
  const { store, isStoreLoading } = useFetchStore(product.storeId);
  return (
    <View
      style={{
        backgroundColor: 'white',
        elevation: 0.4,
        borderRadius: 8,
        overflow: 'hidden',
        width: resW(94),
        position: 'relative',
      }}
    >
      <IconButton
        style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}
        icon={() => <FaIcon name="shopping-cart" color="white" />}
        containerColor={colors.primary}
        mode="contained"
        size={12}
        onPress={handleAddToCart}
      />
      <IconButton
        style={{ position: 'absolute', top: 0, right: 35, zIndex: 10 }}
        icon={() => (
          <FaIcon
            name={isAddedToWishlist() ? 'heart' : 'heart-o'}
            color="white"
          />
        )}
        containerColor={isAddedToWishlist() ? 'red' : colors.primary}
        size={12}
        onPress={wishlistHandler}
      />
      <View style={{ position: 'relative' }}>
        {Number(product.discount) > 0 && (
          <View
            style={{
              backgroundColor: MD3Colors.error50,
              position: 'absolute',
              padding: 8,
              zIndex: 20,
              borderBottomEndRadius: 15,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              - {product.discount * 100}%
            </Text>
          </View>
        )}
        <Image
          source={{ uri: product.images[0] }}
          width="100%"
          height={200}
          resizeMode="contain"
        />
        {showStore && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              padding: 8,
              backgroundColor: colors.primaryTransparent,
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <Avatar.Image source={{ uri: store.logo }} size={24} />
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {isStoreLoading ? 'Loading..' : store.name}
            </Text>
          </View>
        )}
      </View>
      <View style={{ padding: 14 }}>
        <Text style={{ fontSize: 14, fontWeight: '600' }} numberOfLines={1}>
          {product.title}
        </Text>
        <View style={{ flexDirection: 'row', gap: 4, flexWrap: 'wrap' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'grey' }}>
            {productPrice.toLocaleString()} EGP
          </Text>
          {Number(product.discount) > 0 && (
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: 'grey',
                alignSelf: 'flex-end',
                textDecorationLine: 'line-through',
              }}
            >
              {product.price.toLocaleString()} EGP
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
