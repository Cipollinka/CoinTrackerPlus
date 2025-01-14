import {
  Budget,
  BudgetType,
  Limit,
  Payment,
  TotalBudgetType,
  Transaction,
  Wish,
} from '@/types/all';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface State {
  isNotificationsEnabled: boolean;
  setIsNotificationsEnabled: (isEnabled: boolean) => void;

  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  removeTransaction: (id: number) => void;

  limits: Limit[];
  addLimit: (limit: Omit<Limit, 'id'>) => void;
  removeLimit: (id: number) => void;

  categories: string[];
  addCategory: (category: string) => void;
  checkCategory: (category: string) => boolean;
  removeCategory: (category: string) => void;

  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  removePayment: (id: number) => void;
  updatePayment: (payment: Payment) => void;

  wishes: Wish[];
  addWish: (wish: Omit<Wish, 'id'>) => void;
  removeWish: (id: number) => void;
  updateWish: (wish: Wish) => void;

  budget: BudgetType;
  updateBudget: (date: string, key: keyof Budget, value: number) => void;

  totalBudget: TotalBudgetType;
  updateTotalBudget: (date: string, value: number) => void;
}

export const useAppStore = create(
  persist<State>(
    (set, get) => ({
      isNotificationsEnabled: false,
      setIsNotificationsEnabled: isEnabled => {
        set(() => ({
          isNotificationsEnabled: isEnabled,
        }));
      },

      transactions: [],
      addTransaction: transaction => {
        const transactions = get().transactions;
        const id = transactions[transactions.length - 1]?.id + 1 || 1;

        set(state => ({
          transactions: [...state.transactions, {...transaction, id}],
        }));
      },
      removeTransaction: id => {
        set(state => ({
          transactions: state.transactions.filter(t => t.id !== id),
        }));
      },

      limits: [],
      addLimit: limit => {
        const limits = get().limits;
        const id = limits[limits.length - 1]?.id + 1 || 1;

        set(state => ({
          limits: [...state.limits, {...limit, id}],
        }));
      },
      removeLimit: id => {
        set(state => ({
          limits: state.limits.filter(t => t.id !== id),
        }));
      },

      categories: [],
      addCategory: category => {
        const categories = get().categories;
        const isAlreadyAdded = categories.includes(category);

        if (isAlreadyAdded) return false;

        set(state => ({
          categories: [...state.categories, category],
        }));

        return true;
      },
      checkCategory: category => {
        return get().categories.includes(category);
      },
      removeCategory: category => {
        set(state => ({
          categories: state.categories.filter(t => t !== category),
        }));
      },

      payments: [],
      addPayment: payment => {
        const payments = get().payments;
        const id = payments[payments.length - 1]?.id + 1 || 1;

        set(state => ({
          payments: [...state.payments, {...payment, id}],
        }));
      },
      removePayment: id => {
        set(state => ({
          payments: state.payments.filter(t => t.id !== id),
        }));
      },
      updatePayment: payment => {
        set(state => ({
          payments: state.payments.map(t =>
            t.id === payment.id ? {...t, ...payment} : t,
          ),
        }));
      },

      wishes: [],
      addWish: wish => {
        const wishes = get().wishes;
        const id = wishes[wishes.length - 1]?.id + 1 || 1;

        set(state => ({
          wishes: [...state.wishes, {...wish, id}],
        }));
      },
      removeWish: id => {
        set(state => ({
          wishes: state.wishes.filter(t => t.id !== id),
        }));
      },
      updateWish: wish => {
        set(state => ({
          wishes: state.wishes.map(t =>
            t.id === wish.id ? {...t, ...wish} : t,
          ),
        }));
      },

      budget: {},
      updateBudget: (date, key, value) => {
        set(state => ({
          budget: {
            ...state.budget,
            [date]: {
              ...state.budget[date],
              [key]: value,
            },
          },
        }));
      },

      totalBudget: {},
      updateTotalBudget: (date, value) => {
        set(state => ({
          totalBudget: {
            ...state.totalBudget,
            [date]: value,
          },
        }));
      },
    }),
    {
      storage: {
        getItem: async (key: string) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key: string, value: any) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key: string) => {
          await AsyncStorage.removeItem(key);
        },
      },
      name: 'commonStore',
    },
  ),
);
