/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AuthNavigator from './src/routers/AuthNavigator';
import MainNavigator from './src/routers/MainNavigator';
import auth from '@react-native-firebase/auth';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import CartProvider from './src/context/CartContext';

const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'pink'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),

  error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setIsLogin(user ? (user?.uid ? true : false) : false);
    });
  }, []);

  return (
    <CartProvider>
      <NavigationContainer>
        {!isLogin ? <AuthNavigator /> : <MainNavigator />}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </CartProvider>
  );
};

export default App;

{
  /* <>
  <StatusBar
    translucent
    backgroundColor={'transparent'}
    barStyle={'dark-content'}
  />
</>; */
}
