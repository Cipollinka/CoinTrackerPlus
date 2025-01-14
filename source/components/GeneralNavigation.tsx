import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '@/pages/Home';
import {RoutesWithValues, Pages} from '@/types/all';
import NewIncomeScreen from '@/pages/IncomeEntity';
import BudgetPlanningScreen from '@/pages/Budget';
import LimitPage from '@/pages/AddLimit';
import PaymentsScreen from '@/pages/Payments';
import WishListScreen from '@/pages/WishList';
import NewWishScreen from '@/pages/AddWish';
import CoinAnalytics from '@/pages/CoinAnalitics';
import Settings from '@/pages/Settings';
import Article from '@/pages/Article';
import AddPayment from '@/pages/AddPayment';
import PaymentEntity from '@/pages/PaymentEntity';

const Stack = createNativeStackNavigator<RoutesWithValues>();

const GeneralNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Pages.Home}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Pages.Home} component={Home} />
        <Stack.Screen name={Pages.Income} component={NewIncomeScreen} />
        <Stack.Screen name={Pages.Budget} component={BudgetPlanningScreen} />
        <Stack.Screen name={Pages.Add_Limit} component={LimitPage} />
        <Stack.Screen name={Pages.Payments} component={PaymentsScreen} />
        <Stack.Screen name={Pages.AddPayments} component={AddPayment} />
        <Stack.Screen name={Pages.PaymentEntity} component={PaymentEntity} />
        <Stack.Screen name={Pages.WishList} component={WishListScreen} />
        <Stack.Screen name={Pages.AddWish} component={NewWishScreen} />
        <Stack.Screen name={Pages.CoinAnalytics} component={CoinAnalytics} />
        <Stack.Screen name={Pages.Settings} component={Settings} />
        <Stack.Screen name={Pages.Article} component={Article} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default GeneralNavigation;
