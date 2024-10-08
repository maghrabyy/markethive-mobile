import { View, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../src/constants/theme';
import { resH, resW } from '../constants/dimensions';

export const ScreenLoader = ({ showIcon }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {showIcon && (
        <Image
          source={require('../assets/splashIcon.png')}
          style={{ width: resW(25), height: resH(22) }}
        />
      )}
      <ActivityIndicator color={COLORS.primary} />
    </View>
  );
};
