import { View, Text } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useState } from 'react';
import { COLORS } from '../../src/constants/theme';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native';
import { TextInput } from 'react-native-paper';

export const CardCheckoutForm = ({ totalAmount, placeOrderHandler }) => {
  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://markethive-stripe-payment.vercel.app/create-payment-intent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: totalAmount * 100,
            currency: 'usd',
          }),
        },
      );

      const paymentIntent = await response.json();

      const confirmPayment = await stripe.confirmPayment(
        paymentIntent.clientSecret,
        {
          paymentMethodType: 'Card',
        },
      );

      if (confirmPayment.error) {
        setErrorMessage(confirmPayment.error.message);
        setIsLoading(false);
      } else {
        placeOrderHandler();
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };
  return (
    <View style={{ gap: 8 }}>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: 'xxxx xxxx xxxx xxxx',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          borderRadius: 12,
        }}
        style={{
          width: '100%',
          height: 50,
        }}
      />
      <Button
        loading={isLoading}
        textColor="white"
        style={{
          marginVertical: 10,
          borderWidth: 1,
          borderRadius: 8,
          backgroundColor: COLORS.primary,
        }}
        onPress={() =>
          Alert.alert(
            'Confirm Order',
            `Are you sure you want to place order of amount ${totalAmount.toLocaleString()}EGP?`,
            [
              {
                text: 'Cancel',
              },
              {
                text: 'Confirm',
                onPress: handleSubmit,
              },
            ],
          )
        }
      >
        Place Order
      </Button>
      {errorMessage && <Text>{errorMessage}</Text>}
    </View>
  );
};
