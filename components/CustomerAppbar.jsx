import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Avatar, Badge, Appbar } from 'react-native-paper';
import Fa5Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../constants/colors';
import { routes } from '../utils/routes';
import { useFetchCartItems } from '../Custom Hooks/useFetchCartItems';

export const CustomAppBar = ({
  title,
  navigation,
  hideActions,
  hideLeading,
}) => {
  const { cartItems, isCartLoading } = useFetchCartItems();
  const shoppingCartItemNum = cartItems.length;
  return (
    <Appbar.Header style={styles.appBarBody}>
      {navigation.canGoBack() && (
        <Appbar.BackAction
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
      {hideLeading ? (
        <Appbar.Content />
      ) : (
        <Appbar.Content
          title={
            <View
              style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
            >
              <Avatar.Image
                source={require('../assets/MHLogoIcon.png')}
                size={38}
              />
              <Text style={styles.headerText}>
                {title ? title : 'Market Hive'}
              </Text>
            </View>
          }
        />
      )}
      {!hideActions && (
        <>
          <Appbar.Action
            icon={() => <Fa5Icon name="user-circle" size={24} color="white" />}
            onPress={() => {
              navigation.navigate(routes.profile);
            }}
          />

          <View style={{ position: 'relative' }}>
            <Appbar.Action
              icon={() => (
                <Fa5Icon name="shopping-cart" size={24} color="white" />
              )}
              onPress={() => {
                navigation.navigate(routes.shoppingCart);
              }}
            />
            {!isCartLoading && (
              <Badge size={22} style={{ position: 'absolute', top: 2 }}>
                {shoppingCartItemNum}
              </Badge>
            )}
          </View>
        </>
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appBarBody: {
    backgroundColor: colors.primary,
    elevation: 10,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
});
