import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum Pages {
  Home = 'Home',
  Income = 'Income',
  Budget = 'Budget',
  Add_Limit = 'add_limit',
  Payments = 'Payments',
  AddPayments = 'AddPayments',
  PaymentEntity = 'PaymentEntity',
  WishList = 'WishList',
  AddWish = 'AddWish',
  CoinAnalytics = 'CoinAnalytics',
  Settings = 'Settings',
  Article = 'Article',
}

export type RoutesWithValues = {
  [Pages.Home]: undefined;
  [Pages.Income]: {type: TransactionType};
  [Pages.Budget]: undefined;
  [Pages.Add_Limit]: undefined;

  [Pages.Payments]: undefined;
  [Pages.AddPayments]: undefined | {payment: Payment};
  [Pages.PaymentEntity]: {id: number};

  [Pages.WishList]: undefined;
  [Pages.AddWish]: undefined | {wish: Wish};

  [Pages.CoinAnalytics]: undefined;

  [Pages.Settings]: undefined;

  [Pages.Article]: {id: number};
};

export type NavType = NativeStackNavigationProp<RoutesWithValues>;

export enum TransactionType {
  Income = 'Income',
  Outcome = 'Outcome',
}

export enum PeriodType {
  Month,
  Year,
}

export enum PaymentType {
  Credit,
  Installment,
  Payments,
}

export enum WishType {
  Active,
  Passed,
  Archived,
}

export interface Transaction {
  id: number;
  name: string;
  date: string;
  category: string;
  type: TransactionType;
  amount: string;
  description?: string;
}

export interface Limit {
  id: number;
  category: string;
  amount: string;
  date: string;
  period: PeriodType;
}

export interface Payment {
  id: number;
  imageUri?: string | null;
  type: PaymentType;
  name: string;
  category: string;
  description: string;
  date: string;
  monthlyAmount: number;
  totalAmount: number;
  remaining: number;
}

export interface Wish {
  id: number;
  type: WishType;
  name: string;
  category: string;
  description: string;
  date: string;
  monthlyAmount: number;
  totalAmount: number;
  remaining: number;
}

export type BudgetType = Record<string, Budget>;

export interface Budget {
  planned: number;
  real: number;
  remaining: number;
}

export type TotalBudgetType = Record<string, number>;
