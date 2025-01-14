import React from 'react';
import Text from './Text';

interface Props {
  title: string;
  fs?: number;
}

export default function Title({title, fs}: Props) {
  return (
    <Text ff="bold" fs={fs || 32}>
      {title}
    </Text>
  );
}
