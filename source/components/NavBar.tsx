import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

import TransactionsIcon from '@/media/icons/nav/transactions.svg';
import AnalyticsIcon from '@/media/icons/nav/analytics.svg';
import BudgetIcon from '@/media/icons/nav/budget.svg';
import PaymentsIcon from '@/media/icons/nav/payments.svg';
import WishesIcon from '@/media/icons/nav/wishes.svg';
import {NavType, Pages} from '@/types/all';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const options = [
  {
    icon: TransactionsIcon,
    screen: Pages.Home,
  },
  {
    icon: BudgetIcon,
    screen: Pages.Budget,
  },
  {
    icon: AnalyticsIcon,
    screen: Pages.Payments,
  },
  {
    icon: PaymentsIcon,
    screen: Pages.WishList,
  },
  {
    icon: WishesIcon,
    screen: Pages.CoinAnalytics,
  },
];

export default function NavBar() {
  const nav = useNavigation<NavType>();

  const route = useRoute();

  const handlePress = (screen: any) => {
    nav.navigate(screen);
  };

  return (
    <LinearGradient
      colors={['#6ACFFF', '#6ACFFF', '#2EB0EE']}
      style={styles.container}>
      <View style={styles.navBar}>
        {options.map(({icon: Icon, screen}) => {
          const isCurrent = route.name === screen;
          return (
            <TouchableOpacity
              key={screen}
              onPress={() => handlePress(screen)}
              style={styles.item}>
              <Icon
                width={32}
                height={32}
                color={isCurrent ? '#FFEA01' : '#fff'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
    height: 58,
    alignItems: 'center',
  },
  item: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
