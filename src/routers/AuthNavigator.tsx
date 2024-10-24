import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../screens';
import React from 'react';

import SignUp from '../screens/auth/SignUp';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
