import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export const ScreenLoader = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  );
};