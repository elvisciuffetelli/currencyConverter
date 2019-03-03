import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Home from './screens/Home';

EStyleSheet.build({
  $primaryBlue: '#4f6d7a',
  $white: '#ffffff',
  $border: '#e2e2e2',
  $input_text: '#797979',
  $lightGray: '#f0f0f0',

  // $outline: 1,
});

export default () => <Home />;
