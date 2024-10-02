import { View, Text, Image, TouchableOpacity } from 'react-native';
import { IconButton, Button, Avatar, MD3Colors } from 'react-native-paper';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../constants/colors';
import { useFetchStore } from '../Custom Hooks/useFetchStore';
import { resW } from '../constants/dimensions';
import { useFetchWishList } from '../Custom Hooks/useFetchWishList';
import { useAddToCart } from '../Custom Hooks/useAddToCart';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../utils/routes';

export const ProductCard = ({
  product,
  showStore = true,
  width = resW(94),
  mode = 'oneColumn',
}) => {
  if (mode === 'oneColumn')
    return (
      <OneColumnProductCard
        product={product}
        showStore={showStore}
        width={width}
      />
    );
  if (mode === 'twoColumn')
    return (
      <TwoColumnProductCard
        product={product}
        showStore={showStore}
        width={width}
      />
    );
};

export const OneColumnProductCard = ({
  product,
  showStore = true,
  width = resW(94),
}) => {
  const { navigate } = useNavigation();
  const productPrice = product.discount
    ? product.price - product.price * product.discount
    : product.price;
  const { handleAddToCart } = useAddToCart(product, 1, productPrice);
  const { wishlistHandler, isLoading, isAddedToWishlist } = useFetchWishList(
    product.id,
  );
  const { store, isStoreLoading } = useFetchStore(product.storeId);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigate(routes.productDetails, { prodId: product.id })}
      style={{
        backgroundColor: 'white',
        elevation: 0.4,
        borderRadius: 8,
        overflow: 'hidden',
        width: width,
        position: 'relative',
        flexDirection: 'row',
        gap: 5,
      }}
    >
      <View
        style={{
          position: 'relative',
          alignItems: 'flex-start',
          width: '50%',
        }}
      >
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
      </View>
      <View
        style={{
          width: '50%',
          justifyContent: showStore ? 'space-between' : 'center',
          gap: 8,
          paddingTop: 8,
        }}
      >
        <View style={{ paddingHorizontal: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600' }} numberOfLines={2}>
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
        <View style={{ gap: 4, paddingHorizontal: 8 }}>
          <Button
            style={{ borderRadius: 8, backgroundColor: colors.primary }}
            icon={() => <FaIcon name="shopping-cart" color="white" />}
            mode="contained"
            onPress={handleAddToCart}
          >
            Add To Cart
          </Button>
          <Button
            mode="outlined"
            style={{ borderRadius: 8, borderColor: colors.primary }}
            textColor={colors.primary}
            loading={isLoading}
            icon={() => (
              <FaIcon
                name={isAddedToWishlist() ? 'heart' : 'heart-o'}
                color={colors.primary}
              />
            )}
            onPress={wishlistHandler}
          >
            {isLoading
              ? 'loading...'
              : isAddedToWishlist()
                ? 'Remove'
                : 'Add To Wishlist'}
          </Button>
        </View>
        {showStore && (
          <View
            style={{
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
    </TouchableOpacity>
  );
};

export const TwoColumnProductCard = ({
  product,
  showStore = true,
  width = resW(47),
}) => {
  const { navigate } = useNavigation();
  const productPrice = product.discount
    ? product.price - product.price * product.discount
    : product.price;
  const { handleAddToCart } = useAddToCart(product, 1, productPrice);
  const { wishlistHandler, isLoading, isAddedToWishlist } = useFetchWishList(
    product.id,
  );
  const { store, isStoreLoading } = useFetchStore(product.storeId);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        backgroundColor: 'white',
        elevation: 0.4,
        borderRadius: 8,
        overflow: 'hidden',
        width: width,
        position: 'relative',
      }}
      onPress={() => {
        navigate(routes.productDetails, { prodId: product.id });
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
    </TouchableOpacity>
  );
};
