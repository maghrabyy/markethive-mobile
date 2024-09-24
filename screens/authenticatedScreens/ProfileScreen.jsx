import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { routes } from '../../utils/routes';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
      <Button onPress={() => navigation.navigate(routes.orders)}>
        Order Page
      </Button>
    </View>
  );
};
