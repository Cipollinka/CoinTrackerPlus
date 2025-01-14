import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useAppStore} from '@/store/appStore';

interface Props {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export default function CategoriesSelection({
  selectedCategory,
  setSelectedCategory,
}: Props) {
  const categories: string[] = useAppStore(state => state.categories);

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) return setSelectedCategory(null);
    setSelectedCategory(category);
  };

  if (categories.length === 0) return null;

  return (
    <ScrollView
      horizontal
      style={styles.categoryContainer}
      showsHorizontalScrollIndicator={false}>
      <View style={{gap: 10, flexDirection: 'row', height: 35}}>
        {categories.map(category => {
          const isSelected = selectedCategory === category;
          const content = (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => handleCategorySelect(category)}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          );

          return isSelected ? (
            <LinearGradient
              colors={['#FFEA01', '#FFB700']}
              style={{borderRadius: 10}}>
              {content}
            </LinearGradient>
          ) : (
            content
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 20,
    height: 45,
  },
  categoryButton: {
    height: 35,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryButton: {
    // backgroundColor: '#FFD700',
    borderWidth: 0,
  },
  categoryText: {
    color: '#fff',
    height: 20,
  },
  selectedCategoryText: {
    color: '#000',
  },
});
