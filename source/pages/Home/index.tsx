import React, {useMemo, useState} from 'react';
import Safe from '@/components/Safe';
import Text from '@/components/Text';
import Title from '@/components/Title';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import ArrowIcon from '@/media/icons/arrow.svg';
import ArrowLinIcon from '@/media/icons/arrow-lin.svg';
import TransactionItem from './TransactionItem';
import Empty from './Empty';
import {useNavigation} from '@react-navigation/native';
import {NavType, Pages, Transaction, TransactionType} from '@/types/all';
import {useAppStore} from '@/store/appStore';
import CategoriesSelection from '@/components/CategoriesSelection';
import dayjs from 'dayjs';
import LinearGradient from 'react-native-linear-gradient';
import NavBar from '@/components/NavBar';
import SettingsIcon from '@/media/icons/settings.svg';
import EditIcon from '@/media/icons/edit.svg';
import ConfirmIcon from '@/media/icons/confirm.svg';
import {TextInput} from 'react-native-gesture-handler';

const currentMonth = dayjs().format('YYYY-MM');

export default function Home() {
  const nav = useNavigation<NavType>();
  const transactions = useAppStore(state => state.transactions);

  const totalBudget = useAppStore(
    state => state.totalBudget[currentMonth] || 0,
  );
  const updateTotalBudget = useAppStore(state => state.updateTotalBudget);

  const [isEditing, setIsEditing] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const transactionsByDate = useMemo(
    () =>
      transactions.reduce((acc, item) => {
        const formattedDate = dayjs(item.date).format('DD MMM');
        acc[formattedDate] = acc?.[formattedDate]
          ? [...acc[formattedDate], item]
          : [item];
        return acc;
      }, {} as Record<string, Transaction[]>),
    [transactions],
  );

  const transactionValues = useMemo(() => {
    const sortedDates = Object.keys(transactionsByDate).sort((a, b) =>
      dayjs(b).isBefore(dayjs(a)) ? 1 : -1,
    );

    return sortedDates
      .map(date => transactionsByDate[date])
      .map(t =>
        t.filter(item =>
          selectedCategory ? item.category === selectedCategory : true,
        ),
      )
      .filter(t => t.length > 0);
  }, [transactionsByDate, selectedCategory]);

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

  const isEmpty = transactionValues.length === 0;

  return (
    <Safe>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        }}>
        <Title fs={30} title="Incomes and outcomes" />
        <TouchableOpacity onPress={() => nav.navigate(Pages.Settings)}>
          <SettingsIcon width={30} height={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.slyapa}>
        <LinearGradient
          colors={['#FFEA01', '#FFB700']}
          style={{
            borderRadius: 16,
            width: '47%',
            justifyContent: 'center',
          }}>
          <View style={{padding: 16, gap: 12}}>
            <Text fs={17} ff="medium" style={styles.black}>
              Incomes
            </Text>
            <Text fs={14} style={styles.black}>
              {incomeValue}$
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.incomeItem}>
          <Text fs={17} ff="medium" style={styles.black}>
            Outcomes
          </Text>
          <Text fs={14} style={styles.black}>
            {outcomeValue}$
          </Text>
        </View>

        <View style={styles.incomeItem}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text fs={17} ff="medium" style={styles.black}>
              Budget
            </Text>

            <TouchableOpacity onPress={() => setIsEditing(prev => !prev)}>
              {isEditing ? (
                <ConfirmIcon width={20} height={20} color={'#6ACFFF'} />
              ) : (
                <EditIcon width={20} height={20} color={'#6ACFFF'} />
              )}
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={totalBudget + ''}
              onChangeText={text =>
                updateTotalBudget(currentMonth, parseFloat(text) || 0)
              }
              onBlur={() => setIsEditing(false)}
              autoFocus
            />
          ) : (
            <Text fs={14} style={styles.black}>
              {totalBudget}$
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 4,
          }}>
          <TouchableOpacity
            onPress={() =>
              nav.navigate(Pages.Income, {type: TransactionType.Income})
            }>
            <View style={styles.arrowItem}>
              <ArrowIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              nav.navigate(Pages.Income, {type: TransactionType.Outcome})
            }>
            <View style={styles.arrowItem}>
              <ArrowLinIcon />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop: 24}}>
        <Text ff="bold" fs={24}>
          Transactions
        </Text>
      </View>

      <View style={{marginTop: 10}}>
        <CategoriesSelection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </View>

      {!isEmpty && (
        <ScrollView
          style={{marginTop: -16, marginBottom: 10}}
          showsVerticalScrollIndicator={false}>
          {transactionValues.map(group => {
            const currentDate = group[0].date;
            return (
              <View key={currentDate} style={{marginBottom: 12}}>
                <View style={{marginBottom: 12}}>
                  <Text>{dayjs(currentDate).format('DD MMM')}</Text>
                </View>
                <View style={{gap: 5}}>
                  {group.map(transaction => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))}
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}

      <View style={{gap: '18%'}}>
        {isEmpty && <Empty />}
        <NavBar />
      </View>
    </Safe>
  );
}

const styles = StyleSheet.create({
  incomeItem: {
    width: '47%',
    height: 84,
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    gap: 12,
  },
  slyapa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 20,
  },
  arrowItem: {
    width: 79,
    height: 83,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItem: {
    width: 91,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 12,
    marginTop: 12,
    marginBottom: 16,
  },
  black: {
    color: '#000',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#000',
    fontSize: 16,
    width: 100,
  },
});
