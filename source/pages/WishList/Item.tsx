import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Text from '@/components/Text';
import DotsIcon from '@/media/icons/dots.svg';
import {Wish} from '@/types/all';
import dayjs from 'dayjs';

interface Props {
  wish: Wish;
  onEdit: (wish: Wish) => void;
}

export default function WishListItem({wish, onEdit}: Props) {
  return (
    <View style={styles.wishListItem}>
      <View style={styles.wishListInfo}>
        <View style={styles.rowItem}>
          <View>
            <Text style={styles.wishListLabel}>{wish.name}</Text>
            <Text style={styles.wishListDescription}>{wish.description}</Text>
          </View>

          <Text style={styles.wishListDate}>
            {dayjs(wish.date).format('DD.MM.YYYY')}
          </Text>
        </View>

        <View style={[styles.rowItem, {alignItems: 'center'}]}>
          <Text style={styles.wishListMonthlyAmount}>
            {wish.monthlyAmount} • {wish.category}
          </Text>
          <TouchableOpacity
            style={{marginBottom: 10}}
            onPress={() => onEdit(wish)}>
            <DotsIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wishListItem: {
    // flexDirection: 'row',
    backgroundColor: '#05AEFF',
    borderRadius: 20,
    padding: 13,
    marginBottom: 16,
    gap: 10,
  },
  wishListInfo: {flex: 1},
  wishListLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  wishListDescription: {
    fontSize: 14,
    color: '#B0E0FF',
    marginBottom: 8,
  },
  wishListDate: {
    fontSize: 14,
    color: '#B0E0FF',
    marginBottom: 8,
  },
  wishListMonthlyAmount: {
    fontSize: 14,
    // color: '#FFCA28',
    marginBottom: 8,
  },
});
