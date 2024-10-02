import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import FaIcon from 'react-native-vector-icons/AntDesign';
import { colors } from '../../constants/colors';
import { resH, resW } from '../../constants/dimensions';
const ShippingAddress = ({ setEditing, setUpdate, customer }) => {
  return (
    <View style={{ width: resW(95), alignSelf: 'center' }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 22,
          marginVertical: 10,
          color: colors.primary,
        }}
      >
        Shipping Address
      </Text>
      <View style={{ padding: 5 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 0.2,
            paddingBottom: 8,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '500' }}>
            Address (Home)
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,

              paddingHorizontal: 10,
              borderRadius: 10,
              paddingVertical: 5,
              color: 'white',
              fontWeight: 'bold',
              flexDirection: 'row',
            }}
            onPress={() => {
              setEditing(true);
              setUpdate(true);
            }}
          >
            <Text style={{ color: 'white' }}>Edit </Text>
            <FaIcon name="edit" color="white" size={16} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
          <View
            style={{
              flex: 1.2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FaIcon name="enviromento" size={28} color={colors.primary} />
          </View>
          <View style={{ flex: 8 }}>
            <Text style={styles.lefttxt}>
              Deliver to:{' '}
              <Text style={styles.graytxt}>
                {customer?.firstName} {customer?.lastName}
              </Text>
            </Text>
            <Text style={styles.lefttxt}>
              City:
              <Text style={styles.graytxt}> {customer?.address?.city}</Text>
            </Text>
            <Text style={styles.lefttxt}>
              Street Address:
              <Text style={styles.graytxt}>
                {' '}
                {customer?.address?.streetAddress}
              </Text>
            </Text>
            <Text style={styles.lefttxt}>
              Building Number:{' '}
              <Text style={styles.graytxt}>
                {customer?.address?.buildingNumber}
              </Text>
            </Text>
            <Text style={styles.lefttxt}>
              Floor:
              <Text style={styles.graytxt}> {customer?.address?.floor}</Text>
            </Text>
            <Text style={styles.lefttxt}>
              Apt Number:{' '}
              <Text style={styles.graytxt}>{customer?.address?.aptNumber}</Text>
            </Text>
            {customer?.address?.nearestLandmark && (
              <Text style={styles.lefttxt}>
                Nearest Landmark:
                <Text style={styles.graytxt}>
                  {customer?.address?.nearestLandmark}
                </Text>
              </Text>
            )}
            <Text style={styles.lefttxt}>
              Phone Number:{' '}
              <Text style={styles.graytxt}>{customer?.phoneNumber} </Text>
              <FaIcon name="checkcircleo" size={15} color={'green'} />
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  graytxt: { fontWeight: '400', color: 'gray' },
  lefttxt: { fontSize: 14, fontWeight: '800' },
});
export default ShippingAddress;
