import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebase';
import { useAddToCart } from '../../Custom Hooks/useAddToCart';
import { useFetchWishList } from '../../Custom Hooks/useFetchWishList';
import { Avatar, Button, IconButton } from 'react-native-paper';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../constants/colors';
import { QuantitySelector } from './QuantitySelector';
import { routes } from '../../utils/routes';
import StarRating from 'react-native-star-rating-widget';

export const ProductDetails = ({ product, store, reviews }) => {
  const { navigate } = useNavigation();
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const productPrice = product.discount
    ? product.price - product.price * product.discount
    : product.price;

  const user = auth.currentUser;

  const { handleAddToCart, isProductInShoppingCart, addProductToCart } =
    useAddToCart(product, selectedQty, productPrice);

  const avgRate =
    reviews.map((review) => review.rating).reduce((a, b) => a + b, 0) /
    reviews.length;

  async function handleBuyNow() {
    if (user) {
      if (await isProductInShoppingCart()) {
        navigate(routes.checkout);
      } else {
        addProductToCart();
        navigate(routes.checkout);
      }
    }
  }

  const { isAddedToWishlist, wishlistHandler, isLoading } = useFetchWishList(
    product.id,
  );

  return (
    <>
      <View
        style={{
          marginBottom: 5,
          alignItems: 'flex-start',
          marginHorizontal: 5,
          marginTop: 5,
        }}
      >
        <Button
          onPress={() =>
            navigate(routes.products, {
              collectionName: store.name,
              store: store,
            })
          }
        >
          Visit {store.name} Store
        </Button>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            paddingTop: 2,
            paddingHorizontal: 10,
          }}
          numberOfLines={3}
        >
          {product.title}
        </Text>
      </View>
      <View style={{ position: 'relative', alignItems: 'center' }}>
        {Number(product.discount) > 0 && (
          <View
            style={{
              backgroundColor: 'red',
              position: 'absolute',
              left: 0,
              padding: 8,
              zIndex: 20,
              borderBottomEndRadius: 15,
              marginLeft: 5,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              - {product.discount * 100}%
            </Text>
          </View>
        )}
        <Image
          source={{ uri: product.images[activeImage] }}
          alt={product.title}
          style={{
            width: 350,
            height: 350,
            marginHorizontal: 5,
          }}
        />
        <IconButton
          style={{ position: 'absolute', top: 0, right: 10, zIndex: 10 }}
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
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '97%',
            padding: 8,
            backgroundColor: colors.primaryTransparent,
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
          }}
        >
          <Avatar.Image source={{ uri: store.logo }} size={30} />
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
            {store.name}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          paddingHorizontal: 10,
        }}
      >
        {product.images.map((img, index) => {
          return (
            <TouchableOpacity key={img} onPress={() => setActiveImage(index)}>
              <Image
                key={img}
                source={{ uri: img }}
                alt={product.title}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          marginHorizontal: 5,
          marginVertical: 20,
          gap: 8,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          <Text>{isNaN(avgRate) ? 0 : avgRate.toFixed(1)}</Text>
          <StarRating
            enableHalfStar
            onChange={() => null}
            rating={isNaN(avgRate) ? 0 : avgRate}
            starStyle={{ width: 17 }}
          />
          <Text style={{ marginStart: 8 }}>
            ({reviews.length.toLocaleString()})
          </Text>
        </View>
        <Text style={{ fontSize: 14, fontStyle: 'italic' }}>
          {product.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: 'row', gap: 4, flexWrap: 'wrap' }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
              {productPrice.toLocaleString()} EGP
            </Text>
            {Number(product.discount) > 0 && (
              <Text
                style={{
                  fontSize: 20,
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
        <Text
          style={{
            paddingTop: 2,
            color:
              product.stockQuantity > 0
                ? product.stockQuantity > 5
                  ? 'green'
                  : 'orange'
                : 'red',
          }}
        >
          {product.stockQuantity > 0
            ? product.stockQuantity > 5
              ? 'In Stock'
              : `Only ${product.stockQuantity} in stock`
            : 'Out Stock'}
        </Text>
        <View
          style={{
            justifyContent: 'space-evenly',
            marginVertical: 10,
            gap: 4,
            alignItems: 'center',
          }}
        >
          <QuantitySelector
            value={selectedQty}
            onChange={setSelectedQty}
            maxValue={product.stockQuantity}
          />
          <Button
            style={{
              justifyContent: 'center',
              alignSelf: 'stretch',
              borderRadius: 8,
            }}
            mode="contained"
            buttonColor={colors.primary}
            onPress={handleBuyNow} //Add it later
          >
            Buy Now
          </Button>
          <Button
            style={{
              justifyContent: 'center',
              alignSelf: 'stretch',
              borderColor: colors.primary,
              borderRadius: 8,
            }}
            mode="outlined"
            onPress={handleAddToCart}
            textColor={colors.primary}
          >
            Add to Cart
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
