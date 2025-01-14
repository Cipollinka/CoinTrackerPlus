import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Text from '@/components/Text';
import DotsIcon from '@/media/icons/dots.svg';
import {Payment} from '@/types/all';
import dayjs from 'dayjs';

interface Props {
  payment: Payment;
  onPress: (payment: Payment) => void;
  onEdit: (payment: Payment) => void;
}

export default function PaymentItem({payment, onPress, onEdit}: Props) {
  const progressWidth = (payment.remaining / payment.totalAmount) * 100;
  return (
    <TouchableOpacity onPress={() => onPress(payment)}>
      <View style={styles.paymentItem}>
        {payment.imageUri && (
          <View style={styles.paymentImagePlaceholder}>
            <Image
              source={{uri: payment.imageUri}}
              style={styles.paymentImage}
            />
          </View>
        )}
        <View style={styles.paymentInfo}>
          <View style={styles.rowItem}>
            <View>
              <Text style={styles.paymentLabel}>{payment.name}</Text>
              <Text style={styles.paymentDescription}>
                {payment.description}
              </Text>
            </View>

            <Text style={styles.paymentDate}>
              {dayjs(payment.date).format('DD.MM.YYYY')}
            </Text>
          </View>

          <View style={[styles.rowItem, {alignItems: 'center'}]}>
            <Text style={styles.paymentMonthlyAmount}>
              {payment.monthlyAmount}$ • {payment.category}
            </Text>
            <TouchableOpacity
              style={{marginBottom: 10}}
              onPress={() => onEdit(payment)}>
              <DotsIcon />
            </TouchableOpacity>
          </View>

          <View style={styles.paymentProgressContainer}>
            <View
              style={[
                styles.paymentProgressBar,
                {
                  width: `${progressWidth}%`,
                  alignSelf: 'flex-start',
                },
              ]}
            />
            <Text ff="bold" style={styles.paymentProgressText}>
              {payment.remaining}/{payment.totalAmount}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentItem: {
    // flexDirection: 'row',
    backgroundColor: '#05AEFF',
    borderRadius: 20,
    padding: 13,
    marginBottom: 16,
    gap: 10,
  },
  paymentImagePlaceholder: {
    width: '100%',
    height: 140,
    backgroundColor: '#2A97CE',
    borderRadius: 16,
    marginRight: 16,
  },
  paymentImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#2A97CE',
    borderRadius: 16,
  },
  paymentInfo: {flex: 1},
  paymentLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  paymentDescription: {
    fontSize: 14,
    color: '#B0E0FF',
    marginBottom: 8,
  },
  paymentDate: {
    fontSize: 14,
    color: '#B0E0FF',
    marginBottom: 8,
  },
  paymentMonthlyAmount: {
    fontSize: 14,
    // color: '#FFCA28',
    marginBottom: 8,
  },
  paymentProgressContainer: {
    position: 'relative',
    height: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentProgressBar: {
    height: '100%',
    backgroundColor: '#FFCA28',
    borderRadius: 12,
    marginTop: -4,
  },
  paymentProgressText: {
    fontSize: 12,
    color: '#000',
    zIndex: 20,
    marginTop: -18,
  },
});
