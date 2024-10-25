import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import FoodScreen from '../screens/food/FoodScreen';

const FoodNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FoodScreen" component={FoodScreen} />
    </Stack.Navigator>
  );
};

export default FoodNavigator;
