/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {TextComponent} from '../components';
import {colors} from '../constants/colors';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartNavigator from './CartNavigator';
import FoodNavigator from './FoodNavigator';
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
          color = focused ? colors.black : colors.black4;
          size = 24;
          let icon = <Entypo name="home" color={color} size={size} />;
          let name = 'Trang chủ';

          if (route.name === 'CartTab') {
            icon = <Ionicons name="cart" color={color} size={size} />;
            name = 'Giỏ hàng';
          } else if (route.name === 'ProfileTab') {
            icon = <FontAwesome name="user" color={color} size={size} />;
            name = 'Tài khoản';
          } else if (route.name === 'FoodTab') {
            icon = <Ionicons name="fast-food" color={color} size={size} />;
            name = 'Thực đơn';
          }

          return (
            <View style={{alignItems: 'center'}}>
              {icon}
              <TextComponent text={name} />
            </View>
          );
        },
      })}>
      <Tabs.Screen name="HomeTab" component={HomeNavigator} />
      <Tabs.Screen name="FoodTab" component={FoodNavigator} />
      <Tabs.Screen name="CartTab" component={CartNavigator} />
      <Tabs.Screen name="ProfileTab" component={ProfileNavigator} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
