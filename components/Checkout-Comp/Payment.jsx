import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../constants/colors';
import { resH, resW } from '../../constants/dimensions';
import Icon from 'react-native-vector-icons/AntDesign';
import OrderSummary from '../OrderSummary';
import { useFetchCartItems } from '../../Custom Hooks/useFetchCartItems';

const Payment = () => {
  const [value, setValue] = useState(null);

  const [selected, setselected] = useState(-1);
  const [title, setTitle] = useState('');
  const { cartItems } = useFetchCartItems();

  const arr = [
    {
      img: require('../../assets/visa-mastercard.jpg'),
      title: 'Credit / Debit Card',
      value: 'debitNCredit',
    },
    {
      img: require('../../assets/valu.jpeg'),
      title: 'Valu',
      value: 'valu',
    },
    {
      img: require('../../assets/cash.png'),
      title: 'Cash on delivery',
      value: 'cash',
    },
  ];
  return (
    <>
      <View style={{ width: resW(95), alignSelf: 'center' }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 22,
            marginVertical: 10,
            color: colors.primary,
          }}
        >
          Select Payment Method
        </Text>

        <View
          style={{
            flexDirection: 'row',
            width: resW(90),
            // backgroundColor: 'red',
            alignSelf: 'center',
            height: resH(15),
            marginBottom: 10,
            justifyContent: 'space-between',
          }}
        >
          {arr.map((item, ind) => (
            <>
              <TouchableOpacity
                style={{
                  width: resW(26),
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  borderWidth: 1,
                  borderColor: ind == selected ? colors.primary : 'gray',
                  borderRadius: 15,
                }}
                key={ind}
                onPress={() => {
                  setselected(ind), setValue(item.value), setTitle(item.title);
                }}
              >
                <Image
                  key={ind}
                  source={item.img}
                  style={{ width: 54, height: 70, resizeMode: 'contain' }}
                />
                <Text
                  style={{
                    fontSize: 13,
                    alignSelf: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {item.title}
                </Text>
                {selected == ind ? (
                  <>
                    <View
                      style={{
                        position: 'absolute',
                        top: -12,
                        right: -12,
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#F1F1F1',
                      }}
                    >
                      <Icon
                        name={'checkcircle'}
                        size={20}
                        color={colors.primary}
                      />
                    </View>
                  </>
                ) : (
                  ''
                )}
              </TouchableOpacity>
            </>
          ))}
        </View>
        <OrderSummary cartItems={cartItems} value={value} title={title} />
      </View>
    </>
  );
};

export default Payment;
