/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ShoppingCart, User} from 'iconsax-react-native';
import React from 'react';
import {View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../constants/colors';
import CartNavigator from './CartNavigator';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';

const TabNavigator = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({focused, color, size}) => {
          color = colors.black;
          size = 24;
          let icon = <Entypo name="home" color={color} size={size} />;

          if (route.name === 'CartTab') {
            icon = <ShoppingCart variant="TwoTone" color={color} size={size} />;
          } else if (route.name === 'ProfileTab') {
            icon = <User variant="TwoTone" color={color} size={size} />;
          }

          return <View>{icon}</View>;
        },
      })}>
      <Tabs.Screen name="HomeTab" component={HomeNavigator} />
      <Tabs.Screen name="CartTab" component={CartNavigator} />
      <Tabs.Screen name="ProfileTab" component={ProfileNavigator} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
