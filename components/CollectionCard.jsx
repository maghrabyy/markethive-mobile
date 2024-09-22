import { TouchableOpacity, Text, Image } from 'react-native';
import { resW } from '../constants/dimensions';
import { colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../utils/routes';

export const CollectionCard = ({
  title,
  imageUrl,
  params,
  width = resW(45),
  height = 200,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(routes.products, params);
      }}
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
    </TouchableOpacity>
  );
};
