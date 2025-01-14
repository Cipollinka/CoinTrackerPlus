import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  Switch,
  ScrollView,
} from 'react-native';
import React from 'react';
import Safe from '@/components/Safe';
import Back from '@/components/Back';
import Title from '@/components/Title';

import DevIcon from '@/media/icons/dev.svg';
import PrivacyIcon from '@/media/icons/privacy.svg';
import TosIcon from '@/media/icons/tos.svg';

import articles from '@/utils/articles.json';
import Text from '@/components/Text';
import {useNavigation} from '@react-navigation/native';
import {NavType, Pages} from '@/types/all';
import {useAppStore} from '@/store/appStore';

const ArticleItem = ({
  item,
  onPress,
}: {
  item: {title: string; text: string; image: string};
  onPress: (a: any) => void;
}) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <View style={styles.articleItem}>
      <View
        style={{
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: '#2A97CE',
        }}>
        <Image
          source={{uri: item.image}}
          style={{width: '100%', height: 140}}
        />
      </View>

      <Text ff="bold">{item.title}</Text>
      <Text fs={14}>{item.text.slice(0, 10)}...</Text>
    </View>
  </TouchableOpacity>
);

const options = [
  {
    label: 'Developer website',
    value: 'https://google.com/',
    icon: DevIcon,
  },
  {
    label: 'Privacy policy',
    value: 'https://google.com/',
    icon: PrivacyIcon,
  },
  {
    label: 'Terms of use',
    value: 'https://google.com/',
    icon: TosIcon,
  },
];

export default function Settings() {
  const nav = useNavigation<NavType>();

  const isNotificationsEnabled = useAppStore(
    state => state.isNotificationsEnabled,
  );
  const setIsNotificationsEnabled = useAppStore(
    state => state.setIsNotificationsEnabled,
  );

  const handleOptionPress = (value: string) => {
    Linking.openURL(value);
  };

  const handleArticlePress = (article: any) => {
    nav.navigate(Pages.Article, {id: article.id});
  };

  return (
    <Safe>
      <Back />
      <Title title="Settings" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 0, marginTop: 10}}>
        <View style={styles.row}>
          {options.map(({label, value, icon: Icon}) => (
            <TouchableOpacity
              style={styles.item}
              key={label}
              onPress={() => handleOptionPress(value)}>
              <View>
                <Text ff="medium" style={{color: '#000'}}>
                  {label}{' '}
                </Text>
                <View style={{alignItems: 'flex-end', marginTop: 8}}>
                  <Icon width={58} height={44} />
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.item}>
            <Text ff="medium" style={{color: '#000'}}>
              Notifications
            </Text>
            <View style={{marginTop: 20, alignItems: 'flex-end'}}>
              <Switch
                value={isNotificationsEnabled}
                onValueChange={setIsNotificationsEnabled}
                trackColor={{false: '#767577', true: '#F5CB1C'}}
              />
            </View>
          </View>
        </View>

        <View style={{marginTop: 32}} />
        <Text ff="bold" fs={24}>
          Useful articles
        </Text>
        <View style={{marginTop: 16}} />

        <View style={{gap: 16}}>
          {articles.map(item => (
            <ArticleItem
              item={item}
              key={item.title}
              onPress={handleArticlePress}
            />
          ))}
        </View>
      </ScrollView>
    </Safe>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 16,
  },
  item: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    position: 'relative',
  },
  articleItem: {
    padding: 12,
    borderRadius: 20,
    gap: 8,
    backgroundColor: '#05AEFF',
  },
});
