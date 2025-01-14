import {View, Image} from 'react-native';
import React from 'react';
import Text from '@/components/Text';

interface Props {
  text: string;
}

export default function Empty({text}: Props) {
  return (
    <View
      style={{
        marginVertical: '40%',
        marginHorizontal: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 200,
        marginTop: 70,
      }}>
      <Image
        source={require('@/media/image/empty/transaction.png')}
        style={{width: 64, height: 64}}
      />
      <Text style={{textAlign: 'center', marginTop: 10}}>{text}</Text>
    </View>
  );
}
