import { ImageBackground, FlatList, Text, View } from 'react-native';
import { SlidesIndicator } from './SlidesIndicator';
import { useState } from 'react';
import HomeScreenBannerImg1 from '../assets/homescreen-banner1.svg';
import HomeScreenBannerImg2 from '../assets/homescreen-banner2.svg';
import HomeScreenBannerImg3 from '../assets/homescreen-banner3.svg';
import { resW } from '../constants/dimensions';
import { SCREEN_WIDTH } from '../constants/dimensions';

export const HomeScreenBanner = () => {
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerSlides = [
    {
      id: 0,
      title: 'Variety of stores',
      subtitle: 'Diverse Retail Options to Meet Every Need',
      image: <HomeScreenBannerImg1 height={130} width={resW(40)} />,
    },
    {
      id: 1,
      title: 'Free Delivery Fees',
      subtitle: 'Enjoy Convenient Shopping with No Extra Cost',

      image: <HomeScreenBannerImg2 height={130} width={resW(40)} />,
    },
    {
      id: 2,
      title: 'Online Payment',
      subtitle: 'Secure and Hassle-Free Transactions at Your Fingertips',
      image: <HomeScreenBannerImg3 height={130} width={resW(35)} />,
    },
  ];
  return (
    <>
      <ImageBackground
        source={require('../assets/bannerBg.png')}
        borderRadius={15}
        style={{
          marginTop: 4,
        }}
      >
        <FlatList
          data={bannerSlides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={({ id }) => id}
          onScroll={(e) => {
            const index = Math.round(
              e.nativeEvent.contentOffset.x / SCREEN_WIDTH,
            );
            setBannerIndex(index);
          }}
          contentContainerStyle={{
            paddingVertical: 10,
          }}
          renderItem={({ item }) => (
            <View
              style={{
                width: resW(94),
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {item.image}
              <View style={{ width: resW(40) }}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: resW(4.5),
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{ color: '#505050', fontWeight: '600', fontSize: 13 }}
                >
                  {item.subtitle}
                </Text>
              </View>
            </View>
          )}
        />
      </ImageBackground>
      <SlidesIndicator list={bannerSlides} targetIndex={bannerIndex} />
    </>
  );
};
