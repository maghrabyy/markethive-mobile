import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { routes } from '../../routes/routes';

export const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login</Text>
      <Button
        mode="contained"
        onPress={() => {
          navigation.replace(routes.homeScreen);
        }}
      >
        Login
      </Button>
    </View>
  );
};
