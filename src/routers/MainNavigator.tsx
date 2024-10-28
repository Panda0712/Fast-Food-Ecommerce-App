import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {
  AboutScreen,
  CheckoutScreen,
  ContactScreen,
  FoodDetail,
  OrderScreen,
  SearchScreen,
  ServiceScreen,
  ShippingScreen,
  SuccessScreen,
} from '../screens';
import TabNavigator from './TabNavigator';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="FoodDetail" component={FoodDetail} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
      <Stack.Screen name="ContactScreen" component={ContactScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="ShippingScreen" component={ShippingScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
