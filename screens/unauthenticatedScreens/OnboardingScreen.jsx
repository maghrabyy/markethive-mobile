import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../routes/routes';
import storage from '../../storage';
import { useIsFirstUsage } from '../../context/Context Data/IsFirstUsageContext';

export const OnboardingScreen = () => {
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
      <Text>Onboarding Screen</Text>
      <Button
        onPress={async () => {
          await storage.save({ key: 'firstUsage', data: false });
          const storageData = await storage.load({ key: 'firstUsage' });
          setIsFirstUsage(storageData);
        }}
        mode="outlined"
      >
        Save on Local Storage
      </Button>
    </View>
  );
};
