import CategoriesSelection from '@/components/CategoriesSelection';
import Safe from '@/components/Safe';
import Title from '@/components/Title';
import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import TabBar from '@/components/TabBar';
import Button from '@/components/Button';
import WishListItem from './Item';
import NavBar from '@/components/NavBar';
import BottomMenu from '@/components/Menu';
import {NavType, Pages, Wish} from '@/types/all';
import {useNavigation} from '@react-navigation/native';
import {useAppStore} from '@/store/appStore';
import Empty from '@/components/Empty';

const tabs = ['Active', 'Passed', 'Archived'];

const WishListScreen = () => {
  const nav = useNavigation<NavType>();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentWish, setCurrentWish] = useState<Wish | null>(null);

  const wishes = useAppStore(state => state.wishes);
  const removeWish = useAppStore(state => state.removeWish);

  const displayData = wishes
    .filter(item => item.type === activeTab)
    .filter(item =>
      selectedCategory ? item.category === selectedCategory : true,
    );

  const isEmpty = displayData.length === 0;

  const handleAddWish = () => {
    nav.navigate(Pages.AddWish);
    handleCancelWish();
  };

  const handleDeleteWish = () => {
    if (!currentWish) return;
    removeWish(currentWish.id);
    handleCancelWish();
  };

  const handleCancelWish = () => {
    setCurrentWish(null);
  };

  const handleEditWish = () => {
    if (!currentWish) return;
    nav.navigate(Pages.AddWish, {wish: currentWish});
    handleCancelWish();
  };

  return (
    <Safe>
      <Title title="Wish list" />

      <View style={{marginTop: 12}} />
      <TabBar tabs={tabs} currentTab={activeTab} onChangeTab={setActiveTab} />

      <View style={{marginTop: 12}} />

      <CategoriesSelection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {isEmpty && <Empty text="There are no wishes, add something" />}

      {!isEmpty && (
        <FlatList
          data={displayData}
          keyExtractor={item => item.id + ''}
          renderItem={({item}) => (
            <WishListItem wish={item} onEdit={setCurrentWish} />
          )}
          style={styles.paymentList}
          showsVerticalScrollIndicator={false}
        />
      )}

      <BottomMenu
        visible={!!currentWish}
        onEdit={handleEditWish}
        onDelete={handleDeleteWish}
        onCancel={handleCancelWish}
      />

      <View style={{gap: 8}}>
        <Button title="Add new wish" onPress={handleAddWish} />
        <NavBar />
      </View>
    </Safe>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#63C7FF',
    padding: 16,
  },
  paymentList: {
    width: '100%',
    height: 400,
    marginBottom: 10,
    marginTop: -16,
  },
  addButton: {
    backgroundColor: '#FFCA28',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 'auto',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default WishListScreen;
