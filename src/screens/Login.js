import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Icon } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import routes from '../utils/routes';
import { Formik } from 'formik';
import * as yup from 'yup';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authErrors } from '../utils/authErrors';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  return (
    <SafeAreaView>
      <View style={{ marginLeft: 18, marginTop: 130 }}>
        <Text style={styles.txt}>Login</Text>
        {authError && (
          <Text style={{ textAlign: 'center', color: 'red' }}>{authError}</Text>
        )}
      </View>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={async ({ email, password }) => {
          setIsLoading(true);
          try {
            await signInWithEmailAndPassword(auth, email, password);
            const customerDoc = await getDoc(
              doc(db, 'Customers', auth.currentUser.uid),
            );
            if (customerDoc.exists()) {
              navigation.navigate(routes.home); // put the screen that navigate after login
            } else {
              setAuthError('Unauthorized Access.');
              signOut(auth);
              setIsLoading(false);
            }
          } catch (error) {
            setAuthError(
              authErrors[error.code] ?? 'Unable to login, try again later.',
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
                name="email"
                placeholder="Email"
                placeholderTextColor={'black'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.password.focus();
                }}
                style={styles.input}
                keyboardType="email-address"
              ></TextInput>
              <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                {errors.email && touched.email && (
                  <>
                    <Icon source="exclamation" size={20} color="red" />
                    <Text style={styles.errorText}>{errors.email}</Text>
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
                ref={(input) => {
                  this.password = input;
                }}
                secureTextEntry
                style={styles.input}
              ></TextInput>
              <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                {errors.password && touched.password && (
                  <>
                    <Icon source="exclamation" size={20} color="red" />
                    <Text style={styles.errorText}>{errors.password}</Text>
                  </>
                )}
              </View>

              <TouchableOpacity
                style={{ marginTop: 5, alignSelf: 'flex-end', marginRight: 22 }}
              >
                <Text style={{ fontWeight: '700' }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <Button
              style={styles.loginBtn}
              mode="contained"
              onPress={handleSubmit}
              loading={isLoading}
            >
              Login
            </Button>
          </>
        )}
      </Formik>
      <View
        style={{
          marginTop: 100,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 15 }}>Does'nt have an accout?</Text>
        <TouchableOpacity onPress={() => navigation.navigate(routes.register)}>
          <Text
            style={{
              textDecorationLine: 'underline',
              fontSize: 15,
              fontWeight: '600',
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  txt: { fontSize: 50, fontWeight: '600' },
  input: {
    backgroundColor: '#cfcfcf',
    paddingVertical: 10,
    paddingLeft: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  loginBtn: {
    marginTop: 30,
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

export default Login;
