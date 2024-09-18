import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import routes from '../utils/routes';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = () => {
  const { navigate } = useNavigation();
  return (
    // <SafeAreaView style={{ width: '100%', alignSelf: 'center', flex: 1 }}>
    <ImageBackground
      source={require('../../assets/bg-welcome.png')}
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <Image source={require('../../assets/MHLogo.png')} style={styles.img} />
      <Button
        style={styles.loginBtn}
        mode="contained"
        onPress={() => {
          {
            navigate(routes.login);
          }
        }}
      >
        Login
      </Button>
      <Button
        mode="contained"
        labelStyle={{ color: 'black' }}
        style={styles.regBtn}
        onPress={() => {
          {
            navigate(routes.register);
          }
        }}
      >
        Register
      </Button>
    </ImageBackground>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    marginTop: 90,
    paddingVertical: 3,
    marginHorizontal: 20,
    backgroundColor: '#F39932',
    borderRadius: 10,
  },
  regBtn: {
    marginTop: 20,
    paddingVertical: 3,
    marginHorizontal: 20,
    backgroundColor: '#b2b5b0',
    borderRadius: 10,
  },
  img: { width: '100%', resizeMode: 'contain' },
});

export default Welcome;
