import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import storage from '../../storage';
import { useIsFirstUsage } from '../../context/Context Data/IsFirstUsageContext';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../routes/routes';

export const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { setIsFirstUsage } = useIsFirstUsage();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <Text>Welcome</Text>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate(routes.registerScreen);
        }}
      >
        Register
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate(routes.loginScreen);
        }}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => {
          storage.remove({ key: 'firstUsage' });
          setIsFirstUsage(null);
        }}
      >
        Clear Local Storage
      </Button>
    </View>
  );
};
