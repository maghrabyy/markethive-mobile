import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Avatar, IconButton, Badge } from 'react-native-paper';
import Fa5Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../style/colors';

export const CustomAppBar = () => {
  return (
    <View style={styles.appBarBody}>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Avatar.Image source={require('../assets/MHLogoIcon.png')} size={38} />
        <Text style={styles.headerText}>Market Hive</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <IconButton
          icon={() => <Fa5Icon name="user-circle" size={24} color="white" />}
          onPress={() => {}}
        />
        <View style={{ position: 'relative' }}>
          <IconButton
            icon={() => (
              <Fa5Icon name="shopping-cart" size={24} color="white" />
            )}
            onPress={() => {}}
          />
          <Badge size={22} style={{ position: 'absolute', top: 2 }}>
            0
          </Badge>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBarBody: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.primary,
    elevation: 10,
    borderBottomStartRadius: 18,
    borderBottomEndRadius: 18,
    paddingHorizontal: 14,
    height: 70,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
});
