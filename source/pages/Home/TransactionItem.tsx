import {StyleSheet, View} from 'react-native';
import React from 'react';
import Text from '@/components/Text';
import {Transaction, TransactionType} from '@/types/all';

interface Props {
  transaction: Transaction;
}

export default function TransactionItem({transaction}: Props) {
  const isIncome = transaction.type === TransactionType.Income;
  return (
    <View style={styles.item}>
      <View style={{gap: 4}}>
        <Text>{transaction.name}</Text>
        <Text fs={12}>{transaction.category}</Text>
      </View>
      <Text ff="bold">
        {isIncome ? '+' : '-'}
        {transaction.amount}$
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    // paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
});
