import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Text from './Text';
import ChevronIcon from '@/media/icons/chevron.svg';
import {NavType} from '@/types/all';
import {useNavigation} from '@react-navigation/native';

interface Props {
  onPress?: () => void;
}

export default function Back({onPress}: Props) {
  const nav = useNavigation<NavType>();

  return (
    <TouchableOpacity onPress={onPress ?? nav.goBack}>
      <View style={styles.container}>
        <ChevronIcon />
        <Text>Back</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
});
