import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { Formik } from 'formik';
import { Button } from 'react-native-paper';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../constants/colors';
import { resH, resW } from '../../constants/dimensions';
const AddressForm = ({ address, setEditing, update }) => {
  const checkoutSchema = Yup.object().shape({
    city: Yup.string().required('Required'),
    streetAddress: Yup.string().required('Required'),
    buildingNumber: Yup.string().required('Required'),
    floor: Yup.string().required('Required'),
    aptNumber: Yup.string().required('Required'),
  });

  return (
    <View style={{ width: resW(95), alignSelf: 'center' }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 22,
          marginVertical: 15,
          color: colors.primary,
        }}
      >
        {update ? 'Edit Your Address' : 'Add Your Address'}
      </Text>
      <Formik
        initialValues={
          address || {
            city: '',
            streetAddress: '',
            buildingNumber: '',
            floor: '',
            aptNumber: '',
            nearestLandmark: '',
          }
        }
        validationSchema={checkoutSchema}
        onSubmit={async (values, action) => {
          const addressRef = doc(db, 'Customers', `${auth.currentUser.uid}`);
          await updateDoc(addressRef, {
            address: {
              city: values.city,
              streetAddress: values.streetAddress,
              buildingNumber: values.buildingNumber,
              floor: values.floor,
              aptNumber: values.aptNumber,
              nearestLandmark: values.nearestLandmark ?? '',
            },
          });
          setEditing(false);
          action.resetForm();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          validateForm,
          setTouched,
        }) => (
          <>
            <View style={{}}>
              <Text style={styles.label}>City</Text>
              <TextInput
                name="city"
                placeholder="Add your City"
                onChangeText={handleChange('city')}
                style={styles.input}
                onBlur={handleBlur('city')}
                value={values.city}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.streetAddress.focus();
                }}
              />
              <View style={styles.erorVeiw}>
                {errors.city && touched.city && (
                  <>
                    <FaIcon name="exclamation-circle" size={16} color="red" />
                    <Text style={styles.errorText}>{errors.city}</Text>
                  </>
                )}
              </View>
              <Text style={styles.label}>Street Adress </Text>

              <TextInput
                style={styles.input}
                name="streetAddress"
                placeholder="Add your Street Address"
                onChangeText={handleChange('streetAddress')}
                onBlur={handleBlur('streetAddress')}
                value={values.streetAddress}
                returnKeyType="next"
                ref={(input) => {
                  this.streetAddress = input;
                }}
                onSubmitEditing={() => {
                  this.buildingNumber.focus();
                }}
              />
              <View style={styles.erorVeiw}>
                {errors.streetAddress && touched.streetAddress && (
                  <>
                    <FaIcon name="exclamation-circle" size={16} color="red" />
                    <Text style={styles.errorText}>{errors.streetAddress}</Text>
                  </>
                )}
              </View>
              <Text style={styles.label}>Building Number</Text>

              <TextInput
                style={styles.input}
                name="buildingNumber"
                placeholder="Add your Building Number"
                onChangeText={handleChange('buildingNumber')}
                onBlur={handleBlur('buildingNumber')}
                value={values.buildingNumber}
                returnKeyType="next"
                ref={(input) => {
                  this.buildingNumber = input;
                }}
                onSubmitEditing={() => {
                  this.floor.focus();
                }}
              />
              <View style={styles.erorVeiw}>
                {errors.buildingNumber && touched.buildingNumber && (
                  <>
                    <FaIcon name="exclamation-circle" size={16} color="red" />
                    <Text style={styles.errorText}>
                      {errors.buildingNumber}
                    </Text>
                  </>
                )}
              </View>
              <Text style={styles.label}>Floor Number</Text>

              <TextInput
                style={styles.input}
                name="floor"
                placeholder="Add your Floor no"
                onChangeText={handleChange('floor')}
                onBlur={handleBlur('floor')}
                value={values.floor}
                returnKeyType="next"
                ref={(input) => {
                  this.floor = input;
                }}
                onSubmitEditing={() => {
                  this.aptNumber.focus();
                }}
              />
              <View style={styles.erorVeiw}>
                {errors.floor && touched.floor && (
                  <>
                    <FaIcon name="exclamation-circle" size={16} color="red" />
                    <Text style={styles.errorText}>{errors.floor}</Text>
                  </>
                )}
              </View>
              <Text style={styles.label}>Apartment Number</Text>

              <TextInput
                style={styles.input}
                name="aptNumber"
                placeholder="Add your Apart Number"
                onChangeText={handleChange('aptNumber')}
                onBlur={handleBlur('aptNumber')}
                value={values.aptNumber}
                returnKeyType="next"
                ref={(input) => {
                  this.aptNumber = input;
                }}
                onSubmitEditing={() => {
                  this.nearestLandmark.focus();
                }}
              />
              <View style={styles.erorVeiw}>
                {errors.aptNumber && touched.aptNumber && (
                  <>
                    <FaIcon name="exclamation-circle" size={16} color="red" />
                    <Text style={styles.errorText}>{errors.aptNumber}</Text>
                  </>
                )}
              </View>
              <Text style={styles.label}>Nearst Landmark</Text>

              <TextInput
                style={styles.input}
                name="nearestLandmark"
                placeholder="Add Nearest Landmark (optional)"
                onChangeText={handleChange('nearestLandmark')}
                onBlur={handleBlur('nearestLandmark')}
                value={values.nearestLandmark}
                ref={(input) => {
                  this.nearestLandmark = input;
                }}
              />
              <Button
                mode="contained"
                onPress={async () => {
                  // Validate the form and set all fields as touched
                  const errors = await validateForm();
                  setTouched({
                    city: true,
                    streetAddress: true,
                    buildingNumber: true,
                    floor: true,
                    aptNumber: true,
                    nearestLandmark: true,
                  });

                  if (Object.keys(errors).length === 0) {
                    handleSubmit();
                  }
                }}
                style={{
                  width: resW(80),
                  alignSelf: 'center',
                  marginTop: resH(2),
                  backgroundColor: colors.primary,
                }}
              >
                {update ? 'Update Address' : 'Add Address'}
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  erorVeiw: {
    flexDirection: 'row',
    gap: 10,
    width: resW(90),
    alignSelf: 'center',
  },
  txt: { fontSize: 50, fontWeight: '600' },
  input: {
    backgroundColor: '#dbdbdb',
    paddingVertical: 10,
    paddingLeft: 10,
    borderRadius: 15,
    height: resH(6),
  },
  errorText: {
    fontSize: 14,
    color: 'red',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    color: 'black',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});
export default AddressForm;
