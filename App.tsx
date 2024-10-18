import React from 'react';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
    </>
  );
};

export default App;
