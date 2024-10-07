import {
  View,
  ScrollView,
  FlatList,
  Text,
  ImageBackground,
} from 'react-native';
import useFetchData from '../../Custom Hooks/useFetchData';
import { ProductCard } from '../../components/ProductCard';
import { CollectionCard } from '../../components/CollectionCard';
import { resW, SCREEN_WIDTH } from '../../constants/dimensions';
import { CollectionSkeletonCard } from '../../components/CardSkeleton';
import { ProductSkeletonCard } from '../../components/CardSkeleton';
import { HomeScreenSection } from '../../components/HomeScreenSection';
import { SlidesIndicator } from '../../components/SlidesIndicator';
import { useState } from 'react';
import HomeScreenBannerImg1 from '../../assets/homescreen-banner1.svg';
import HomeScreenBannerImg2 from '../../assets/homescreen-banner2.svg';
import HomeScreenBannerImg3 from '../../assets/homescreen-banner3.svg';

export const HomeScreen = () => {
  const [categoriesIndex, setCategoriesIndex] = useState(0);
  const [storesIndex, setStoresIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);
  const {
    products,
    categories,
    stores,
    isCatsLoading,
    isProdsLoading,
    isStoresLoading,
  } = useFetchData();
  const popularProdList = products
    .sort((a, b) => b.reviews.length - a.reviews.length)
    .slice(0, 4);
  const popularStoresList = stores
    .sort((a, b) => b.products.length - a.products.length)
    .slice(0, 4);
  const popularCategoryList = categories.slice(0, 4);
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
    <ScrollView
      style={{ flex: 1, paddingHorizontal: resW(3) }}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require('../../assets/bannerBg.png')}
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
      <HomeScreenSection title="Popular Categories">
        {isCatsLoading ? (
          <ScrollView horizontal>
            {Array.from(Array(2)).map((_, index) => (
              <CollectionSkeletonCard
                key={index}
                style={{
                  marginEnd: index !== popularStoresList.length - 1 && resW(2),
                }}
              />
            ))}
          </ScrollView>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / SCREEN_WIDTH,
              );
              setCategoriesIndex(index);
            }}
          >
            {popularCategoryList.map((category, index) => (
              <View
                key={category.id}
                style={{
                  marginEnd:
                    index !== popularCategoryList.length - 1 && resW(2),
                }}
              >
                <CollectionCard
                  title={category.categoryName}
                  imageUrl={category.categoryImage}
                  params={{
                    collectionName: category.categoryName,
                    categoryId: category.id,
                  }}
                />
              </View>
            ))}
          </ScrollView>
        )}
        <SlidesIndicator
          list={popularCategoryList.slice(
            0,
            Math.floor(popularCategoryList.length / 2),
          )}
          targetIndex={categoriesIndex}
        />
      </HomeScreenSection>
      <HomeScreenSection title="Popular Stores">
        {isStoresLoading ? (
          <ScrollView horizontal>
            {Array.from(Array(2)).map((_, index) => (
              <CollectionSkeletonCard
                key={index}
                style={{
                  marginEnd: index !== popularStoresList.length - 1 && resW(2),
                }}
              />
            ))}
          </ScrollView>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={(e) => {
              const index = Math.round(
                e.nativeEvent.contentOffset.x / SCREEN_WIDTH,
              );
              setStoresIndex(index);
            }}
          >
            {popularStoresList.map((store, index) => (
              <View
                key={store.id}
                style={{
                  marginEnd: index !== popularStoresList.length - 1 && resW(2),
                }}
              >
                <CollectionCard
                  title={store.name}
                  imageUrl={store.logo}
                  params={{ collectionName: store.name, store }}
                />
              </View>
            ))}
          </ScrollView>
        )}
        <SlidesIndicator
          list={popularStoresList.slice(
            0,
            Math.floor(popularStoresList.length / 2),
          )}
          targetIndex={storesIndex}
        />
      </HomeScreenSection>

      <HomeScreenSection title="Popular Products">
        {isProdsLoading ? (
          <ProductSkeletonCard />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            renderItem={({ item: product }) => (
              <ProductCard product={product} />
            )}
          >
            {popularProdList.map((product, index) => (
              <View key={product.id}>
                <ProductCard product={product} />
                {index !== popularProdList.length - 1 && (
                  <View style={{ height: 10 }} />
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </HomeScreenSection>
    </ScrollView>
  );
};
