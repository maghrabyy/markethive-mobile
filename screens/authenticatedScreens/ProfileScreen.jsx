import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { resH, resW } from '../../constants/dimensions';
import { useEffect, useState } from 'react';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { routes } from '../../utils/routes';
import { colors } from '../../constants/colors';
import { auth } from '../../firebase';
import { Alert } from 'react-native';

export const ProfileScreen = ({ navigation }) => {
  var actions = [
    {
      img: require('../../assets/shopping-bags.png'),
      title: 'My Order',
      fun: function () {
        navigation.navigate(routes.homeScreen);
      },
      color: '#f8c471',
    },
    {
      img: require('../../assets/order.png'),
      title: 'My Cart',
      fun: function () {
        navigation.navigate(routes.shoppingCart);
      },
      color: '#d5f5e3',
    },
    {
      img: require('../../assets/wishlist.png'),
      title: 'My Wishlist',
      fun: function () {
        navigation.navigate(routes.homeScreen);
      },
      color: '#85c1e9',
    },
    {
      img: require('../../assets/logout.png'),
      title: 'Logout',
      fun: function () {
        Alert.alert(
          'Logout', // Title of the alert
          'Are you sure you need to log out', // Message of the alert
          [
            {
              text: 'Cancel',
            },
            { text: 'OK', onPress: () => auth.signOut() },
          ],
        );
      },
      color: '#ec7063',
    },
  ];
  const [username, setusername] = useState('ff')||[];
  useEffect(() => {
    setusername(auth.currentUser.displayName);
  }, []);
  return (
    <>
      <ImageBackground
        source={require('../../assets/back.png')}
        style={{ flex: 1, marginTop: -20 }}
      >
        <View style={styles.avatarVeiw}>
          <Avatar.Text
            size={100}
            label={username[0]}
            color="white"
            style={{ backgroundColor: 'orange' }}
          />
          <Text style={styles.nameTxt}>{username}</Text>
        </View>
        <View style={styles.bottomVeiw}>
          <Text style={styles.bottomVeiwHeader}>Account overveiw</Text>
          {actions.map((item, index) => (
            <>
              <TouchableOpacity
                key={index}
                style={styles.toucableVeiw}
                onPress={() => item.fun()}
              >
                <View style={styles.iconVeiw}>
                <View style={[styles.icon, { backgroundColor: item.color }]}>
                    <Image
                      source={item.img}
                      style={{
                        width: '50%',
                        height: '50%',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                </View>
                <View style={styles.txtVeiw}>
                  <Text style={styles.icontxt}>{item.title}</Text>
                </View>

                <View style={styles.goVeiw}>
                  <Icon name="chevron-right" size={20} color="black" />
                </View>
              </TouchableOpacity>
            </>
          ))}
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  avatarVeiw: {
    height: resH(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameTxt: {
    fontSize: 25,
    fontWeight:'500',
    color: 'white',
    marginTop: 15,
  },
  bottomVeiw: {
    backgroundColor: 'white',
    height: resH(60),
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    width: resW(100),
    paddingHorizontal: resW(5),
  },
  bottomVeiwHeader: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
    marginVertical: 15,
  },
  toucableVeiw: {
    width: resW(90),
    height: resH(9),
    flexDirection: 'row',
    marginBottom: 10,
  },
  iconVeiw: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: resW(15),
    // backgroundColor: item.color,
    height: resH(8),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtVeiw: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  icontxt: {
    fontSize: 18,
    fontWeight:'400',
    color: 'black',
    marginVertical: 15,
  },
  goVeiw: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
