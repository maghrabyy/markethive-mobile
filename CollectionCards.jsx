import { View, Text, Image } from 'react-native';
import { resW } from './dimensions';
import { colors } from './colors';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

export const CollectionCard = ({title,imageUrl, width = resW(45), height = 250,}) => {
  return (
    <View  style={{    height: height,  width: width, borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginBottom: 15,
        elevation: 0.5,}} >
      <Image source={{ uri: imageUrl }} style={{ height: '78%' }} />
      <Text
        style={{
          paddingVertical: 8,
          fontSize: 20,
          fontWeight: 'bold',
          color: colors.dark,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export const CollectionSkeletonCard = ({style,width = resW(45),height = 200,}) => {
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
