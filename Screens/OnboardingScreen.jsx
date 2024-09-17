import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import EcommerceImg from '../assets/ecommerce.svg';
import MarketsImg from '../assets/markets.svg';
import DeliveryImg from '../assets/delivery.svg';
import { COLORS, SIZES } from '../src/constants/theme';

const slides = [
  {
    id: 1,
    title: 'A miscellaneous shopping experience.',
    description:
      'Enjoy a unique and varied shopping experience across our range of online stores, catering to all your miscellaneous needs.',
    image: <EcommerceImg />,
  },
  {
    id: 2,
    title: 'Variety of online stores and categories.',
    description:
      'Discover a diverse range of online stores under one roof, offering a wide selection of categories to meet all your shopping needs!',
    image: <MarketsImg />,
  },
  {
    id: 3,
    title: 'Fast delivery.',
    description:
      'Experience the joy of fast and reliable delivery with our ecommerce store, ensuring your favorite products arrive at your doorstep in no time!',
    image: <DeliveryImg />,
  },
];

const OnboardingScreen = ({ setShowHomePage }) => {
  const buttonLabel = (label) => {
    return (
      <View style={{ padding: 12 }}>
        <Text
          style={{
            color: COLORS.title,
            fontWeight: '600',
            fontSize: SIZES.h4,
          }}
        >
          {label}
        </Text>
      </View>
    );
  };
  return (
    <AppIntroSlider
      data={slides}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={{ width: SIZES.width, height: 400 }}>{item.image}</View>
          <Text style={styles.slideTitle}>{item.title}</Text>
          <Text style={styles.slideDescription}>{item.description}</Text>
        </View>
      )}
      showSkipButton
      activeDotStyle={{ backgroundColor: COLORS.primary, width: 30 }}
      renderNextButton={() => buttonLabel('Next')}
      renderSkipButton={() => buttonLabel('Skip')}
      renderDoneButton={() => buttonLabel('Get Start')}
      onDone={() => setShowHomePage(true)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideTitle: {
    fontSize: 20,
    // paddingHorizontal: 2,
    fontWeight: 'bold',
    marginTop: 20,
  },
  slideDescription: {
    textAlign: 'center',
    padding: 10,
  },
});

export default OnboardingScreen;
