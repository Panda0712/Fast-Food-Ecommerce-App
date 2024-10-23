/* eslint-disable no-lone-blocks */
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AuthNavigator from './src/routers/AuthNavigator';
import MainNavigator from './src/routers/MainNavigator';
import auth from '@react-native-firebase/auth';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setIsLogin(user ? (user?.uid ? true : false) : false);
    });
  }, []);

  return (
    <NavigationContainer>
      {!isLogin ? <AuthNavigator /> : <MainNavigator />}
    </NavigationContainer>
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
