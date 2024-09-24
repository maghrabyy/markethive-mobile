import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { routes } from '../../utils/routes';

const WelcomeScreen = () => {
  const { navigate } = useNavigation();
  return (
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
            navigate(routes.loginScreen);
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
            navigate(routes.registerScreen);
          }
        }}
      >
        Register
      </Button>
    </ImageBackground>
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

export default WelcomeScreen;
