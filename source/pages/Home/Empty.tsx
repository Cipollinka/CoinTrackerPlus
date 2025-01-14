import {View, Image} from 'react-native';
import React from 'react';
import Text from '@/components/Text';

export default function Empty() {
  return (
    <View
      style={{
        marginHorizontal: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 200,
        marginTop: 20,
      }}>
      <Image
        source={require('@/media/image/empty/transaction.png')}
        style={{width: 64, height: 64}}
      />
      <Text style={{textAlign: 'center', marginTop: 10}}>
        There are no transactions, add something
      </Text>
    </View>
  );
}
