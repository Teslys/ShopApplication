/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import LayoutScreen from './layouts/Layout';
import {Provider} from 'react-redux';
import store from './store/store';

function App(): JSX.Element {
  return (
    // <SafeAreaView>
    //   <Text>asdasd</Text>
    // </SafeAreaView>
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <LayoutScreen></LayoutScreen>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
