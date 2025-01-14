import {View} from 'react-native';
import React, {useState} from 'react';
import Safe from '@/components/Safe';
import Title from '@/components/Title';
import Back from '@/components/Back';
import TabBar from '@/components/TabBar';
import Button from '@/components/Button';
import LabelInput from '@/components/LabelInput';
import CategoryWithInput from '@/components/CategoryWithInput';
import {useAppStore} from '@/store/appStore';
import {NavType, PeriodType, Pages} from '@/types/all';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';

const tabs = ['Month', 'Year'];

export default function LimitPage() {
  const nav = useNavigation<NavType>();

  const [category, setCategory] = useState('');
  const [activeTab, setActiveTab] = useState<PeriodType>(PeriodType.Month);

  const [amount, setAmount] = useState<string>('');
  const [amountError, setAmountError] = useState<string>('');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'Category 1',
  );
  const isDisabled = amount && (!!selectedCategory || !!category);

  const addLimit = useAppStore(state => state.addLimit);
  const addCategory = useAppStore(state => state.addCategory);

  const handleAmountChange = (text: string) => {
    if (/^\d*$/.test(text)) {
      setAmount(text);
      setAmountError('');
    } else {
      setAmountError('Amount must be a valid number');
    }
  };

  const handleSavePress = () => {
    if (category) {
      addCategory(category);
    }
    addLimit({
      category: selectedCategory || category,
      amount,
      date: dayjs().toISOString(),
      period: activeTab,
    });

    nav.navigate(Pages.Budget);
  };

  return (
    <Safe>
      <Back />

      <Title title="New limit" />

      <View style={{gap: 0, marginTop: 28}}>
        <CategoryWithInput
          category={category}
          selectedCategory={selectedCategory}
          setCategory={setCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <LabelInput
          label="Amount"
          value={amount}
          onChangeText={handleAmountChange}
          placeholder="Enter amount"
          keyboardType="numeric"
          error={amountError}
        />

        <TabBar tabs={tabs} currentTab={activeTab} onChangeTab={setActiveTab} />
      </View>

      <View style={{marginTop: 'auto'}}>
        <Button title="Save" disabled={!isDisabled} onPress={handleSavePress} />
      </View>
    </Safe>
  );
}
