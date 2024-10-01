import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { useFetchCartItems } from '../../Custom Hooks/useFetchCartItems';
import { useFetchProduct } from '../../Custom Hooks/useFetchProduct';
import { useFetchStore } from '../../Custom Hooks/useFetchStore';
import { colors } from '../../constants/colors';
import { resH, resW } from '../../constants/dimensions';
import{OrderSkeletonCard} from '../../components/CardSkeleton';
const OrderShippment = () => {
  const { cartItems, isCartLoading } = useFetchCartItems();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const date = new Date();
  date.setDate(date.getDate() + 2);
  const orderDate = date.toDateString();

  return (
    <View style={{ width: resW(95), alignSelf: 'center' }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 22,
          marginVertical: 10,
          color: colors.primary,
        }}
      >
        Your Order
      </Text>
      <View style={{ }}>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>
          Shipment ({totalItems}) items
        </Text>
        <View>
          {isCartLoading ? (
            <OrderSkeletonCard/>
          ) : (
            cartItems.map((item) => (
              <Items
                key={item.prodId}
                quantity={item.quantity}
                subTotal={item.subTotal.toLocaleString()}
                prodId={item.prodId}
              />
            ))
          )}
        </View>
        <Text style={{fontWeight:'500'}}>Get it by <Text style={{fontWeight:'500',color:colors.primary}}>{orderDate}</Text></Text>
      </View>
    </View>
  );
};

export default OrderShippment;

const Items = ({ quantity, subTotal, prodId }) => {
  const { product, isProductLoading } = useFetchProduct(prodId);
  const { store } = useFetchStore(product?.storeId);

  return isProductLoading ? (
    <OrderSkeletonCard/>
  ) : (
    <View
      style={{
        marginVertical: 10,
        height:resH(13),
        flexDirection: 'row',
      }}
    >
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1}}>
          <Image
            source={{
              uri: `${product.images}`,
            }}
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          />
          <View style={{justifyContent:'center',alignItems:'center',position:'absolute',width:20,height:20,backgroundColor:colors.primary,borderRadius:10,right:0}}>
          <Text style={{color:'white',fontSize:12}} >{quantity}X</Text>


          </View>
        </View>
      </View>
      <View style={{ flex: 8,paddingLeft:10,justifyContent:'center' }}>
          <Text style={styles.graytxt}>{store?.name}</Text>
          <Text style={styles.lefttxt}>{product.title.length>30?product.title.slice(0,30)+"....":product.title}</Text>
          <Text style={styles.lefttxt}>{subTotal} EGP</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  graytxt:{fontWeight:'400',color:'gray',fontSize:16},
  lefttxt:{fontSize:14,fontWeight:'800'}
});
