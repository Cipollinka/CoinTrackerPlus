import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useMemo} from 'react';
import Safe from '@/components/Safe';
import Title from '@/components/Title';
import dayjs from 'dayjs';
import LinearGradient from 'react-native-linear-gradient';
import BudgetData from '@/components/BudgetData';
import Text from '@/components/Text';
import NavBar from '@/components/NavBar';
import {TransactionType, WishType} from '@/types/all';
import {useAppStore} from '@/store/appStore';

const currentMonth = dayjs().format('YYYY-MM');

export default function CoinAnalytics() {
  const transactions = useAppStore(state => state.transactions);
  const payments = useAppStore(state => state.payments);
  const wishes = useAppStore(state => state.wishes);
  const totalBudget = useAppStore(
    state => state.totalBudget[currentMonth] || 0,
  );

  const incomeValue = useMemo(() => {
    const income = transactions.filter(
      transaction => transaction.type === TransactionType.Income,
    );
    return income.reduce((acc, item) => acc + parseFloat(item.amount), 0);
  }, [transactions]);

  const outcomeValue = useMemo(() => {
    const outcome = transactions.filter(
      transaction => transaction.type === TransactionType.Outcome,
    );
    return outcome.reduce((acc, item) => acc + parseFloat(item.amount), 0);
  }, [transactions]);

  const closedWishes = useMemo(
    () => wishes.filter(item => item.type === WishType.Passed).length,
    [wishes],
  );
  const closedPayments = useMemo(
    () =>
      payments.filter(
        item => item.remaining === 0 || item.remaining >= item.totalAmount,
      ).length,
    [payments],
  );

  return (
    <Safe>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <View style={{gap: 4}}>
          <Title title="Coin analytics" />
          <Text fs={14}>{dayjs().format('DD.MM.YYYY')}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 10}}>
        <View style={styles.infoBlock}>
          <Text style={styles.white} ff="medium">
            Closed wishes
          </Text>
          <Text style={styles.white}>{closedWishes}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.white} ff="medium">
            Closed payments
          </Text>
          <Text style={styles.white}>{closedPayments}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <LinearGradient
            colors={['#FFEA01', '#FFB700']}
            style={{borderRadius: 12, width: '48%'}}>
            <View style={{padding: 16, gap: 8}}>
              <Text ff="medium" style={styles.white}>
                Incomes
              </Text>
              <Text fs={14} style={styles.white}>
                {incomeValue}$
              </Text>
            </View>
          </LinearGradient>

          <View
            style={{
              width: '48%',
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 16,
              gap: 8,
            }}>
            <Text ff="medium" style={styles.white}>
              Outcomes
            </Text>
            <Text fs={14} style={styles.white}>
              {outcomeValue}$
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            padding: 16,
            gap: 8,
            borderRadius: 12,
            marginTop: 16,
          }}>
          <Text ff="medium" fs={17} style={styles.white}>
            Budget
          </Text>
          <Text fs={14} style={styles.white}>
            {totalBudget}$
          </Text>
          <BudgetData />
        </View>
      </ScrollView>

      <NavBar />
    </Safe>
  );
}

const styles = StyleSheet.create({
  infoBlock: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  white: {
    color: '#000',
  },
});
