import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useMemo, useState} from 'react';
import Text from './Text';
import EditIcon from '@/media/icons/edit.svg';
import ConfirmIcon from '@/media/icons/confirm.svg';
import {useAppStore} from '@/store/appStore';
import dayjs from 'dayjs';

const currentMonth = dayjs().format('YYYY-MM');
const currentYear = dayjs().format('YYYY');

interface Props {
  isDisabled?: boolean;
}

export default function BudgetData({isDisabled}: Props) {
  const budget = useAppStore(state => state.budget);
  const updateBudget = useAppStore(state => state.updateBudget);
  const values = useMemo(() => {
    if (isDisabled) {
      // TODO: a current year sum of monthly budget

      const sum = Object.entries(budget).reduce(
        (acc, [key, item]) => {
          const itemYear = dayjs(key).format('YYYY');
          if (itemYear === currentYear) {
            acc.planned += item.planned;
            acc.real += item.real;
            acc.remaining += item.remaining;
          }
          return acc;
        },
        {planned: 0, real: 0, remaining: 0},
      );

      return sum;
    }

    return budget[currentMonth] || {planned: '', real: '', remaining: ''};
  }, [budget, isDisabled]);

  useLayoutEffect(() => {
    if (!budget?.[currentMonth]) {
      updateBudget(currentMonth, 'planned', 0);
      updateBudget(currentMonth, 'real', 0);
      updateBudget(currentMonth, 'remaining', 0);
    }
  }, [budget]);

  const [editableBlock, setEditableBlock] = useState<
    'planned' | 'real' | 'remaining' | null
  >(null);

  const formatValue = (value: string) => {
    return Number(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleSave = (key: 'planned' | 'real' | 'remaining', value: string) => {
    updateBudget(currentMonth, key, parseFloat(value) || 0);
  };

  return (
    <View style={styles.blocksContainer}>
      {(['planned', 'real', 'remaining'] as const).map(block => {
        const isPlannedBlock = block === 'planned';
        const isRemainingBlock = block === 'remaining';
        const isRealBlock = block === 'real';

        return (
          <View
            key={block}
            style={[
              styles.block,
              isPlannedBlock && styles.plannedBlock,
              isRemainingBlock && styles.remainingBlock,
              isRealBlock && styles.realBlock,
            ]}>
            <Text
              ff="medium"
              style={[styles.blockLabel, isRemainingBlock && {color: '#fff'}]}>
              {block.charAt(0).toUpperCase() + block.slice(1)}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              {editableBlock === block ? (
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={values[block] + ''}
                  onChangeText={text => handleSave(block, text)}
                  onBlur={() => setEditableBlock(null)}
                  autoFocus
                />
              ) : (
                <Text
                  style={[
                    styles.blockValue,
                    isRemainingBlock && {color: '#fff'},
                  ]}>
                  {formatValue(values[block] + '')} $
                </Text>
              )}

              {!isDisabled && (
                <TouchableOpacity
                  onPress={() =>
                    setEditableBlock(prev => (prev ? null : block))
                  }>
                  {editableBlock === block ? (
                    <ConfirmIcon color={isRealBlock ? '#6ACFFF' : '#fff'} />
                  ) : (
                    <EditIcon color={isRealBlock ? '#6ACFFF' : '#fff'} />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  blocksContainer: {
    marginBottom: 0,
  },
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  plannedBlock: {
    backgroundColor: '#FFD400',
  },
  remainingBlock: {
    backgroundColor: '#E51B38',
  },
  blockLabel: {
    // fontWeight: 'bold',
    color: '#000',
    fontSize: 17,
  },
  blockValue: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#000',
    fontSize: 16,
    width: 100,
  },
  realBlock: {
    borderWidth: 1,
    borderColor: '#F1F1F1',
  },
});
