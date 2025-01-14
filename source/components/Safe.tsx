import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function Safe({children}: any) {
  return (
    <LinearGradient
      colors={['#6ACFFF', '#6ACFFF', '#2EB0EE']}
      style={styles.area}>
      <SafeAreaView style={styles.area}>
        <View style={styles.subContainer}>{children}</View>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  area: {
    flex: 1,
    // backgroundColor: '#6ACFFF',
    position: 'relative',
  },
  subContainer: {
    padding: 16,
    flex: 1,
  },
});
