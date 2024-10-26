import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {ContactScreen, OrderScreen, ServiceScreen} from '../screens';
import FoodDetail from '../screens/food/FoodDetail';
import TabNavigator from './TabNavigator';
import AboutScreen from '../screens/about/AboutScreen';

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
    </Stack.Navigator>
  );
};

export default MainNavigator;
