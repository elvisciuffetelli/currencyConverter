import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Themes from './screens/Themes';

EStyleSheet.build({
  $primaryBlue: '#4f6d7a',
  $primaryViolet: '#5925db',
  $primaryOrange: '#d57a66',
  $primaryGreen: '#00bd9d',
  $primaryPurple: '#9e768f',

  $white: '#ffffff',
  $border: '#e2e2e2',
  $input_text: '#797979',
  $lightGray: '#f0f0f0',
  $darkText: '#343434',

  // $outline: 1,
});

export default () => <Themes />;
