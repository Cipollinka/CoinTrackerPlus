import Text from '@/components/Text';
import React, {useMemo, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import Safe from '@/components/Safe';
import Title from '@/components/Title';
import {useNavigation} from '@react-navigation/native';

import PlusIcon from '@/media/icons/plus.svg';
import {NavType, PeriodType, Pages} from '@/types/all';
import TabBar from '@/components/TabBar';
import BudgetData from '@/components/BudgetData';
import {useAppStore} from '@/store/appStore';
import NavBar from '@/components/NavBar';
import Empty from '@/components/Empty';

const tabs = ['Month', 'Year'];

const BudgetPlanningScreen: React.FC = () => {
  const nav = useNavigation<NavType>();

  const [activeTab, setActiveTab] = useState<PeriodType>(PeriodType.Month);

  const transactions = useAppStore(state => state.transactions);
  const limits = useAppStore(state => state.limits);

  const isEmpty = limits.length === 0;

  const transactionByCategory = useMemo(() => {
    return transactions.reduce((acc, item) => {
      acc[item.category] = acc?.[item.category]
        ? acc[item.category] + parseFloat(item.amount)
        : parseFloat(item.amount);
      return acc;
    }, {} as Record<string, number>);
  }, [transactions]);

  console.log('transactionByCategory', transactionByCategory);

  const handleAddLimit = () => {
    nav.navigate(Pages.Add_Limit);
  };

  return (
    <Safe>
      <Title title="Budget" />

      <View style={{marginTop: 12}} />
      <TabBar tabs={tabs} currentTab={activeTab} onChangeTab={setActiveTab} />
      <View style={{marginTop: 8}} />

      <View style={{marginBottom: 20}}>
        <BudgetData isDisabled={activeTab !== PeriodType.Month} />
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.limitsHeader}>Limits</Text>
        <TouchableOpacity onPress={handleAddLimit}>
          <PlusIcon />
        </TouchableOpacity>
      </View>

      {isEmpty && <Empty text="There are no limits, add something" />}

      {!isEmpty && (
        <FlatList
          data={limits}
          numColumns={2}
          keyExtractor={item => item.id + ''}
          renderItem={({item}) => {
            const currentValue = transactionByCategory[item.category] || 0;
            const isAboveLimit = currentValue > parseFloat(item.amount);
            const textColor = isAboveLimit ? '#fff' : '#000';
            const subLabelColor = isAboveLimit ? '#ffffff80' : '#999';

            return (
              <View
                style={[
                  styles.limitCard,
                  isAboveLimit && styles.limitCardOver,
                ]}>
                <Text style={[styles.limitValue, {color: textColor}]}>
                  {currentValue} $
                </Text>
                <Text style={[styles.limitTotal, {color: subLabelColor}]}>
                  /{item.amount} $
                </Text>
                <Text style={[styles.limitLabel, {color: textColor}]}>
                  {item.category}
                </Text>
              </View>
            );
          }}
        />
      )}

      <NavBar />
    </Safe>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    marginTop: 20,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#ADD8E6',
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#007BFF',
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  limitsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  limitCard: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: 6,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  limitCardOver: {
    backgroundColor: '#E51B38',
  },
  limitValue: {
    // fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  limitTotal: {
    fontSize: 12,
    color: '#999999',
  },
  limitLabel: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
  },
});

export default BudgetPlanningScreen;
