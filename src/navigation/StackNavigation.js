import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import routes from '../utils/routes';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';

const stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name={routes.welcome}
        component={Welcome}
        options={{ headerShown: false }}
      ></stack.Screen>
      <stack.Screen
        name={routes.login}
        component={Login}
        options={{ headerShown: false }}
      ></stack.Screen>
      <stack.Screen
        name={routes.register}
        component={Register}
        options={{ headerShown: false }}
      ></stack.Screen>
      <stack.Screen
        name={routes.home}
        component={Home}
        options={{ headerShown: false }}
      ></stack.Screen>
    </stack.Navigator>
  );
};

export default StackNavigation;
