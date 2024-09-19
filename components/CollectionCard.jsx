import { View, Text, Image } from 'react-native';
import { resW } from '../constants/dimensions';
import { colors } from '../constants/colors';

export const CollectionCard = ({
  title,
  imageUrl,
  width = resW(45),
  height = 200,
}) => {
  return (
    <View
      style={{
        height: height,
        width: width,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        elevation: 0.5,
      }}
    >
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
