import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Safe from '@/components/Safe';
import Back from '@/components/Back';
import Title from '@/components/Title';
import {useAppStore} from '@/store/appStore';
import Text from '@/components/Text';
import Button from '@/components/Button';
import DeleteIcon from '@/media/icons/delete.svg';

import {NavType, Pages} from '@/types/all';
import {useNavigation} from '@react-navigation/native';

export default function PaymentEntity({route}: any) {
  const nav = useNavigation<NavType>();
  const id = route?.params?.id as number;

  const payment = useAppStore(state => state.payments.find(p => p.id === id));
  const progressWidth =
    ((payment?.remaining || 0) / (payment?.totalAmount || 0)) * 100 || 0;

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(payment?.remaining.toString());
  const [error, setError] = useState<string | null>(null); // Error state for validation

  const isSaveDisabled = !value || (!!error && isEditing);

  const updatePayment = useAppStore(state => state.updatePayment);

  const handleEditAmount = () => {
    if (isEditing && payment && !error) {
      updatePayment({
        ...payment,
        remaining: payment.totalAmount - parseFloat(value),
      });
      console.log('save');
    }
    setIsEditing(prev => !prev);
  };

  const validateInput = (input: string) => {
    // Check if input is a valid positive number
    const isValid = /^[+]?\d*\.?\d+$/.test(input); // RegEx for positive number
    if (!isValid) {
      setError('Please enter a valid positive number');
    } else if (payment?.totalAmount && parseInt(input) > payment?.totalAmount) {
      setError("Remaining can't be greater than total amount");
    } else {
      setError(null);
    }
  };

  const handleEditEntity = () => {
    if (!payment) return;

    nav.navigate(Pages.AddPayments, {payment});
  };

  return (
    <Safe>
      <Back />

      <Title title={payment?.name || ''} />

      {payment?.imageUri && (
        <Image
          source={{uri: payment?.imageUri}}
          style={{width: '100%', height: 200, marginTop: 20, borderRadius: 20}}
        />
      )}

      <View style={{marginTop: 16}}>
        <Text>{payment?.monthlyAmount} • Monthly</Text>
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
          {payment?.remaining}/{payment?.totalAmount}
        </Text>
      </View>

      {isEditing && (
        <>
          <TextInput
            value={value}
            onChangeText={text => {
              setValue(text);
              validateInput(text);
            }}
            style={styles.input}
            placeholder="Enter remaining amount"
            keyboardType="numeric"
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
        </>
      )}

      <View style={{marginTop: 8, marginBottom: 16}}>
        <Button
          disabled={!!isSaveDisabled}
          title={isEditing ? 'Save' : 'Edit amount'}
          onPress={handleEditAmount}
        />
      </View>

      {payment?.description && <Text ff="bold">{payment?.description}</Text>}

      <View
        style={{
          marginTop: 'auto',
          flexDirection: 'row',
          gap: 20,
          width: '100%',
        }}>
        <TouchableOpacity>
          <DeleteIcon />
        </TouchableOpacity>
        <View style={{width: '80%'}}>
          <Button title="Edit" onPress={handleEditEntity} />
        </View>
      </View>
    </Safe>
  );
}

const styles = StyleSheet.create({
  paymentProgressContainer: {
    position: 'relative',
    height: 28,
    backgroundColor: '#57C9FF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#05AEFF',
  },
  paymentProgressBar: {
    height: '100%',
    backgroundColor: '#FFCA28',
    borderRadius: 12,
    marginTop: -6,
  },
  paymentProgressText: {
    fontSize: 12,
    color: '#000',
    zIndex: 20,
    marginTop: -20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 7,
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
  errorText: {
    color: '#E51B38',
    fontSize: 14,
    marginTop: 5,
  },
});
