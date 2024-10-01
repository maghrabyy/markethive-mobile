import { View } from 'react-native';
import React, { useState } from 'react';
import { useFetchCartItems } from '../../Custom Hooks/useFetchCartItems';
import AddressForm from './AddressForm';
import ShippingAddress from './ShippingAddress';
import OrderShippment from './OrderShippment';
import Payment from './Payment';

const PlaceOrder = ({ customer }) => {
  const [editing, setEditing] = useState(!customer.address?.city);
  const [update, setUpdate] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { cartItems } = useFetchCartItems();
  return (
    <View>
      {editing ? (
        <AddressForm
          address={customer.address}
          setEditing={setEditing}
          update={update}
        />
      ) : (
        <>
          <View>
            <ShippingAddress
              setEditing={setEditing}
              setUpdate={setUpdate}
              customer={customer}
              setIsDisabled={setIsDisabled}
            />
            <OrderShippment />
            <Payment />
          </View>
          {/* <View> 
                                // add here order summary
          </View> */}
        </>
      )}
    </View>
  );
};

export default PlaceOrder;
