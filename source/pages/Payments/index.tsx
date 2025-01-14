import CategoriesSelection from '@/components/CategoriesSelection';
import Safe from '@/components/Safe';
import Title from '@/components/Title';
import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import PaymentItem from './Item';
import TabBar from '@/components/TabBar';
import Button from '@/components/Button';
import NavBar from '@/components/NavBar';
import BottomMenu from '@/components/Menu';
import {NavType, Payment, Pages} from '@/types/all';
import {useNavigation} from '@react-navigation/native';
import {useAppStore} from '@/store/appStore';
import Empty from '@/components/Empty';

const tabs = ['Credit', 'Installment plan', 'Payments'];

const PaymentsScreen = () => {
  const nav = useNavigation<NavType>();

  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPayment, setCurrentPayment] = useState<Payment | null>(null);

  const payments = useAppStore(state => state.payments);
  const removePayment = useAppStore(state => state.removePayment);

  const displayData = payments
    .filter(item => item.type === activeTab)
    .filter(item =>
      selectedCategory ? item.category === selectedCategory : true,
    );

  const isEmpty = displayData.length === 0;

  const handleAddPayment = () => {
    nav.navigate(Pages.AddPayments);
    handleCancelPayment();
  };

  const handleDeletePayment = () => {
    if (!currentPayment) return;
    removePayment(currentPayment.id);
    handleCancelPayment();
  };

  const handleCancelPayment = () => {
    setCurrentPayment(null);
  };

  const handlePaymentPress = (payment: Payment) => {
    nav.navigate(Pages.PaymentEntity, {id: payment.id});
    handleCancelPayment();
  };

  const handleEditPayment = () => {
    if (!currentPayment) return;
    nav.navigate(Pages.AddPayments, {payment: currentPayment});
    handleCancelPayment();
  };

  return (
    <Safe>
      <Title title="Payments" />

      <View style={{marginTop: 12}} />
      <TabBar tabs={tabs} currentTab={activeTab} onChangeTab={setActiveTab} />

      <View style={{marginTop: 12}} />

      <CategoriesSelection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {isEmpty && <Empty text="There are no payments, add something" />}

      {!isEmpty && (
        <FlatList
          data={displayData}
          keyExtractor={item => item.id + ''}
          renderItem={({item}) => (
            <PaymentItem
              payment={item}
              onEdit={setCurrentPayment}
              onPress={handlePaymentPress}
            />
          )}
          style={styles.paymentList}
          showsVerticalScrollIndicator={false}
        />
      )}

      <BottomMenu
        visible={!!currentPayment}
        onEdit={handleEditPayment}
        onDelete={handleDeletePayment}
        onCancel={handleCancelPayment}
      />

      <View style={{gap: 8}}>
        <Button title="Add new payment" onPress={handleAddPayment} />

        <NavBar />
      </View>
    </Safe>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#63C7FF',
    padding: 16,
  },
  paymentList: {
    width: '100%',
    height: 400,
    marginBottom: 10,
    marginTop: -16,
  },
  addButton: {
    backgroundColor: '#FFCA28',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 'auto',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default PaymentsScreen;
