import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import GeneralNavigation from '@/components/GeneralNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <GeneralNavigation />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
AppRegistry.registerComponent(appName, () => App);

export default App;
