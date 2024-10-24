import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import TabNavigator from './TabNavigator';
import FoodDetail from '../screens/food/FoodDetail';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="FoodDetail" component={FoodDetail} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
