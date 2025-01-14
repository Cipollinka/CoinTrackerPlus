import {View} from 'react-native';
import React, {useState} from 'react';
import CategoriesSelection from './CategoriesSelection';
import LabelInput from './LabelInput';
import {useAppStore} from '@/store/appStore';

interface Props {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  category: string;
  setCategory: (category: string) => void;
}

export default function CategoryWithInput({
  selectedCategory,
  setSelectedCategory,
  category,
  setCategory,
}: Props) {
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const checkCategory = useAppStore(state => state.checkCategory);

  const handleCategoryChange = (text: string) => {
    const isExists = checkCategory(text);

    if (isExists) {
      setCategoryError('Category already exists');
      return;
    } else {
      setCategoryError(null);
    }
    setCategory(text);
    setSelectedCategory(null);
  };

  const handleCategorySelection = (selected: string | null) => {
    setCategory('');
    setSelectedCategory(selected);
  };

  return (
    <>
      <LabelInput
        label="Category"
        value={category}
        onChangeText={handleCategoryChange}
        placeholder="Enter amount"
        error={categoryError}
      />

      <View>
        <CategoriesSelection
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategorySelection}
        />
      </View>
    </>
  );
}
