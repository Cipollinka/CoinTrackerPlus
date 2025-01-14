import {StyleProp, Text as TextRN, TextStyle} from 'react-native';
import React from 'react';

const fontFamily = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
  black: 'Roboto-Black',
  thin: 'Roboto-Thin',
  light: 'Roboto-Light',
};

interface Props {
  ff?: keyof typeof fontFamily;
  fs?: number;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export default function Text({
  ff = 'regular',
  fs = 16,
  style,
  children,
}: Props) {
  return (
    <TextRN
      style={[
        {
          fontFamily: fontFamily[ff],
          fontSize: fs,
          color: '#fff',
        },
        style,
      ]}>
      {children}
    </TextRN>
  );
}
