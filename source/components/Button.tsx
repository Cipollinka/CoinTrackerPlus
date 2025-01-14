import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Text from './Text';

interface Props {
  disabled?: boolean;
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function Button({disabled, title, onPress, style}: Props) {
  return (
    <LinearGradient
      colors={['#FFEA01', '#FFB700']}
      style={[styles.gradient, disabled && {opacity: 0.8}]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.button, style]}>
        <Text ff="bold" style={[styles.text]}>
          {title}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 12,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  text: {
    color: '#111',
  },
});
