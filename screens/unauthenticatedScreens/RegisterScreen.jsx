import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { routes } from '../../utils/routes';
import { Formik } from 'formik';
import * as yup from 'yup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { authErrors } from '../../utils/authErrors';
import FaIcon from 'react-native-vector-icons/FontAwesome';

const phoneReg = /^01[0125][0-9]{8}$/gm;
const passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Enter your first name'),
  lastName: yup
    .string()
    .min(3, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Enter your last name'),
  phoneNumber: yup
    .string()
    .max(11, 'Too Long!')
    .required('Enter mobile number')
    .matches(phoneReg, 'phone is invaild'),
  email: yup.string().email('Invalid email').required('Enter your email'),
  password: yup
    .string()
    .required('Enter your password')
    .min(6, 'Passwords must be at least 6 characters.')
    .matches(
      passReg,
      'Password must contains (a-z,A-Z,1-9,special character).',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});

const RegisterScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  return (
    <SafeAreaView>
      <View style={{ marginLeft: 18, marginTop: 10 }}>
        <Text style={styles.txt}>Registeration</Text>
      </View>
      <ScrollView>
        <Formik
          validationSchema={signupSchema}
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={async ({
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
          }) => {
            setIsLoading(true);
            try {
              const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
              );
              await setDoc(doc(db, 'Customers', user.uid), {
                email: email,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                address: {},
                orders: [],
                shoppingCart: [],
                wishlist: [],
                registrationDate: new Date(),
              });
              await updateProfile(user, {
                displayName: `${firstName} ${lastName}`,
              });
              navigation.navigate(routes.homeScreen); // put the screen that navigate after register
              navigation.reset({
                index: 0,
                routes: [{ name: routes.homeScreen }],
              });
            } catch (error) {
              setAuthError(
                authErrors[error.code] ??
                  'Unable to register, try again later.',
              );
              setIsLoading(false);
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View>
                <TextInput
                  name="firstName"
                  placeholder="First Name"
                  placeholderTextColor={'black'}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    this.lastName.focus();
                  }}
                  style={styles.input}
                ></TextInput>
                <View style={{ flexDirection: 'row', marginLeft: 22, gap: 4 }}>
                  {errors.firstName && touched.firstName && (
                    <>
                      <FaIcon name="exclamation-circle" size={16} color="red" />
                      <Text style={styles.errorText}>{errors.firstName}</Text>
                    </>
                  )}
                </View>
                <TextInput
                  name="lastName"
                  placeholder="Last Name"
                  placeholderTextColor={'black'}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  returnKeyType="next"
                  ref={(input) => {
                    this.lastName = input;
                  }}
                  onSubmitEditing={() => {
                    this.email.focus();
                  }}
                  style={styles.input}
                ></TextInput>
                <View style={{ flexDirection: 'row', marginLeft: 22, gap: 4 }}>
                  {errors.lastName && touched.lastName && (
                    <>
                      <FaIcon name="exclamation-circle" size={16} color="red" />
                      <Text style={styles.errorText}>{errors.lastName}</Text>
                    </>
                  )}
                </View>
                <TextInput
                  name="email"
                  placeholder="Email"
                  placeholderTextColor={'black'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  returnKeyType="next"
                  ref={(input) => {
                    this.email = input;
                  }}
                  onSubmitEditing={() => {
                    this.phoneNumber.focus();
                  }}
                  style={styles.input}
                  keyboardType="email-address"
                ></TextInput>
                <View style={{ flexDirection: 'row', marginLeft: 22, gap: 4 }}>
                  {errors.email && touched.email && (
                    <>
                      <FaIcon name="exclamation-circle" size={16} color="red" />
                      <Text style={styles.errorText}>{errors.email}</Text>
                    </>
                  )}
                </View>
                <TextInput
                  name="phoneNumber"
                  placeholder="Phone Number"
                  placeholderTextColor={'black'}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                  returnKeyType="next"
                  ref={(input) => {
                    this.phoneNumber = input;
                  }}
                  onSubmitEditing={() => {
                    this.password.focus();
                  }}
                  style={styles.input}
                  keyboardType="numeric"
                ></TextInput>
                <View style={{ flexDirection: 'row', marginLeft: 22, gap: 4 }}>
                  {errors.phoneNumber && touched.phoneNumber && (
                    <>
                      <FaIcon name="exclamation-circle" size={16} color="red" />
                      <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                    </>
                  )}
                </View>
                <TextInput
                  name="password"
                  placeholder="Password"
                  placeholderTextColor={'black'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  returnKeyType="next"
                  ref={(input) => {
                    this.password = input;
                  }}
                  onSubmitEditing={() => {
                    this.confirmPassword.focus();
                  }}
                  secureTextEntry
                  style={styles.input}
                ></TextInput>
                <View style={{ flexDirection: 'row', marginLeft: 22, gap: 4 }}>
                  {errors.password && touched.password && (
                    <>
                      <FaIcon name="exclamation-circle" size={16} color="red" />
                      <Text style={styles.errorText}>{errors.password}</Text>
                    </>
                  )}
                </View>
                <TextInput
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  placeholderTextColor={'black'}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  ref={(input) => {
                    this.confirmPassword = input;
                  }}
                  secureTextEntry
                  style={styles.input}
                ></TextInput>
                <View style={{ flexDirection: 'row', marginLeft: 22, gap: 4 }}>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <>
                      <FaIcon name="exclamation-circle" size={16} color="red" />
                      <Text style={styles.errorText}>
                        {errors.confirmPassword}
                      </Text>
                    </>
                  )}
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: 1,
                    alignSelf: 'flex-end',
                    marginRight: 22,
                  }}
                >
                  <Text style={{ fontWeight: '700' }}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <Button
                style={styles.regBtn}
                mode="contained"
                onPress={handleSubmit}
                loading={isLoading}
              >
                Register
              </Button>
            </>
          )}
        </Formik>
        {authError && (
          <Text style={{ textAlign: 'center', color: 'red', marginTop: 8 }}>
            {authError}
          </Text>
        )}
        <View
          style={{
            marginTop: 20,
            marginBottom: 30,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 15 }}>Already have a account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.loginScreen)}
          >
            <Text
              style={{
                textDecorationLine: 'underline',
                fontSize: 15,
                fontWeight: '600',
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  txt: { fontSize: 40, fontWeight: '600' },
  input: {
    backgroundColor: '#cfcfcf',
    paddingVertical: 10,
    paddingLeft: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  regBtn: {
    marginTop: 5,
    marginHorizontal: 20,
    paddingVertical: 3,
    backgroundColor: '#F39932',
    borderRadius: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
});

export default RegisterScreen;
