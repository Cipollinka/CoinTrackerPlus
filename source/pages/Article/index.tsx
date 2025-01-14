import {Image, View} from 'react-native';
import React, {useMemo} from 'react';
import Safe from '@/components/Safe';
import Back from '@/components/Back';
import Title from '@/components/Title';
import articles from '@/utils/articles.json';
import Text from '@/components/Text';
import {ScrollView} from 'react-native-gesture-handler';

export default function Article({route}: any) {
  const id = route?.params?.id as number;

  const article = useMemo(() => articles.find(a => a.id === id), [id]);

  return (
    <Safe>
      <Back />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 30}}>
        <Title title={article?.title || ''} />

        <View style={{marginTop: 20, marginBottom: 24}}>
          <Image
            source={{uri: article?.image}}
            style={{width: '100%', height: 200, borderRadius: 20}}
          />
        </View>

        <Text ff="bold">{article?.text}</Text>
      </ScrollView>
    </Safe>
  );
}
