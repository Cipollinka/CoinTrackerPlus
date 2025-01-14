import Back from '@/components/Back';
import Button from '@/components/Button';
import Safe from '@/components/Safe';
import Title from '@/components/Title';
import {useAppStore} from '@/store/appStore';
import {NavType, Pages, TransactionType} from '@/types/all';
import React, {useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import LabelInput from '@/components/LabelInput';
import CategoryWithInput from '@/components/CategoryWithInput';

const NewIncomeScreen: React.FC = ({route}: any) => {
  const type = route?.params?.type as TransactionType;

  const nav = useNavigation<NavType>();

  const [incomeName, setIncomeName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [amountError, setAmountError] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const isDisabled = incomeName && amount && (!!selectedCategory || !!category);
  const isIncome = type === TransactionType.Income;

  const addTransaction = useAppStore(state => state.addTransaction);
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
    addTransaction({
      name: incomeName,
      description,
      date: dayjs().toISOString(),
      category: selectedCategory || category,
      amount,
      type: type || TransactionType.Outcome,
    });

    nav.navigate(Pages.Home);
  };

  return (
    <Safe>
      <Back />

      <Title title={`New ${isIncome ? 'Income' : 'Outcome'}`} />

      <View style={{marginTop: 28}} />

      <LabelInput
        label="Income name"
        value={incomeName}
        onChangeText={setIncomeName}
        placeholder="Enter income name"
      />

      <LabelInput
        label="Amount"
        value={amount}
        onChangeText={handleAmountChange}
        placeholder="Enter amount"
        keyboardType="numeric"
        error={amountError}
      />

      <CategoryWithInput
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        category={category}
        setCategory={setCategory}
      />

      <LabelInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />
      <Button disabled={!isDisabled} title="Save" onPress={handleSavePress} />
    </Safe>
  );
};
export default NewIncomeScreen;
