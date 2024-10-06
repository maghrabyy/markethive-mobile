import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../src/constants/theme';

export const ScreenLoader = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color={COLORS.primary} />
    </View>
  );
};
