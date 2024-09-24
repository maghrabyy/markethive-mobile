import { View } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { resW } from '../constants/dimensions';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'react-native-paper';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export const ProductSkeletonCard = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        elevation: 0.4,
        borderRadius: 8,
        overflow: 'hidden',
        gap: 4,
        alignItems: 'center',
      }}
    >
      <ShimmerPlaceholder height={200} width={resW(94)} />
      <View style={{ height: 50, gap: 4 }}>
        <ShimmerPlaceholder width={resW(94)} height={22} />
        <ShimmerPlaceholder width={resW(94)} height={24} />
      </View>
    </View>
  );
};

export const CollectionSkeletonCard = ({
  style,
  width = resW(45),
  height = 200,
}) => {
  return (
    <View
      style={[
        {
          height: height,
          width: width,
          borderRadius: 8,
          overflow: 'hidden',
          backgroundColor: 'white',
          elevation: 0.5,
          gap: 4,
          alignItems: 'center',
        },
        style,
      ]}
    >
      <ShimmerPlaceholder height="78%" />
      <ShimmerPlaceholder height="22%" />
    </View>
  );
};

export const OrderSkeletonCard = (style, width = resW(45), height = 200) => {
  return (
    <View
      style={[
        {
          height: height,
          width: width,
          borderRadius: 8,
          overflow: 'hidden',
          backgroundColor: '#fffff4',
          elevation: 0.5,
          gap: 4,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', gap: 10, paddingHorizontal: 16 }}>
        <ShimmerPlaceholder
          style={{ width: '50%', height: 100, borderRadius: 25 }}
        />
        <View style={{ gap: 15, alignSelf: 'center' }}>
          <ShimmerPlaceholder style={{ width: '80%', height: 12 }} />
          <ShimmerPlaceholder style={{ width: '80%', height: 12 }} />
          <ShimmerPlaceholder style={{ width: '80%', height: 12 }} />
        </View>
      </View>
    </View>
  );
};
