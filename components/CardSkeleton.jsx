import { View } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { resW } from '../constants/dimensions';

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
