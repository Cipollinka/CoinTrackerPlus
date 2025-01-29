import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';

export default function Safe({children}: any) {
  return (
    <View style={{flex:1}}>
      <Image source={require('../media/image/bg.png')} style={{position:'absolute', width:'100%', height: '100%', flex: 1}}/>
        <View style={{flex:1, backgroundColor: 'black', opacity: 0.2, position:'absolute', width:'100%', height: '100%'}}/>
      <SafeAreaView style={styles.area}>
        <View style={styles.subContainer}>{children}</View>
      </SafeAreaView>
    </View>
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
